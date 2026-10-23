export function criarProdutoModel({ pool }) {
  async function listarTodos() {
    const [linhas] = await pool.query('SELECT * FROM produtos');
    return linhas.map(p => ({ ...p, preco: Number(p.preco) }));
  }

  async function buscarPorId(id) {
    const [linhas] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
    if (linhas.length === 0) return null;
    return { ...linhas[0], preco: Number(linhas[0].preco) };
  }

  async function criar(produto) {
    const sql = 'INSERT INTO produtos (nome, preco, estoque, categoria, fabricante, especificacao) VALUES (?, ?, ?, ?, ?, ?)';
    const valores = [produto.nome, produto.preco, produto.estoque, produto.categoria, produto.fabricante, produto.especificacao];
    const [resultado] = await pool.query(sql, valores);
    return { ...produto, id: resultado.insertId };
  }

  async function atualizar(id, produto) {
    const sql = 'UPDATE produtos SET nome = ?, preco = ?, estoque = ?, categoria = ?, fabricante = ?, especificacao = ? WHERE id = ?';
    const valores = [produto.nome, produto.preco, produto.estoque, produto.categoria, produto.fabricante, produto.especificacao, id];
    const [resultado] = await pool.query(sql, valores);
    return resultado.affectedRows > 0;
  }

  async function deletar(id) {
    const [resultado] = await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
    return resultado.affectedRows > 0;
  }

  return { listarTodos, buscarPorId, criar, atualizar, deletar };
}
