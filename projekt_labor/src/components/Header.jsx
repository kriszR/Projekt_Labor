"use client";
import CartSVG from "@/images/cart.svg";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-secondary text-primary">
      <nav className="container mx-auto flex justify-between min-h-[100px] items-center">
        <Image src={CartSVG} alt="Cart" className="w-20" />
        <ul className="flex">
          <li>
            <Link href="">Home</Link>
          </li>
          <li>
            <Link href="">Nav Menu1</Link>
          </li>
          <li>
            <Link href="">Nav Menu2</Link>
          </li>
          <li>
            <Link href="">Nav Menu3</Link>
          </li>
          <li>
            <Link href="/upload-items">Upload Items</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
