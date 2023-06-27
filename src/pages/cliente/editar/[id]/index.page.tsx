import { ClienteData, EditClienteData } from "@/@types/ClienteType";
import { addCliente, getClienteById, updateCliente } from "@/lib/axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ClienteContainer, ContentPaper } from "./styles";
import { Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { AxiosResponse, AxiosError } from "axios";
export default function ClientePage(props: ClienteData) {
    const {id} = props
    const [nome, setNome] = useState<string>(props.nome);
    const [tipoDocumento, setTipoDocumento] = useState<string>(props.tipoDocumento);
    const [numeroDocumento, setNumeroDocumento] = useState<string>(props.numeroDocumento);
    const [logradouro, setLogradouro] = useState<string|undefined>(props.logradouro);
    const [numero, setNumero] = useState<string|undefined>(props.numero);
    const [bairro, setBairro] = useState<string|undefined>(props.bairro);
    const [cidade, setCidade] = useState<string|undefined>(props.cidade);
    const [uf, setUf] = useState<string|undefined>(props.uf);
    const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();
  console.log(props);

  async function handleSubmit(event: FormEvent) {

    event.preventDefault();
    setLoading(true)
    const EditClienteData:EditClienteData = {
      id,
      nome,
      bairro,
      cidade,
      logradouro,
      numero,
      uf
    }
    await updateCliente(id, EditClienteData).then((response:AxiosResponse)=>{
      console.log("editCliente response data:", response.data);
      router.push(`/cliente/${response.data}`)
      
    }).catch((error:AxiosError)=>{
      console.log("editCliente error:", error.message);
      setLoading(false);
    })

  }

  return (
    <ClienteContainer maxWidth={"xl"}>
      <Stack maxWidth={470}>
        <Typography variant="h5" fontWeight={700} color={"primary.main"}>
          Editar de Cliente
        </Typography>
        <Typography variant="body2" fontWeight={500} color={"text.primary"}>
          Seja bem-vindo a edição de cliente, {props.nome}! Se quiser alterar o nome, logradouro e outros dados associado à sua a conta de cliente, você poderá fazê-lo a seguir.
        </Typography>
      </Stack>
      <ContentPaper>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                label="Nome do Cliente"
                value={nome}
                variant="outlined"
                size="small"
                required
                onChange={(e) => setNome(e.target.value)}
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl size="small" fullWidth>
                <InputLabel sx={{color:"text.disabled"}}>Tipo do Documento</InputLabel>
                <Select
                  value={tipoDocumento}
                  label="Tipo documento"
                  required
                  disabled
                  onChange={(e) => setTipoDocumento(e.target.value)}
                  sx={{ color: "text.primary" }}
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
                disabled
                required
                onChange={(e) => setNumeroDocumento(e.target.value)}
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Logradouro"
                variant="outlined"
                value={logradouro}
                size="small"
                required
                onChange={(e) => setLogradouro(e.target.value)}
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
                onChange={(e) => setNumero(e.target.value)}
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Bairro"
                variant="outlined"
                value={bairro}
                size="small"
                onChange={(e) => setBairro(e.target.value)}
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Cidade"
                variant="outlined"
                value={cidade}
                size="small"
                onChange={(e) => setCidade(e.target.value)}
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="UF"
                variant="outlined"
                value={uf}
                size="small"
                onChange={(e) => setUf(e.target.value.toUpperCase())}
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>
            <Grid item xs={6} color={"text.secondary"} >
              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                startIcon={!loading && <ArrowBack />}
                onClick={()=>router.back()}
              >
                 Voltar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                disabled={loading}
                endIcon={!loading && <ArrowForward />}
              >
                {loading ? <CircularProgress color="inherit" /> : "Editar"}
              </Button>
            </Grid>
            
          </Grid>
        </form>
      </ContentPaper>
      <Typography variant="body2" fontWeight={700} color={"text.primary"}>
          *Para modificar dados como Tipo de documento e Número do Documento, busca atendimento personalizado na central.
        </Typography>
    </ClienteContainer>
  );
}


export const getStaticPaths: GetStaticPaths = async () => {
    return {
      paths: [],
      fallback: "blocking",
    };
  };
  
  export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
    params,
  }) => {
    const clienteId = String(params?.id);
  
    const cliente = await getClienteById(Number(clienteId));
    const data = await cliente.data;
    return {
      props: data,
      revalidate: 60 * 10, // 10 minutes
    };
  };
  