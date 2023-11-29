import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthContext from './context/AuthContext';
import ActiveStatus from './components/ActiveStatus';
import ToasterContext from './context/ToasterContext';
import Provider from './components/Provider';
// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Message chat',
  description: 'Message chat',
};
const languages = ['en', 'zh'];

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang={locale}>
      <body>
        <Provider>
          <AuthContext>
            <ToasterContext />
            <ActiveStatus />
            {children}
          </AuthContext>
        </Provider>
      </body>
    </html>
  );
}
