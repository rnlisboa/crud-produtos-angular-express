export default interface ProdutoEntity {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
}
