"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTodoListAction = async () => {
  return prisma.todo.findMany();
};
export const updateTodoAction = async () => {};
export const deleteTodoAction = async () => {};
export const createTodoAction = async ({
  title,
  body,
  completed
}: {
  title: string;
  body?: string;
  completed? :boolean
}) => {
  await prisma.todo.create({
    data: { title, body ,completed},
  });
};
