import { NewClienteData, ClienteData, EditClienteData } from "@/@types/ClienteType";
import { CondutorData, EditCondutorData,NewCondutorData } from "@/@types/CondutorType";
import { DeslocamentoData, EditDeslocamentoData,NewDeslocamentoData } from "@/@types/DeslocamentoType";
import { VeiculoData,EditVeiculoData,NewVeiculoData } from "@/@types/VeiculoType";
import axios from "axios";

export const api = axios.create({
    baseURL: "https://api-deslocamento.herokuapp.com/api/v1/"

})
// Cliente

export async function  getCliente() {
    return api.get("Cliente/");
}

export async function  addCliente(data: NewClienteData) {
    return api.post(`Cliente/`,data);
}

export async function  getClienteById(id: number)  {
    return api.get(`Cliente/${id}`);
}

export async function  updateCliente(id: number, data: EditClienteData) {
    return api.put(`Cliente/${id}`,data);
}

export async function  deleteCliente(id: number) {
    return api.delete(`Cliente/${id}`,{data: {id: id}});
}


// Condutor

export async function  getCondutor()  {
    return api.get("Condutor/");
}

export async function  addCondutor(data: NewCondutorData) {
    return api.post(`Condutor/`,data);
}

export async function  getCondutorById(id: number) {
    return api.get(`Condutor/${id}`);
}

export async function  updateCondutor(id: number, data: EditCondutorData) {
    return api.put(`Condutor/${id}`,data);
}

export async function  deleteCondutor(id: number) {
    return api.delete(`Condutor/${id}`,{data: {id: id}});
}

// Deslocamento

export async function  getDeslocamento() {
    return api.get("Deslocamento/");
}

export async function  startDeslocamento(data: NewDeslocamentoData) {
    return api.post(`Deslocamento/IniciarDeslocamento/`,data);
}

export async function  getDeslocamentoById(id: number) {
    return api.get(`Deslocamento/${id}`);
}

export async function  endDeslocamento(id: number, data: EditDeslocamentoData) {
    return api.put(`Deslocamento/${id}/EncerrarDeslocamento`,data);
}

export async function  deleteDeslocamento(id: number) {
    return api.delete(`Deslocamento/${id}`,{data: {id: id}});
}


//Veiculo

export async function  getVeiculo() {
    return api.get("Veiculo/");
}

export async function  addVeiculo(data: NewVeiculoData) {
    return api.post(`Veiculo/`,data);
}

export async function  getVeiculoById(id: number) {
    return api.get(`Veiculo/${id}`);
}

export async function  updateVeiculo(id: number, data: EditVeiculoData) {
    return api.put(`Veiculo/${id}`,data);
}

export async function  deleteVeiculo(id: number) {
    return api.delete(`Veiculo/${id}`,{data: {id: id}});
}