'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  
  const [editandoId, setEditandoId] = useState(null);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [categoria, setCategoria] = useState('Placa de vídeo');
  const [fabricante, setFabricante] = useState('');
  const [especificacao, setEspecificacao] = useState('');

  async function carregarProdutos() {
    try {
      const resposta = await fetch('http://localhost:3005/api/produtos');
      const json = await resposta.json();
      if (json.sucesso) {
        setProdutos(json.dados);
      }
    } catch (erro) {
      console.error("Erro ao buscar produtos:", erro);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const dadosDoFormulario = {
      nome,
      preco: Number(preco),
      estoque: Number(estoque),
      categoria,
      fabricante,
      especificacao
    };

    const url = editandoId 
      ? `http://localhost:3005/api/produtos/${editandoId}` 
      : 'http://localhost:3005/api/produtos';
    
    const metodo = editandoId ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosDoFormulario)
      });

      setNome('');
      setPreco('');
      setEstoque('');
      setCategoria('Placa de vídeo');
      setFabricante('');
      setEspecificacao('');
      setEditandoId(null);

      carregarProdutos();
    } catch (erro) {
      console.error("Erro ao salvar produto:", erro);
    }
  }

  async function deletarProduto(id) {
    const confirmacao = window.confirm("Tem certeza que deseja deletar este produto?");
    if (confirmacao) {
      try {
        await fetch(`http://localhost:3005/api/produtos/${id}`, {
          method: 'DELETE'
        });
        carregarProdutos(); // Recarrega a lista atualizada
      } catch (erro) {
        console.error("Erro ao deletar produto:", erro);
      }
    }
  }

  function prepararEdicao(produto) {
    setEditandoId(produto.id);
    setNome(produto.nome);
    setPreco(produto.preco);
    setEstoque(produto.estoque);
    setCategoria(produto.categoria);
    setFabricante(produto.fabricante || '');
    setEspecificacao(produto.especificacao || '');
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>Gerenciador Operacional de Hardware</h1>

      <section className={styles.card}>
        <h2>{editandoId ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h2>
        
        <form onSubmit={handleSubmit} className={styles.formulario}>
          <input 
            type="text" placeholder="Nome do produto" required 
            value={nome} onChange={(e) => setNome(e.target.value)} 
          />
          
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="Placa de vídeo">Placa de vídeo</option>
            <option value="Processador">Processador</option>
          </select>

          <input 
            type="text" placeholder="Fabricante (Ex: NVIDIA, AMD)" 
            value={fabricante} onChange={(e) => setFabricante(e.target.value)} 
          />

          <input 
            type="text" placeholder="Especificação (Ex: 8GB, 6 Núcleos)" 
            value={especificacao} onChange={(e) => setEspecificacao(e.target.value)} 
          />

          <input 
            type="number" step="0.01" placeholder="Preço" required 
            value={preco} onChange={(e) => setPreco(e.target.value)} 
          />

          <input 
            type="number" placeholder="Quantidade em Estoque" required 
            value={estoque} onChange={(e) => setEstoque(e.target.value)} 
          />

          <button type="submit" className={styles.botaoSalvar}>
            {editandoId ? 'Atualizar Produto' : 'Cadastrar'}
          </button>
          
          {editandoId && (
            <button type="button" onClick={() => setEditandoId(null)} className={styles.botaoCancelar}>
              Cancelar Edição
            </button>
          )}
        </form>
      </section>

      <section className={styles.card}>
        <h2>Catálogo de Produtos</h2>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Fabricante</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.categoria}</td>
                <td>{produto.fabricante || '-'}</td>
                <td>R$ {Number(produto.preco).toFixed(2)}</td>
                <td>{produto.estoque}</td>
                <td>
                  <button onClick={() => prepararEdicao(produto)} className={styles.botaoEditar}>
                    Editar
                  </button>
                  <button onClick={() => deletarProduto(produto.id)} className={styles.botaoDeletar}>
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}