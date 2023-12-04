import { InDestaque } from "./Interfaces";

function Destaque(destaque: InDestaque) {
  const somaQuantidadeDestacado = (aumento: number): void => {
    destaque.quantidadeDestacado += aumento;
  };

  const getNome = (): string => destaque.nomeDestacado;

  const getQuantidade = (): number => destaque.quantidadeDestacado;

  return {
    getNome,
    getQuantidade,
    somaQuantidadeDestacado,
  };
}

export default Destaque;
