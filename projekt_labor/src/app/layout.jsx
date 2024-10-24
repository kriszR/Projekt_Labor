import Providers from '@/components/Providers';
import './globals.scss';
import Header from '@/components/Header';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`overflow-x-hidden antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
