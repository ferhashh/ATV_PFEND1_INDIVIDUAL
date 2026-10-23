'use client';
import { useState, useEffect } from 'react';
import ProdutoLista from '../../components/ProdutoLista';

const API_URL = 'http://localhost:3005/api/produtos';

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Não foi possível buscar os produtos.');

      const json = await res.json();
      if (!json.sucesso) throw new Error(json.erro || 'Não foi possível buscar os produtos.');

      setProdutos(json.dados);
      setErro('');
    } catch (error) {
      console.error("Erro ao buscar", error);
      setErro('Não foi possível conectar ao servidor. Verifique se o backend está em execução.');
    }
  }

  async function deletarProduto(id) {
    if (!confirm("Tem certeza que deseja deletar este produto?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        buscarProdutos();
      } else {
        const json = await res.json();
        alert(json.erro || 'Não foi possível excluir o produto.');
      }
    } catch (error) {
      console.error("Erro ao deletar", error);
      alert('Não foi possível conectar ao servidor.');
    }
  }

  return (
    <div>
      <h1 className="title">Catálogo de Produtos</h1>
      {erro ? <p role="alert" style={{ textAlign: 'center' }}>{erro}</p> : <ProdutoLista produtos={produtos} aoDeletar={deletarProduto} />}
    </div>
  );
}
