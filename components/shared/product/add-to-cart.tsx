"use client";
import { type CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.action";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
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
  };
  return (
    <Button className='w-full ' type='button' onClick={handleAddToCart}>
      <PlusIcon /> Add To Cart
    </Button>
  );
};

export default AddToCart;
