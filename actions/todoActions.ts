"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getTodoListAction = async () => {
  return prisma.todo.findMany();
};
export const updateTodoAction = async () => {};
export const deleteTodoAction = async ({id}:{id :string}) => {
  await prisma.todo.delete({
    where : {
      id
    }
  });
  revalidatePath("/");
};
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
  revalidatePath("/");

};
