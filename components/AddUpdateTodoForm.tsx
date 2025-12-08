"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { todoFormSchema, TodoFormValues } from "@/validation";
import { Checkbox } from "./ui/checkbox";
import { ReactNode, useState } from "react";
import Spinner from "./ui/Spinner";
import { createTodoAction } from "@/actions/todoActions";
import { TODO } from "@/@types";
import { toast } from "sonner";

const AddUpdateTodoForm = ({
  todo,
  isUpdate = false,
  openTrigger,
  handleOnSubmit,
  userId,
}: {
  todo?: TODO;
  isUpdate?: boolean;
  openTrigger?: ReactNode;
  handleOnSubmit?: (todo: TODO) => void;
  userId?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const defaultValues: Partial<TodoFormValues> = {
    title: todo?.title ?? "",
    body: todo?.body ?? "",
    completed: todo?.completed ?? false,
  };
  async function onSubmit(data: TodoFormValues) {
    setLoading(true);

    if (handleOnSubmit) {
      handleOnSubmit({
        body: data.body ?? "",
        completed: data.completed ?? false,
        id: todo?.id ?? "",
        title: data.title,
      });
    } else {
      const result = await createTodoAction({
        title: data.title,
        body: data.body,
        user_id: userId ?? "",
        completed: data.completed,
      });
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error("Some thing went wrong ");
      }
    }

    form.reset();
    setLoading(false);
    setOpen(false);
  }

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });
  return (
    <div className="">
      {" "}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {openTrigger ? (
            openTrigger
          ) : (
            <Button className=" w-fit cursor-pointer">
              <Plus />
              {isUpdate ? "Update Todo" : "New Todo"}
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Todo</DialogTitle>
            <DialogDescription>
              Make new todos to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-1">
            <Form {...form}>
              <form
                id="todo-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Title of Todo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content of Todo</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Content of Todo"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="completed"
                  render={({ field }) => (
                    <FormItem className="flex gap-2 items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormLabel>Completed</FormLabel>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            {loading === true ? (
              <Button type="submit" form="todo-form" disabled={loading}>
                <Spinner />
                {isUpdate ? "Updating" : "Saving"}
              </Button>
            ) : (
              <Button type="submit" form="todo-form">
                {isUpdate ? "Update" : "Save"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddUpdateTodoForm;
