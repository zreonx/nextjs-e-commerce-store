import { ShoppingCart, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import ModeToggle from "./mode-toggle";

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          <Link href='/' className='flex-start'>
            <Image
              src='/images/logo.svg'
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority
            />
            <span className='hidden lg:block font-bold text-2xl ml-3'>
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className='space-x-2'>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
