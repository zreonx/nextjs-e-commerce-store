"use client";
import { type CartItem, Cart } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PlusIcon, Minus, Loader } from "lucide-react";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { useTransition } from "react";

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const [isPending, startTranstion] = useTransition();

  const handleAddToCart = async () => {
    startTranstion(async () => {
      const response = await addItemToCart(item);

      if (!response?.success) {
        toast.error(response?.message);
        return;
      }
      // Handle success add to cart
      toast.message(null, {
        description: (
          <div className='flex gap-0.5'>
            <p>{response.message}</p>
            <Button onClick={() => router.push("/cart")}>Go to cart</Button>
          </div>
        ),
      });
    });
  };

  // Handle remove from cart
  const handleRemoveFromCart = async () => {
    startTranstion(async () => {
      const res = await removeItemFromCart(item.productId);
      // Handle success add to cart
      toast.message(null, {
        description: (
          <div className='flex gap-0.5'>
            <p>{res.message}</p>
            <Button onClick={() => router.push("/cart")}>Go to cart</Button>
          </div>
        ),
      });

      return;
    });
  };

  // Check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);
  return !existItem ? (
    <Button
      disabled={isPending}
      className='w-full'
      type='button'
      onClick={handleAddToCart}
    >
      {isPending ? (
        <Loader className='h-4 w-4 animate-spin' />
      ) : (
        <PlusIcon className='w-4 h-4' />
      )}{" "}
      Add To Cart
    </Button>
  ) : (
    <div>
      <Button
        disabled={isPending}
        type='button'
        variant='outline'
        onClick={handleRemoveFromCart}
      >
        {isPending ? (
          <Loader className='h-4 w-4 animate-spin' />
        ) : (
          <Minus className='w-4 h-4' />
        )}
      </Button>
      <span className='px-2'>{existItem.qty}</span>
      <Button
        disabled={isPending}
        type='button'
        variant='outline'
        onClick={handleAddToCart}
      >
        {isPending ? (
          <Loader className='h-4 w-4 animate-spin' />
        ) : (
          <PlusIcon className='w-4 h-4' />
        )}
      </Button>
    </div>
  );
};

export default AddToCart;
