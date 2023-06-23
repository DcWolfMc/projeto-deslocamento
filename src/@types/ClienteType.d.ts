export interface ClienteData{
    id: number,
    numeroDocumento: string,
    tipoDocumento: "RG"|"CPF",
    nome: string,
    logradouro?: string,
    numero?: string,
    bairro?: string,
    cidade?: string,
    uf?: string
}

export interface NewClienteData{
    numeroDocumento: string,
    tipoDocumento: "RG"|"CPF",
    nome: string,
    logradouro?: string,
    numero?: string,
    bairro?: string,
    cidade?: string,
    uf?: string
}