export type {
    InEmpresa,
    InCliente,
    InDocumento,
    InTelefone,
    InPet,
    InItemVenda,
    InItemConsumo,
    InDestaque,
};
  
interface InEmpresa {
  clientes: InCliente[];
  produtos: InItemVenda[];
  servicos: InItemVenda[];
}

interface InCliente {
  nome: string;
  nomeSocial?: string;
  cpf: InDocumento;
  rgs: InDocumento[];
  telefones: InTelefone[];
  pets: InPet[];
  produtosConsumidos: InItemConsumo[];
  servicosConsumidos: InItemConsumo[];
}

interface InDocumento {
  valor: string;
  dataEmissao: Date;
}

interface InTelefone {
  ddd: string;
  numero: string;
}

interface InPet {
  nome: string;
  genero: string;
  raca: string;
  tipo: string;
}

interface InItemVenda {
  nome: string;
  valor: number;
}

interface InItemConsumo {
  itemConsumido: InItemVenda;
  dataConsumo: Date;
  petConsumidor: InPet;
}

interface InDestaque {
    nomeDestacado: string;
    quantidadeDestacado: number;
}