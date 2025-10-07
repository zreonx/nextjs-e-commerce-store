import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { MenuIcon, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserButton from "./user-button";

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
        <UserButton />
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
              <UserButton />
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};
export default Menu;
