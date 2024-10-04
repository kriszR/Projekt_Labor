'use client'
import CartSVG from "../images/cart.svg";
import Image from "next/image";


export default function Header() {


  return (
    <header className="bg-secondary text-primary">
      <nav className="container mx-auto flex justify-between min-h-[100px] items-center">
        <Image src={CartSVG} alt="Cart SVG" className="w-20" />
        <ul className="flex">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Nav Menu1</a>
          </li>
          <li>
            <a href="#">Nav Menu2</a>
          </li>
          <li>
            <a href="#">Nav Menu3</a>
          </li>
          <li>
            <a href="#">Nav Menu4</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
