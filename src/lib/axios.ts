import { NewClienteData, ClienteData } from "@/@types/ClienteType";
import { CondutorData } from "@/@types/CondutorType";
import axios from "axios";

export const api = axios.create({
    baseURL: "https://api-deslocamento.herokuapp.com/api/v1/"

})

export async function  getCliente() {
    return api.get("Cliente/");
}

export async function  addCliente(data: NewClienteData) {
    return api.post(`Cliente/`,data);
}

export async function  getClienteById(id: number) {
    return api.get(`Cliente/${id}`);
}

export async function  updateCliente(id: number, data: ClienteData) {
    return api.put(`Cliente/${id}`,data);
}

export async function  deleteCliente(id: number) {
    return api.delete(`Cliente/${id}`);
}

export async function  getCondutor() {
    return api.get("Cliente/");
}

export async function  addCondutor(data: CondutorData) {
    return api.post(`Condutor/`,data);
}

export async function  getCondutorById(id: number) {
    return api.get(`Condutor/${id}`);
}

export async function  updateCondutor(id: number, data: CondutorData) {
    return api.put(`Condutor/${id}`,data);
}

export async function  deleteCondutor(id: number) {
    return api.delete(`Condutor/${id}`);
}