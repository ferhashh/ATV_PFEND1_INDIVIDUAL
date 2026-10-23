'use client';
import { useRouter } from 'next/navigation';
import ProdutoForm from '../../../components/ProdutoForm';

const API_URL = 'http://localhost:3005/api/produtos';

export default function NovoProdutoPage() {
  const router = useRouter();

  async function salvarNovoProduto(dados) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });

      if (res.ok) {
        alert('Produto cadastrado com sucesso!');
        router.push('/produtos');
      } else {
        const json = await res.json();
        alert(json.erro || 'Erro ao cadastrar.');
      }
    } catch (error) {
      console.error("Erro", error);
      alert('Não foi possível conectar ao servidor.');
    }
  }

  return (
    <div>
      <h1 className="title">Cadastrar Novo Hardware</h1>
      <ProdutoForm aoSalvar={salvarNovoProduto} />
    </div>
  );
}
