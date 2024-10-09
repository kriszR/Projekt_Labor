import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { Calendar } from "@/components/ui/calendar";
import { PrismaClient } from "@prisma/client";
import { Product } from "@/components/Product"

const prisma = new PrismaClient();


export default async function Home() {
  const products = await prisma.products.findMany();

  return (
    <>
      <Header />
      <main>
        <SearchBar />
        <div>
          {products.map((product, index) => 
            (
              <Product key={index} product={product} />
            )
          )}
        </div>
        <Calendar mode="single" />
      </main>
    </>
  );
}
