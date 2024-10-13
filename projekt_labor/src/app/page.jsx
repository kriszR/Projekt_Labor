import SearchBar from "@/components/SearchBar";
import ProductsContainer from "@/components/ProductsContainer";
import { Calendar } from "@/components/ui/calendar";

export default async function Home() {
  return (
    <main>
      <SearchBar />
      <ProductsContainer />
      <Calendar mode="single" />
    </main>
  );
}
