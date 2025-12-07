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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
const todoFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
  body: z
    .string()
    .max(160, {
      message: "Content of todo must be at least 160 characters.",
    })
    .min(4, {
      message: "Content of todo must be at least 4 characters.",
    })
    .optional(),
  completed: z.boolean().optional(),
});

type TodoFormValues = z.infer<typeof todoFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<TodoFormValues> = {
  title: "",
  body: "",
  completed: false,
};

function onSubmit(data: TodoFormValues) {
  console.log({
    title: data.title,
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{data.body}</code>
      </pre>
    ),
  });
}
export default function Home() {
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* <pre>{JSON.stringify(todos, undefined, 2)}</pre> */}
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            New Todo
          </Button>
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
              </form>
            </Form>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" form="todo-form">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
