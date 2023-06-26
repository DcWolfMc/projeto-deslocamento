import { Add, ArrowForward, Search } from "@mui/icons-material";
import {
  Typography,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  CircularProgress,
} from "@mui/material";
import router from "next/router";
import { ClienteContainer, ContentPaper } from "./styles";
import { ClienteData, NewClienteData } from "@/@types/ClienteType";
import { FormEvent, useState } from "react";
import { addCliente } from "@/lib/axios";
import { AxiosError, AxiosResponse } from "axios";

export default function NewCliente() {
  const [nome, setNome] = useState<string>("");
  const [tipoDocumento, setTipoDocumento] = useState<string>("");
  const [numeroDocumento, setNumeroDocumento] = useState<string>("");
  const [logradouro, setLogradouro] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [uf, setUf] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit(event: FormEvent) {

    event.preventDefault();
    setLoading(true)
    const newClienteData:NewClienteData = {
      nome,
      numeroDocumento,
      tipoDocumento,
      bairro,
      cidade,
      logradouro,
      numero,
      uf
    }
    await addCliente(newClienteData).then((response:AxiosResponse)=>{
      console.log("newCliente response data:", response.data);
      router.push(`/cliente?id=${response.data}`)
      
    }).catch((error:AxiosError)=>{
      console.log("newCliente error:", error.message);
      setLoading(false);
    })

  }
  return (
    <ClienteContainer maxWidth={"xl"}>
      <Stack maxWidth={470}>
        <Typography variant="h5" fontWeight={700} color={"primary.main"}>
          Cadastre um novo cliente
        </Typography>
        <Typography variant="body2" color={"text.secondary"}>
          Precisamos de algumas informações para criar seu perfil de Cliente!
          Ah, você pode editar essas informações depois.
        </Typography>
      </Stack>
          <ContentPaper>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    label="nome do Cliente"
                    value={nome}
                    variant="outlined"
                    size="small"
                    required
                    onChange={(e)=>setNome(e.target.value)}
                    sx={{ input: { color: "text.secondary" } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl size="small" fullWidth>
                    <InputLabel>Tipo do Documento</InputLabel>
                    <Select
                      value={tipoDocumento}
                      label="Tipo documento"
                      required
                      onChange={(e) => setTipoDocumento(e.target.value)}
                      sx={{color:"text.secondary"}}
                    >
                      <MenuItem value={"RG"}>RG</MenuItem>
                      <MenuItem value={"CPF"}>CPF</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Nº documento"
                    variant="outlined"
                    value={numeroDocumento}
                    size="small"
                    type="number"
                    fullWidth
                    required
                    onChange={(e)=> setNumeroDocumento(e.target.value)}
                    sx={{ input: { color: "text.secondary" } }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label="logradouro"
                    variant="outlined"
                    value={logradouro}
                    size="small"
                    required
                    onChange={(e)=>setLogradouro(e.target.value)}
                    sx={{ input: { color: "text.secondary" } }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="number"
                    label="Nº"
                    value={numero}
                    variant="outlined"
                    size="small"
                    onChange={(e)=>setNumero(e.target.value)}
                    sx={{ input: { color: "text.secondary" } }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Bairro"
                    variant="outlined"
                    value={bairro}
                    size="small"
                    onChange={(e)=>setBairro(e.target.value)}
                    sx={{ input: { color: "text.secondary" } }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="cidade"
                    variant="outlined"
                    value={cidade}
                    size="small"
                    onChange={(e)=>setCidade(e.target.value)}
                    sx={{ input: { color: "text.secondary" } }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="UF"
                    variant="outlined"
                    value={uf}
                    size="small"
                    onChange={(e)=>setUf(e.target.value.toUpperCase())}
                    sx={{ input: { color: "text.secondary" } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" fullWidth variant="contained" color="success" disabled={loading} endIcon={!loading&&<ArrowForward />}>
                    {loading?(<CircularProgress color="inherit" />) :("Cadastrar")}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </ContentPaper>
    </ClienteContainer>
  );
}
