export interface Divida {
  id: string;
  credor: string;
  descricao: string;
  valorTotal: number;
  quantidadeParcelas: number;
  valorParcela: number;
  parcelasPagas: number;
  valorPago: number;
}
