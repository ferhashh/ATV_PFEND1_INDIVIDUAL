'use client';
import { useState, useEffect } from 'react';
import ProdutoLista from '../../components/ProdutoLista';

const API_URL = 'http://localhost:3005/api/produtos';

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      if (json.sucesso) setProdutos(json.dados);
    } catch (error) {
      console.error("Erro ao buscar", error);
    }
  }

  async function deletarProduto(id) {
    if (!confirm("Tem certeza que deseja deletar este produto?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) buscarProdutos();
    } catch (error) {
      console.error("Erro ao deletar", error);
    }
  }

  const produtosFiltrados = filtro === 'Todos' 
    ? produtos 
    : produtos.filter((produto) => produto.categoria === filtro);

  return (
    <div>
      <h1 className="title">Catálogo de Produtos</h1>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
        <button 
          onClick={() => setFiltro('Todos')} 
          className={filtro === 'Todos' ? 'btn-primary' : 'btn-secondary'}
        >
          Todos
        </button>
        <button 
          onClick={() => setFiltro('Placa de vídeo')} 
          className={filtro === 'Placa de vídeo' ? 'btn-primary' : 'btn-secondary'}
        >
          Placas de Vídeo
        </button>
        <button 
          onClick={() => setFiltro('Processador')} 
          className={filtro === 'Processador' ? 'btn-primary' : 'btn-secondary'}
        >
          Processadores
        </button>
      </div>

      <ProdutoLista produtos={produtosFiltrados} aoDeletar={deletarProduto} />
    </div>
  );
}