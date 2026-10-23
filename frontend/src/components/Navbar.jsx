'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="nav-link">Início</Link>
      <Link href="/produtos" className="nav-link">Produtos</Link>
      <Link href="/produtos/novo" className="nav-link">Novo Cadastro</Link>
    </nav>
  );
}