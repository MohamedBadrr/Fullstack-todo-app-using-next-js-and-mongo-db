"use server";
import { TODO } from "@/@types";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getTodoListAction = async ({ userId }: { userId: string }) => {
  return prisma.todo.findMany({
    where: {
      user_id: userId,
    },
  });
};
export const updateTodoAction = async ({
  id,
  title,
  body,
  completed,
}: TODO) => {
  try {
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
        body,
        completed,
      },
    });
    revalidatePath("/");
    return { success: true, message: "Todo updated successfully" };
  } catch {
    throw new Error("Something went wrong");
  }
};
export const deleteTodoAction = async ({ id }: { id: string }) => {
  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
    return { success: true, message: "Todo deleted successfully" };
  } catch {
    throw new Error("Something went wrong");
  }
};
export const createTodoAction = async ({
  title,
  body,
  completed,
  user_id,
}: {
  title: string;
  body?: string;
  completed?: boolean;
  user_id: string;
}) => {
  try {
    await prisma.todo.create({
      data: { title, body, completed, user_id },
    });
    revalidatePath("/");
    return { success: true, message: "Todo created successfully" };
  } catch {
    throw new Error("Something went wrong");
  }
};
