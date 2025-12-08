import { TODO } from "@/@types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import TodosTableActions from "./TodosTableActions";
import AddUpdateTodoForm from "./AddUpdateTodoForm";
import moment from "moment";

export default function TodosTable({
  todos,
  userId,
}: {
  todos: TODO[];
  userId: string;
}) {
  return todos.length > 0 ? (
    <Table>
      <TableCaption>A list of your todos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo?.id}>
            <TableCell className={todo.completed ? "line-through" : ""}>
              {todo?.title}
            </TableCell>
            <TableCell>
              {todo?.completed ? (
                <Badge>Completed</Badge>
              ) : (
                <Badge variant="secondary">Uncompleted</Badge>
              )}
            </TableCell>
            <TableCell>{moment(todo.createdAt).format("DD-MM-YYYY")}</TableCell>
            <TableCell className="flex items-center justify-end space-x-2">
              <TodosTableActions todo={todo} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">
            {!todos.length ? "YOU DON'T HAVE ANY TODO YET!" : todos.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ) : (
    <div className="flex items-center flex-col mt-40 justify-start h-screen">
      <div className="mb-3">
        <h1 className="text-[24px] font-bold italic">
          Your don&apos;t have any todos
        </h1>
      </div>
      <AddUpdateTodoForm userId={userId} />
    </div>
  );
}
