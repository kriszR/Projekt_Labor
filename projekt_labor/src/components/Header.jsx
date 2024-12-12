'use client';
import Link from 'next/link';
import CartSVG from '../../public/images/CartSVG';
import { usePathname } from 'next/navigation';
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import Hamburger from 'hamburger-react';
import { useEffect, useState } from 'react';
import { useUser } from './UserContext';

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const user = useUser();

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (path) => {
    return path === pathname ? 'active-link' : '';
  };

  return (
    <header className='relative z-40 w-screen text-primary'>
      <div className='fixed inset-x-0 top-0 z-10 w-screen bg-secondary'>
        <nav className='container mx-auto flex h-[70px] items-center justify-between lg:h-[95px]'>
          <Link href={'/'}>
            <CartSVG
              className={
                'w-14 fill-primary transition hover:fill-primary-hover lg:w-20'
              }
            />
          </Link>

          <ul className='hidden lg:flex'>
            <li>
              <Link href={'/'} className={`${isActive('/')}`}>
                Home
              </Link>
            </li>

            {user?.id && (
              <li>
                {' '}
                <Link
                  href={'/upload-items'}
                  className={`${isActive('/upload-items')}`}
                >
                  Upload Items
                </Link>
              </li>
            )}

            {(!user?.id && (
              <li>
                <LoginLink>Sign in</LoginLink>/
                <RegisterLink>Sign up</RegisterLink>
              </li>
            )) || (
              <>
                <span className='inline-flex items-center justify-center font-bold'>
                  Welcome back, {user?.firstName}!
                </span>
                <li>
                  <LogoutLink>Log Out</LogoutLink>
                </li>
              </>
            )}
          </ul>
          <div className='lg:hidden'>
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>
        </nav>
      </div>
      <div
        className={`fixed inset-0 bg-secondary lg:hidden ${isOpen ? 'translate-y-0' : '-z-10 -translate-y-full'} transition-transform duration-500`}
      >
        <nav>
          <ul className='flex flex-col items-center gap-y-5 py-24 text-lg'>
            <li>
              <Link href={'/'} className={`${isActive('/')}`}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href={'/upload-items'}
                className={`${isActive('/upload-items')}`}
              >
                Upload Items
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
