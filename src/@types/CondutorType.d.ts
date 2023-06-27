export interface CondutorData {
        id: number,
        nome: string,
        numeroHabilitacao: string,
        catergoriaHabilitacao: string,
        vencimentoHabilitacao: string,
}

export interface NewCondutorData {
        nome: string,
        numeroHabilitacao: string,
        categoriaHabilitacao: string,
        vencimentoHabilitacao: string,
}

export interface EditCondutorData {
        id: number,
        categoriaHabilitacao: string,
        vencimentoHabilitacao: string,
}