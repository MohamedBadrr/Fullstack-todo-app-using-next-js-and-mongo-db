"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Pen, Trash } from "lucide-react";
// import { deleteTodoAction } from "@/actions/todo.actions";

// import EditTodoForm from "./EditTodoForm";
import { TODO } from "@/@types";
import Spinner from "./ui/Spinner";
import { deleteTodoAction } from "@/actions/todoActions";

const TodosTableActions = ({ todo }: { todo: TODO }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteTodoAction({ id: todo.id });
    setLoading(false);
  };
 

  return (
    <>
      {/* <EditTodoForm todo={todo} /> */}
      <Button
        size={"icon"}
        variant={"destructive"}
        onClick={handleDelete}

      >
        {loading ? <Spinner /> : <Trash size={16} />}
      </Button>
    </>
  );
};

export default TodosTableActions;
