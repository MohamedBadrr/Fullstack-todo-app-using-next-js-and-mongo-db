import { getTodoListAction } from "@/actions/todoActions";
import Nav from "@/components/Nav";
import TodosTable from "@/components/TodoTable";
import { auth, getAuth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  const todos = await getTodoListAction({ userId: userId ?? "" });
  return (
    <main className="px-3">
      <div className="mx-auto flex w-full lg:w-1/2 flex-col justify-center space-y-4 mt-10">
        <Nav userId={userId ?? ""} />
        <TodosTable todos={todos} userId={userId ?? ""} />
      </div>
    </main>
  );
}
