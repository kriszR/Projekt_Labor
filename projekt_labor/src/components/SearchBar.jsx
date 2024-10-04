import { Button } from "../components/ui/button";

export default function SearchBar() {
  return (
    <div className="flex justify-center gap-x-5">
      <input type="text" className="w-[30%] text-2xl rounded"></input>
      <Button>Search</Button>
    </div>
  );
}
