export interface CondutorData {
        id: number,
        nome: string,
        numeroHabilitacao: string,
        categoriaHabilitacao: string,
        vencimentoHabilitacao: string,
}

export interface NewCondutorData {
        nome: string,
        numeroHabilitacao: string,
        categoriaHabilitacao: string,
        vencimentoHabilitacao: string,
}

const date = new Date()