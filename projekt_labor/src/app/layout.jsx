import './globals.scss';
import Header from '@/components/Header';
import { UserProvider } from '@/components/UserContext';

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang='en'>
        <body className={`overflow-x-hidden antialiased`}>
          <Header />
          {children}
        </body>
      </html>
    </UserProvider>
  );
}
