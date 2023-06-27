import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Typography,
  Button,
  TextField,
  Grid,
  Stack,
  CircularProgress,
  Divider,
} from "@mui/material";
import router from "next/router";
import { DeslocamentoContainer, ContentPaper } from "./styles";
import {
  DeslocamentoData,
  EditDeslocamentoData,
  NewDeslocamentoData,
} from "@/@types/DeslocamentoType";
import { FormEvent, useEffect, useState } from "react";
import {
  getClienteById,
  getDeslocamentoById,
  getCondutorById,
  getVeiculoById,
  endDeslocamento,
} from "@/lib/axios";
import { AxiosResponse } from "axios";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { ClienteData } from "@/@types/ClienteType";
import { CondutorData } from "@/@types/CondutorType";
import { VeiculoData } from "@/@types/VeiculoType";
import { GetStaticPaths, GetStaticProps } from "next";
interface EditDeslocamentoProps {
  deslocamentoData: DeslocamentoData;
  clienteData: ClienteData;
  condutorData: CondutorData;
  veiculoData: VeiculoData;
}
export default function NewDeslocamento(props: EditDeslocamentoProps) {
  const { clienteData, condutorData, deslocamentoData, veiculoData } = props;
  const [kmFinal, setKmFinal] = useState<string>("");
  const [observacao, setObservacao] = useState<string>(deslocamentoData.observacao?deslocamentoData.observacao:"");
  const [fimDeslocamento, setFimDeslocamento] = useState<Dayjs | null>(dayjs());
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    let editDeslocamentoData: EditDeslocamentoData = {
      id: deslocamentoData.id,
      kmFinal: Number(kmFinal),
      fimDeslocamento: dayjs(fimDeslocamento).toISOString(),
      observacao: observacao,
    };

    await endDeslocamento(deslocamentoData.id, editDeslocamentoData)
      .then((response: AxiosResponse) => {
        console.log("editDeslocamento response data:", response.data);
        router.push(`/deslocamento/${response.data}`);
        setLoading(false);
      })
      .catch((error) => {
        console.log(
          "editDeslocamento error:",
          error.message,
          error.data.response
        );
        setError(error.data.response);
        setLoading(false);
      });
  }

  return (
    <DeslocamentoContainer maxWidth={"xl"}>
      <Stack maxWidth={470}>
        <Typography variant="h5" fontWeight={700} color={"primary.main"}>
          Iniciar Deslocamento
        </Typography>
        <Typography variant="body2" fontWeight={500} color={"text.primary"}>
          Preencha as seguntes informações para encerrar o deslocamento.
        </Typography>
      </Stack>
      <ContentPaper>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight={700} color={"error"}>
                {error != "" ? `Error: ${error}` : ""}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {clienteData && (
                <Stack
                  direction={{ sx: "column", md: "row" }}
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={{ xs: 0.25, md: 1 }}
                >
                  <Typography
                    variant="overline"
                    component={"span"}
                    color={"text.secondary"}
                  >
                    Nome: {clienteData.nome}
                  </Typography>
                  <Typography
                    variant="overline"
                    component={"span"}
                    color={"text.secondary"}
                  >
                    Número do documento: {clienteData.numeroDocumento}
                  </Typography>
                </Stack>
              )}
            </Grid>
            <Grid item xs={12}>
              {condutorData && (
                <Stack
                  direction={{ sx: "column", md: "row" }}
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={{ xs: 0.25, md: 1 }}
                >
                  <Typography
                    variant="overline"
                    component={"span"}
                    color={"text.secondary"}
                  >
                    Nome: {condutorData.nome}
                  </Typography>
                  <Typography
                    variant="overline"
                    component={"span"}
                    color={"text.secondary"}
                  >
                    Número da Habilitação: {condutorData.numeroHabilitacao}
                  </Typography>
                </Stack>
              )}
            </Grid>
            <Grid item xs={12}>
              {veiculoData && (
                <Stack
                  direction={{ sx: "column", md: "row" }}
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={{ xs: 0.25, md: 1 }}
                >
                  <Typography
                    variant="overline"
                    component={"span"}
                    color={"text.secondary"}
                  >
                    Placa: {veiculoData.placa}
                  </Typography>
                  <Typography
                    variant="overline"
                    component={"span"}
                    color={"text.secondary"}
                  >
                    Marca e Modelo: {veiculoData.marcaModelo}
                  </Typography>
                </Stack>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Km Final"
                variant="outlined"
                value={kmFinal}
                size="small"
                type="number"
                fullWidth
                required
                onChange={(e) => setKmFinal(e.target.value)}
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CheckList"
                value={deslocamentoData.checkList}
                variant="outlined"
                size="small"
                disabled
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Motivo"
                value={deslocamentoData.motivo}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Observação"
                value={observacao}
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={4}
                onChange={(e) => setObservacao(e.target.value)}
                sx={{ textarea: { color: "text.secondary" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  label="Início do deslocamento"
                  size="small"
                  value={fimDeslocamento}
                  format="DD-MM-YYYY HH:mm:ss"
                  fullWidth
                  onChange={(newValue) => setFimDeslocamento(newValue)}
                  sx={{ input: { color: "text.secondary" } }}
                />
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
                {loading ? <CircularProgress color="inherit" /> : "Finalizar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </ContentPaper>
    </DeslocamentoContainer>
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
  const deslocamentoId = String(params?.id);

  const deslocamento = await getDeslocamentoById(Number(deslocamentoId));
  const deslocamentoData: DeslocamentoData = await deslocamento.data;

  const [cliente, condutor, veiculo] = await Promise.all<
    [
      Promise<AxiosResponse<ClienteData>>,
      Promise<AxiosResponse<CondutorData>>,
      Promise<AxiosResponse<VeiculoData>>
    ]
  >([
    getClienteById(deslocamentoData.idCliente),
    getCondutorById(deslocamentoData.idCondutor),
    getVeiculoById(deslocamentoData.idVeiculo),
  ]);
  const clienteData = cliente.data;
  const condutorData = condutor.data;
  const veiculoData = veiculo.data;
  return {
    props: {
      deslocamentoData,
      clienteData,
      condutorData,
      veiculoData,
    },
    revalidate: 60 * 10, // 10 minutes
  };
};
