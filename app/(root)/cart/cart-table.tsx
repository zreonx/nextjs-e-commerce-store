"use client";
import { useRouter } from "next/navigation";
import { Cart } from "@/types";
import { toast } from "sonner";
import { useTransition } from "react";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { ArrowRight, Loader, Minus, PlusIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const [isPending, startTranstion] = useTransition();

  return (
    <>
      <h1 className='py-4 h2-bold'>Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <>
          Cart is empy. <Link href={"/"}>Go Shopping</Link>{" "}
        </>
      ) : (
        <>
          <div className='grid md:grid-cols-4 md:gap-5'>
            <div className='overflow-x-auto md:col-span-3'>Table</div>
          </div>
        </>
      )}
    </>
  );
};

export default CartTable;
