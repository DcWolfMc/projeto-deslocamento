export interface VeiculoData {
        id: number,
        placa: string,
        marcaModelo: string,
        anoFabricacao: number,
        kmAtual: number,
}

export interface NewVeiculoData {
        placa: string,
        marcaModelo: string,
        anoFabricacao: number,
        kmAtual: number,
}
export interface EditVeiculoData {
        id: number,
        marcaModelo: string,
        anoFabricacao: number,
        kmAtual: number,
}