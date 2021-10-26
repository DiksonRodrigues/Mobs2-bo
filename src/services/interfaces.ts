export interface IVehicleDescription {
  id: number;
  assets_id: number;
  dealer_id: number;
  group_id: number;
  subgroup_id: number;
  site_id: number;
  serial_unit: string;
  id_unit: string;
  description: string;
  registration_number: string;
  device: string;
  status: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: number;
  model: number;
  year: string;
  chassi: number;
  type: number;
  consumo: string;
  capacidade: string;
  passageiros: string;
  notes: number;
  fuel: number;
  IdScriptGrupoConfig: string;
  IdScriptGrupoEventos: number;
  idUser: string;
  idEmitGas: number;
  idPeripheric: number;
  assets_state_id: number;
  active_type_id: number;
  device_type_id: number;
  assets_fuel_type_id: number;
  technology_type_id: number;
  peripheral_id: number;
  active_model_id: number;
  asset_chip_id: number;
  active_manufacturer_id: string;
  peripheral2_id: number;
  asset_chip: number;
  horimetroinicial: string;
  horimetroatual: string;
  odometroinicial: number;
  odometroatual: number;
  transdatavalidadorid: number;
  datainstalacao: number;
  dataretirada: number;
  dataativacaoavisosonoros: number;
  imei: number;
}

export interface IEnterprises {
  id: number;
  name: string;
  cnpj: string;
  address: string;
  contract_start_date: string;
  contract_end_date: string;
}

export interface ILinha {
  id: number;
  codigo: string;
  nome: string;
  nome_fantasia: string;
}

export interface IStatus {
  id: number;
  name: string;
}

export interface IStoppingPoints {
  id: number;
  endereco: string;
  tipo: string;
  codigo_referencia: string;
  cerca: string;
  created_at: string;
  updated_at: string;
  lat: string;
  lng: string;
  nome: string;
  Linha_id: number;
  idpontoembarcado: number;
}

export interface IDriver {
  id: number;
  name: string;
  drivers_id: number;
  dealer_id: number;
  group_id: number;
  subgroup_id: number;
  site_id: number;
  employee_number: string;
  extended_id: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: number;
  telefone: number;
  tipo: string;
  cpf: number;
  password: number;
  id_supervisor: number;
  id_gerente: number;
  id_diretor: number;
  auth_token: string;
  id_group_employee: number;
  epk_goal: number;
  kml_goal: number;
  passenger_schedule_id: number;
  passwordhash: number;
  drivers_type_id: string;
  driver_type: {
    id: number;
    type: string;
    created_at: string;
    updated_at: string;
  };
}

export interface IHist {
  id: string;
  tipo: string;
  veiculo: string;
  driver: {name: string};
  cliente: string;
  obra: {nome: string};
  closed_at: string;
  created_at: string;
  costs: [{value:string},{value:string},{value:string}]
  custo_cliente: string;
  custo_empresa: string;
  custo_motorista: string;
}

export interface ICosts {
  id: number;
  created_at: string;
  updated_at: string;
  desc: string;
  value: string;
  accountable: string;
  boletim_ocorrencia_id: string;
}

export interface IListMedidasTomadas {
  desc: string;
  created_at: string;
  dataToShow: string;
}

export interface ITypes {
  id: number;
  desc: string;
  days: number;
}

export interface ITerceiro {
  nome: string,
  celular: string,
  rg: string,
  cpf: string,
  cnh: string,
  cnh_validade: string,
  endereco: string,
  numero: string,
  complemento: string,
  cnh_frente: string,
  cnh_verso: string
}

export interface IBoletimID {
  boletim_ocorrencia_type_id: string,
  updated_at: string,
  created_at: string,
  id: number,
  opened_at: string,
  tipo: string,
  hasImage: boolean,
  status: null,
  cliente: null,
  dias_bo: number,
  dias_manutencao: number,
  veiculo: null,
  custo_cliente: number,
  custo_empresa: number,
  custo_motorista: number,
  dias_bo_maxed: boolean,
  type: {
    id: number,
    desc: string,
    created_at: string,
    updated_at: string,
    days: number
  },
  images: [],
  assets_state: null,
  contracted_company: null,
  asset: null,
  costs: []
}
