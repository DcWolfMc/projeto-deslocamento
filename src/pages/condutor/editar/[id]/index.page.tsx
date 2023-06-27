import { CondutorData, EditCondutorData } from "@/@types/CondutorType";
import { addCondutor, getCondutorById, updateCondutor } from "@/lib/axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { CondutorContainer, ContentPaper } from "./styles";
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { AxiosResponse } from "axios";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs,{ Dayjs } from "dayjs";
export default function CondutorPage(props: CondutorData) {
  const { id, } = props;
  const vencimentoDate = dayjs(props.vencimentoHabilitacao) 
  const [nome, setNome] = useState<string>(props.nome);
  const [numeroHabilitacao, setNumeroHabilitacao] = useState<string>(props.numeroHabilitacao);
  const [categoriaHabilitacao, setCategoriaHabilitacao] = useState<string>(props.catergoriaHabilitacao);
  const [vencimentoHabilitacao, setVencimentoHabilitacao] = useState<Dayjs | null>(vencimentoDate);
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  console.log("dados condutor:", props);


  

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("")
    setLoading(true);
    const EditCondutorData: EditCondutorData = {
      id,
      categoriaHabilitacao,
      vencimentoHabilitacao: dayjs(vencimentoHabilitacao).toISOString(),
    };
    await updateCondutor(id, EditCondutorData)
      .then((response: AxiosResponse) => {
        console.log("editCondutor response data:", response.data);
        router.push(`/condutor/${response.data}`);
      })
      .catch((error) => {
        console.log("editCondutor error:", error);
        setError(error.response.data)
        setLoading(false);
      });
  }

  return (
    <CondutorContainer maxWidth={"xl"}>
      <Stack maxWidth={470}>
        <Typography variant="h5" fontWeight={700} color={"primary.main"}>
          Editar de Condutor
        </Typography>
        <Typography variant="body2" fontWeight={500} color={"text.primary"}>
          Seja bem-vindo a edição de Condutor, {props.nome}! Aqui você pode atualizar as informações de sua habilitação.
        </Typography>
      </Stack>
      <ContentPaper>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
          <Grid item xs={12}>
              <Typography variant="body2" fontWeight={700} color={"error"} >
                {error!=""?`Error: ${error}`:""}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="nome do Condutor"
                value={nome}
                variant="outlined"
                size="small"
                disabled
                onChange={(e) => setNome(e.target.value)}
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Número da Habilitação"
                variant="outlined"
                value={numeroHabilitacao}
                size="small"
                type="number"
                fullWidth
                disabled
                onChange={(e) => setNumeroHabilitacao(e.target.value)}
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Categoria"
                value={categoriaHabilitacao}
                variant="outlined"
                size="small"
                onChange={(e) => setCategoriaHabilitacao(e.target.value)}
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                label="Vencimento"
                size="small"
                value={vencimentoHabilitacao}
                format="DD-MM-YYYY"
          onChange={(newValue) => setVencimentoHabilitacao(newValue)}
                sx={{ input: { color: "text.secondary" } }} />
              </LocalizationProvider>
            </Grid>
            
            
            <Grid item xs={6} color={"text.secondary"}>
              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                startIcon={!loading && <ArrowBack />}
                onClick={() => router.back()}
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
        *Para modificar dados como o Nome ou o Número da Habilitação,
        busca atendimento personalizado na central.
      </Typography>
    </CondutorContainer>
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
  const CondutorId = String(params?.id);

  const Condutor = await getCondutorById(Number(CondutorId));
  const data = await Condutor.data;
  return {
    props: data,
    revalidate: 60 * 10, // 10 minutes
  };
};
