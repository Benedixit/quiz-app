import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { db } from './db/client';
import { quizzes, questions, choices } from './db/schema';
import { serve } from '@hono/node-server';
const app = new Hono();
app.get('/', (c) => {
    return c.text('Hello Hono!');
});
app.get('/quizzes', async (c) => {
    const allQuizzes = await db.select().from(quizzes);
    return c.json(allQuizzes);
});
app.post('/quizzes', async (c) => {
    const body = await c.req.json();
    const [quiz] = await db.insert(quizzes).values({
        title: body.title,
        description: body.description,
    }).returning();
    for (const question of body.questions) {
        const [createdQuestion] = await db.insert(questions).values({
            quizId: quiz.id,
            text: question.text,
        }).returning();
        await db.insert(choices).values(question.choices.map((choice) => ({
            questionId: createdQuestion.id,
            text: choice.text,
            isCorrect: choice.is_correct,
        })));
    }
    return c.json({ message: 'Quiz added successfully', quizId: quiz.id });
});
app.get('/quizzes/:id', async (c) => {
    const id = c.req.param('id');
    const [quiz] = await db.select().from(quizzes).where(eq(quizzes.id, id));
    if (!quiz)
        return c.notFound();
    const quizQuestions = await db.select().from(questions).where(eq(questions.quizId, id));
    const questionsWithChoices = await Promise.all(quizQuestions.map(async (q) => {
        const questionChoices = await db.select().from(choices).where(eq(choices.questionId, q.id));
        return { ...q, choices: questionChoices };
    }));
    return c.json({ quiz, questions: questionsWithChoices });
});
serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
export default app;
