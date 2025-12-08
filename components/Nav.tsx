import AddUpdateTodoForm from "@/components/AddUpdateTodoForm";
import { ModeToggle } from "@/components/ModeToggle";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
const Nav = ({ userId }: { userId: string }) => {
  return (
    <div className="flex flex-row justify-between gap-2 ">
      <div>
        <h1 className="text-[24px] font-bold italic">Your Todos</h1>
      </div>
      <div className="flex flex-row-reverse  gap-2 ">
        <ModeToggle />
        <AddUpdateTodoForm userId={userId} />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default Nav;
