import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Gerenciador de Hardware',
  description: 'Sistema operacional de controle de estoque',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}