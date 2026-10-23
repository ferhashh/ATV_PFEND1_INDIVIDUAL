'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="card" style={{ textAlign: 'center', padding: '50px 20px' }}>
      <h1 className="title" style={{ fontSize: '2.5rem' }}>Painel Operacional</h1>
      <p style={{ color: '#666', fontSize: '18px', marginBottom: '30px' }}>
        Bem-vindo ao sistema de gerenciamento de hardware. Escolha uma opção abaixo para começar.
      </p>
      
      <div className="button-group" style={{ justifyContent: 'center', gap: '20px' }}>
        <Link href="/produtos" className="btn-primary link-button">
          Ver Catálogo
        </Link>
        <Link href="/produtos/novo" className="btn-secondary link-button">
          Cadastrar Novo
        </Link>
      </div>
    </main>
  );
}