'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProdutoForm({ produtoEditando, aoSalvar }) {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('Placa de vídeo');
  const [fabricante, setFabricante] = useState('');
  const [especificacao, setEspecificacao] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');

  useEffect(() => {
    if (produtoEditando) {
      setNome(produtoEditando.nome);
      setCategoria(produtoEditando.categoria);
      setFabricante(produtoEditando.fabricante || '');
      setEspecificacao(produtoEditando.especificacao || '');
      setPreco(produtoEditando.preco);
      setEstoque(produtoEditando.estoque);
    }
  }, [produtoEditando]);

  function handleSubmit(e) {
    e.preventDefault();
    aoSalvar({ nome, categoria, fabricante, especificacao, preco: Number(preco), estoque: Number(estoque) });
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="form-group">
        <input className="input-field" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <select className="input-field" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="Placa de vídeo">Placa de vídeo</option>
          <option value="Processador">Processador</option>
        </select>
        <input className="input-field" placeholder="Fabricante" value={fabricante} onChange={(e) => setFabricante(e.target.value)} />
        <input className="input-field" placeholder="Especificações" value={especificacao} onChange={(e) => setEspecificacao(e.target.value)} />
        <input className="input-field" type="number" step="0.01" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} required />
        <input className="input-field" type="number" placeholder="Estoque" value={estoque} onChange={(e) => setEstoque(e.target.value)} required />

        <div className="button-group">
          <button type="submit" className="btn-primary">
            {produtoEditando ? 'Salvar Alterações' : 'Cadastrar Produto'}
          </button>
          
          <button type="button" onClick={() => router.push('/produtos')} className="btn-secondary">
            Cancelar e Voltar
          </button>
        </div>
      </form>
    </div>
  );
}