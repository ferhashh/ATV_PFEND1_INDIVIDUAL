'use client';
import Link from 'next/link';

export default function ProdutoLista({ produtos, aoDeletar }) {
  if (produtos.length === 0) return <p style={{ textAlign: 'center' }}>Nenhum produto cadastrado.</p>;

  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th><th>Nome</th><th>Categoria</th><th>Fabricante</th><th>Preço</th><th>Estoque</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.categoria}</td>
              <td>{produto.fabricante || '-'}</td>
              <td>R$ {produto.preco.toFixed(2)}</td>
              <td>{produto.estoque} un.</td>
              <td>
                <Link href={`/produtos/${produto.id}`} className="btn-edit link-button">Editar</Link>
                <button onClick={() => aoDeletar(produto.id)} className="btn-delete">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}