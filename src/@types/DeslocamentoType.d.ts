export interface DeslocamentoData {
        id: number,
        kmInicial: number,
        kmFinal?: number,
        inicioDeslocamento: string
        fimDeslocamento?: string
        checkList?: string,
        motivo?: string,
        observacao?: string,
        idCondutor: number,
        idVeiculo: number,
        idCliente: number
}

export interface NewDeslocamentoData {
        kmInicial: number,
        inicioDeslocamento: string,
        checkList?: string,
        motivo?: string,
        observacao?: string,
        idCondutor: number,
        idVeiculo: number,
        idCliente: number
}
export interface EditDeslocamentoData {
        id: number,
        kmFinal: number,
        fimDeslocamento: string,
        observacao?: string
}