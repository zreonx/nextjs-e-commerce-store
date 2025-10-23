import { getProductBySlug } from "@/lib/actions/product.action";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductPrice from "@/components/shared/product/product-price";
import { Badge } from "@/components/ui/badge";
import ProductImages from "@/components/shared/product/product-images";
import AddToCart from "@/components/shared/product/add-to-cart";
import { getMyCart } from "@/lib/actions/cart.action";
import { Cart } from "@/types";

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const cart = await getMyCart();

  return (
    <>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-5'>
          {/* Images Column */}
          <div className='col-span-2'>
            <ProductImages images={product.images} />
          </div>

          {/* Details Column */}
          <div className='col-span-2 p-5'>
            <div className='flex flex-col gap-6'>
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className='h3-bold'>{product.name}</h1>
              <p>
                {product.rating.toString()} of {product.numReviews} reviews
              </p>
              <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
                <ProductPrice
                  value={Number(product.price)}
                  className='w-24 rounded-full bg-green-100 text-green-700 px-5 py-2'
                />
              </div>
              <div className='mt-10'>
                <p className='font-semibold'>Description</p>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
          {/* Action Column */}
          <div>
            <Card>
              <CardContent>
                <div className='mb-2 flex justify-between'>
                  <div>Price</div>
                  <div>
                    <ProductPrice value={Number(product.price)} />
                  </div>
                </div>
                <div className='mb-2 flex justify-between'>
                  <div>Status</div>
                  {product.stock > 0 ? (
                    <Badge variant={"outline"}>In Stock</Badge>
                  ) : (
                    <Badge variant={"destructive"}>Out of Stock</Badge>
                  )}
                </div>
                {product.stock > 0 && (
                  <div className='flex-center mt-4'>
                    <AddToCart
                      cart={cart}
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price.toString(),
                        qty: 1,
                        image: product.images![0],
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;
