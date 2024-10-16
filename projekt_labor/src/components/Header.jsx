import Link from 'next/link';
import CartSVG from '@/images/CartSVG';
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";

export default function Header() {
  return (
    <header className='sticky top-0 bg-secondary text-primary z-50'>
      <nav className='container mx-auto flex min-h-[100px] items-center justify-between'>
        <Link href={'/'}>
          <CartSVG
            className={'w-20 fill-slate-200 transition hover:fill-primary'}
          />
        </Link>

        <ul className='flex'>
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li>
            <Link href={'/upload-items'}>Upload Items</Link>
          </li>
        </ul>
        <LoginLink >
                            Sign in
                            </LoginLink>
                            <RegisterLink>
                            Get started

                            </RegisterLink>
      </nav>
    </header>
  );
}
