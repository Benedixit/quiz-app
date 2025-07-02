import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
// Shared UUID default
const unique_id = sql `
  lower(
    hex(randomblob(4)) || '-' ||
    hex(randomblob(2)) || '-4' ||
    substr(hex(randomblob(2)), 2) || '-' ||
    substr('89ab', abs(random()) % 4 + 1, 1) ||
    substr(hex(randomblob(2)), 2) || '-' ||
    hex(randomblob(6))
  )
`;
export const quizzes = sqliteTable("quizzes", {
    id: text("id").primaryKey().notNull().default(unique_id),
    title: text("title").notNull(),
    description: text("description"),
});
export const questions = sqliteTable("questions", {
    id: text("id").primaryKey().notNull().default(unique_id),
    quizId: text("quiz_id").notNull().references(() => quizzes.id),
    text: text("text").notNull(),
});
export const choices = sqliteTable("choices", {
    id: text("id").primaryKey().notNull().default(unique_id),
    questionId: text("question_id").notNull().references(() => questions.id),
    text: text("text").notNull(),
    isCorrect: integer("is_correct", { mode: "boolean" }).notNull(),
});
