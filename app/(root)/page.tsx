import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.action";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const HomePage = async () => {

  const latestProducts = await getLatestProducts();

  // console.log(sampleData);
  return (
    <>
      <ProductList
        data={latestProducts}
        title='Newest Arrivals'
        limit={4}
      />
    </>
  );
};

export default HomePage;
