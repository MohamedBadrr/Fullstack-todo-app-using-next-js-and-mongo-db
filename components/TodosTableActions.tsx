"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Pen, Trash } from "lucide-react";
import { TODO } from "@/@types";
import Spinner from "./ui/Spinner";
import { deleteTodoAction, updateTodoAction } from "@/actions/todoActions";
import AddUpdateTodoForm from "./AddUpdateTodoForm";
import { toast } from "sonner";

const TodosTableActions = ({ todo }: { todo: TODO }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteTodoAction({ id: todo.id });
    setLoading(false);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error("Some thing went wrong ");
    }
  };

  const handleUpdate = async (updatedTodo: TODO) => {
    setLoading(true);
    const result = await updateTodoAction({
      body: updatedTodo.body,
      completed: updatedTodo.completed,
      id: updatedTodo.id,
      title: updatedTodo.title,
    });
    setLoading(false);
    if (result?.success) {
      toast.success(result.message);
    } else {
      toast.error("Some thing went wrong ");
    }
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
