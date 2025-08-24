import prismadb from "@/lib/prismadb";
import ProductForm from "./components/product-from";

const ProductPage = async ({
  params,
}: {
  params: {
    productId: string;
    storeId: string;
  };
}) => {
  const { productId, storeId } = await params;
  const product = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
  });
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: storeId,
    },
  });
  const colors = await prismadb.color.findMany({
    where: {
      storeId: storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={
            product ? { ...product, price: product?.price.toString() } : null
          }
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ProductPage;
