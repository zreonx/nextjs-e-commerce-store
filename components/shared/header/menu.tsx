import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import {
  EllipsisVertical,
  MenuIcon,
  MenuSquare,
  ShoppingCart,
  SquareMenu,
  UserIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Menu = () => {
  return (
    <div className='flex justify-end gap-3'>
      <nav className='hidden md:flex w-full max-w-xs gap-1'>
        <ModeToggle />
        <Button asChild variant='ghost'>
          <Link href='/cart'>
            <ShoppingCart /> Cart
          </Link>
        </Button>
        <Button asChild>
          <Link href='/sign-in'>
            <UserIcon /> Sign in
          </Link>
        </Button>
      </nav>
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='align-middle'>
            {/* <EllipsisVertical /> */}
            <MenuIcon />
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>

            <div className='flex flex-col items-start gap-6 flex-1 px-4'>
              <ModeToggle />
              <Button asChild variant='ghost'>
                <Link href='/cart'>
                  <ShoppingCart /> Cart
                </Link>
              </Button>
              <Button asChild>
                <Link href='/sign-in'>
                  <UserIcon /> Sign-in
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};
export default Menu;
