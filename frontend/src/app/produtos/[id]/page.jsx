'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProdutoForm from '../../../components/ProdutoForm';

const API_URL = 'http://localhost:3005/api/produtos';

export default function EditarProdutoPage() {
  const router = useRouter();
  const params = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    if (params.id) buscarProdutoPorId(params.id);
  }, [params.id]);

  async function buscarProdutoPorId(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error('Não foi possível carregar o produto.');
      const json = await res.json();
      if (json.sucesso) setProduto(json.dados);
      else throw new Error(json.erro || 'Não foi possível carregar o produto.');
    } catch (error) {
      console.error("Erro ao buscar produto", error);
      alert(error.message);
      router.push('/produtos');
    }
  }

  async function atualizarProduto(dados) {
    try {
      const res = await fetch(`${API_URL}/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });

      if (res.ok) {
        alert('Produto atualizado!');
        router.push('/produtos');
      } else {
        const json = await res.json();
        alert(json.erro || 'Erro ao atualizar o produto.');
      }
    } catch (error) {
      console.error("Erro ao atualizar", error);
      alert('Não foi possível conectar ao servidor.');
    }
  }

  if (!produto) return <p style={{ textAlign: 'center' }}>Carregando dados do produto...</p>;

  return (
    <div>
      <h1 className="title">Editar Produto #{params.id}</h1>
      <ProdutoForm produtoEditando={produto} aoSalvar={atualizarProduto} />
    </div>
  );
}
