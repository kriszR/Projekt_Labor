"use client";
import Link from "next/link";
import CartSVG from "@/images/CartSVG";

export default function Header() {
  return (
    <header className="bg-secondary text-primary sticky top-0">
      <nav className="container mx-auto flex justify-between min-h-[100px] items-center">
        <Link href={"/"}>
          <CartSVG
            className={
              "w-20 fill-slate-200 hover:fill-primary transition"
            }
          />
        </Link>

        <ul className="flex">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/upload-items"}>Upload Items</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
