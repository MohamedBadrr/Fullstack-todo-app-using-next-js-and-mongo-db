import { getTodoListAction } from "@/actions/todoActions";
import AddUpdateTodoForm from "@/components/AddUpdateTodoForm";
import { ModeToggle } from "@/components/ModeToggle";
import TodosTable from "@/components/TodoTable";

export default async function Home() {
  const todos = await getTodoListAction();
  return (
    <main className="container">
      <div className="mx-auto flex w-full lg:w-1/2 flex-col justify-center space-y-4 mt-10">
        <div className="flex flex-row-reverse gap-2 ms-auto">
          <ModeToggle />

          <AddUpdateTodoForm />
        </div>
        <TodosTable todos={todos} />
      </div>
    </main>
  );
}
