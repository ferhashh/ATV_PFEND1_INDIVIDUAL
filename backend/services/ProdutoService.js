import Produto from '../models/Produto.js';

export function criarProdutoService({ produtoModel }) {
  async function listar() {
    return produtoModel.listarTodos();
  }

  async function buscarPorId(idRecebido) {
    const id = Number(idRecebido);
    if (!Number.isInteger(id) || id <= 0) {
      throw new TypeError('ID deve ser um número inteiro positivo');
    }

    const produto = await produtoModel.buscarPorId(id);
    if (!produto) throw new Error('Produto ' + id + ' não encontrado');
    return produto;
  }

  function validarProduto(id, dados) {
    const produto = new Produto({ id, ...dados });
    return {
      nome: produto.nome,
      preco: produto.preco,
      estoque: produto.estoque,
      categoria: produto.categoria,
      fabricante: produto.fabricante,
      especificacao: produto.especificacao
    };
  }

  async function criar(dados) {
    return produtoModel.criar(validarProduto(1, dados));
  }

  async function atualizar(idRecebido, dados) {
    const id = Number(idRecebido);
    if (!Number.isInteger(id) || id <= 0) {
      throw new TypeError('ID deve ser um número inteiro positivo');
    }

    const produto = validarProduto(id, dados);
    if (!await produtoModel.buscarPorId(id)) {
      throw new Error('Produto ' + id + ' não encontrado');
    }

    await produtoModel.atualizar(id, produto);
    return { id, ...produto };
  }

  async function deletar(idRecebido) {
    const id = Number(idRecebido);
    if (!Number.isInteger(id) || id <= 0) {
      throw new TypeError('ID deve ser um número inteiro positivo');
    }

    const deletado = await produtoModel.deletar(id);
    if (!deletado) throw new Error('Produto ' + id + ' não encontrado');
  }

  return { listar, buscarPorId, criar, atualizar, deletar };
}
