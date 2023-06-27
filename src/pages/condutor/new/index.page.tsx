import {ArrowBack, ArrowForward} from "@mui/icons-material";
import {
  Typography,
  Button,
  TextField,
  Grid,
  Stack,
  CircularProgress,
} from "@mui/material";
import router from "next/router";
import { CondutorContainer, ContentPaper } from "./styles";
import { CondutorData, NewCondutorData } from "@/@types/CondutorType";
import { FormEvent, useState } from "react";
import { addCondutor } from "@/lib/axios";
import { AxiosError, AxiosResponse } from "axios";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs,{ Dayjs } from "dayjs";
export default function NewCondutor() {
  const [nome, setNome] = useState<string>("");
  const [numeroHabilitacao, setNumeroHabilitacao] = useState<string>("");
  const [categoriaHabilitacao, setCategoriaHabilitacao] = useState<string>("");
  const [vencimentoHabilitacao, setVencimentoHabilitacao] = useState<Dayjs | null>(dayjs());
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const newCondutorData: NewCondutorData = {
      nome,
      categoriaHabilitacao,
      numeroHabilitacao,
      vencimentoHabilitacao: dayjs(vencimentoHabilitacao).toISOString(),
    };
    await addCondutor(newCondutorData)
      .then((response: AxiosResponse) => {
        console.log("newCondutor response data:", response.data);
        router.push(`/condutor/${response.data}`);
        setLoading(false);
      })
      .catch((error) => {
        console.log("newCondutor error:", error.message, error.data.response);
        setError(error.data.response)
        setLoading(false);
      });
  }
  return (
    <CondutorContainer maxWidth={"xl"}>
      <Stack maxWidth={470}>
        <Typography variant="h5" fontWeight={700} color={"primary.main"}>
          Cadastre um novo Condutor
        </Typography>
        <Typography variant="body2"fontWeight={500} color={"text.primary"}>
          Precisamos de algumas informações para criar seu perfil de Condutor!
          Lembrando que você poderá editar essas informações depois.
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
                label="Nome do Condutor"
                value={nome}
                variant="outlined"
                size="small"
                required
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
                required
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
                {loading ? <CircularProgress color="inherit" /> : "Cadastrar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </ContentPaper>
    </CondutorContainer>
  );
}
