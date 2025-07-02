import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const quizzes = sqliteTable("quizzes", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  description: text("description"),
});

export const questions = sqliteTable("questions", {
  id: text("id").primaryKey().notNull(),
  quizId: text("quiz_id").notNull().references(() => quizzes.id),
  text: text("text").notNull(),
});

export const choices = sqliteTable("choices", {
  id: text("id").primaryKey().notNull(),
  questionId: text("question_id").notNull().references(() => questions.id),
  text: text("text").notNull(),
  isCorrect: integer("is_correct", { mode: "boolean" }).notNull(),
});
