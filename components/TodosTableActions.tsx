"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Pen, Trash } from "lucide-react";
import { TODO } from "@/@types";
import Spinner from "./ui/Spinner";
import { deleteTodoAction, updateTodoAction } from "@/actions/todoActions";
import AddUpdateTodoForm from "./AddUpdateTodoForm";

const TodosTableActions = ({ todo }: { todo: TODO }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteTodoAction({ id: todo.id });
    setLoading(false);
  };

  const handleUpdate = async (updatedTodo: TODO) => {
    setLoading(true);
    await updateTodoAction({
      body: updatedTodo.body,
      completed: updatedTodo.completed,
      id: updatedTodo.id,
      title: updatedTodo.title,
    });
    setLoading(false);
  };

  return (
    <>
      <AddUpdateTodoForm
        todo={todo}
        isUpdate={true}
        openTrigger={
          <Button size={"icon"} variant={"outline"}>
            <Pen />
          </Button>
        }
        handleOnSubmit={handleUpdate}
      />
      <Button size={"icon"} variant={"destructive"} onClick={handleDelete}>
        {loading ? <Spinner /> : <Trash size={16} />}
      </Button>
    </>
  );
};

export default TodosTableActions;