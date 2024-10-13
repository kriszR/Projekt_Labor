import { Button } from "./ui/button";
import { Plus } from 'lucide-react';

export default function Product({ name, category, description }) {
  return (
    <div className="px-1 lg:w-1/4 md:w-1/2 w-full">
      <div className="bg-white h-full rounded p-2 relative">
        <h2>{name}</h2>
        <p>{category}</p>
        <p>{description}</p>
        <Button className="bg-green-400 absolute right-2 bottom-2 px-2 h-7" ><Plus size={20} /></Button>
      </div>
    </div>
  );
}
