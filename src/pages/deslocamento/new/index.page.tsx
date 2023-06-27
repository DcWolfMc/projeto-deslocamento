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
  NewDeslocamentoData,
} from "@/@types/DeslocamentoType";
import { FormEvent, useEffect, useState } from "react";
import {
  getCliente,
  getCondutor,
  getVeiculo,
  startDeslocamento,
} from "@/lib/axios";
import { AxiosResponse } from "axios";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { ModalCliente } from "../components/ModalCliente/Index";
import { ModalCondutor } from "../components/ModalCondutor";
import { ModalVeiculo } from "../components/ModalVeiculo";
import { ClienteData } from "@/@types/ClienteType";
import { CondutorData } from "@/@types/CondutorType";
import { VeiculoData } from "@/@types/VeiculoType";
export default function NewDeslocamento() {
  const [clienteList, setClienteList] = useState<ClienteData[]>([]);
  const [condutorList, setCondutorList] = useState<CondutorData[]>([]);
  const [veiculoList, setVeiculoList] = useState<VeiculoData[]>([]);

  const [cliente, setCliente] = useState<ClienteData | undefined>();
  const [condutor, setCondutor] = useState<CondutorData | undefined>();
  const [veiculo, setVeiculo] = useState<VeiculoData | undefined>();
  const [kmInicial, setKmInicial] = useState<string>("");
  const [checkList, setCheckList] = useState<string>("");
  const [motivo, setMotivo] = useState<string>("");
  const [observacao, setObservacao] = useState<string>("");
  const [inicioDeslocamento, setInicioDeslocamento] = useState<Dayjs | null>(
    dayjs()
  );
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [openModalCliente, setOpenModalCliente] = useState<boolean>(false);
  const [openModalCondutor, setOpenModalCondutor] = useState<boolean>(false);
  const [openModalVeiculo, setOpenModalVeiculo] = useState<boolean>(false);

  useEffect(() => {
    async function callApi() {
      await Promise.all([getCliente(), getCondutor(), getVeiculo()])
        .then(
          (
            response: [
              AxiosResponse<ClienteData[]>,
              AxiosResponse<CondutorData[]>,
              AxiosResponse<VeiculoData[]>
            ]
          ) => {
            console.log("clienteList:", response[0].data);
            setClienteList(response[0].data);
            setCondutorList(response[1].data);
            setVeiculoList(response[2].data);
          }
        )
        .catch((error) => {
          console.log("error:", error);
        })
        .finally(() => setLoading(false));
    }
    if (loading) {
      callApi();
    }
  }, [loading]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    let newDeslocamentoData: NewDeslocamentoData;
    if (cliente && condutor && veiculo) {
      newDeslocamentoData = {
        idCliente: cliente && Number(cliente.id),
        idCondutor: condutor && Number(condutor.id),
        idVeiculo: veiculo && Number(veiculo.id),
        inicioDeslocamento: dayjs(inicioDeslocamento).toISOString(),
        kmInicial: Number(kmInicial),
        checkList: checkList ? checkList : "",
        motivo: motivo ? motivo : "",
        observacao: observacao ? observacao : "",
      };
    }else return(setError("É necessário Escolher o Cliente, o Condutor e o Veículo do deslocamento"))

    await startDeslocamento(newDeslocamentoData)
      .then((response: AxiosResponse) => {
        console.log("startDeslocamento response data:", response.data);
        router.push(`/deslocamento/${response.data}`);
        setLoading(false);
      })
      .catch((error) => {
        console.log(
          "startDeslocamento error:",
          error.message,
          error.data.response
        );
        setError(error.data.response);
        setLoading(false);
      });
  }

  function handleOpenModal(modalNumber: number) {
    switch (modalNumber) {
      case 1:
        return setOpenModalCliente(true);
      case 2:
        return setOpenModalCondutor(true);
      case 3:
        return setOpenModalVeiculo(true);
      default:
        setOpenModalCliente(false);
        setOpenModalCondutor(false);
        setOpenModalVeiculo(false);
    }
  }
  function handleCloseModal(modalNumber: number) {
    switch (modalNumber) {
      case 1:
        return setOpenModalCliente(false);
      case 2:
        return setOpenModalCondutor(false);
      case 3:
        return setOpenModalVeiculo(false);
      default:
        setOpenModalCliente(false);
        setOpenModalCondutor(false);
        setOpenModalVeiculo(false);
    }
  }
  function handleSelectItem(
    modalNumber: number,
    item: ClienteData & CondutorData & VeiculoData
  ) {
    console.log("Selected Item:", modalNumber, " ", item);

    switch (modalNumber) {
      case 1:
        return setCliente(item);
      case 2:
        return setCondutor(item);
      case 3:
        return setVeiculo(item);
      default:
        setOpenModalCliente(false);
        setOpenModalCondutor(false);
        setOpenModalVeiculo(false);
    }
  }

  return (
    <DeslocamentoContainer maxWidth={"xl"}>
      <Stack maxWidth={470}>
        <Typography variant="h5" fontWeight={700} color={"primary.main"}>
          Iniciar Deslocamento
        </Typography>
        <Typography variant="body2" fontWeight={500} color={"text.primary"}>
          Preencha as seguntes informações para iniciar o deslocamento.
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
              <Stack direction={"column"} gap={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleOpenModal(1)}
                  disabled={loading}
                  sx={{color:"text.secondary"}}
                >
                  {loading ? <CircularProgress /> : "Selecionar Cliente"}
                </Button>
                {cliente && (
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
                      Nome: {cliente?.nome}
                    </Typography>
                    <Typography
                      variant="overline"
                      component={"span"}
                      color={"text.secondary"}
                    >
                      Número do documento: {cliente?.numeroDocumento}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction={"column"} gap={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleOpenModal(2)}
                  disabled={loading}
                  sx={{color:"text.secondary"}}
                >
                  {loading ? <CircularProgress /> : "Selecionar Condutor"}
                </Button>
                {condutor && (
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
                      Nome: {condutor?.nome}
                    </Typography>
                    <Typography
                      variant="overline"
                      component={"span"}
                      color={"text.secondary"}
                    >
                      Número da Habilitação: {condutor?.numeroHabilitacao}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction={"column"} gap={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleOpenModal(3)}
                  disabled={loading}
                  sx={{color:"text.secondary"}}
                >
                  {loading ? <CircularProgress /> : "Selecionar Veículo"}
                </Button>
                {veiculo && (
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
                      Placa: {veiculo?.placa}
                    </Typography>
                    <Typography
                      variant="overline"
                      component={"span"}
                      color={"text.secondary"}
                    >
                      Marca e Modelo: {veiculo?.marcaModelo}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Km Inicial"
                variant="outlined"
                value={kmInicial}
                size="small"
                type="number"
                fullWidth
                required
                onChange={(e) => setKmInicial(e.target.value)}
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CheckList"
                value={checkList}
                variant="outlined"
                size="small"
                onChange={(e) => setCheckList(e.target.value)}
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Motivo"
                value={motivo}
                variant="outlined"
                size="small"
                fullWidth
                onChange={(e) => setMotivo(e.target.value)}
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
                  value={inicioDeslocamento}
                  format="DD-MM-YYYY HH:mm:ss"
                  fullWidth
                  onChange={(newValue) => setInicioDeslocamento(newValue)}
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
                {loading ? <CircularProgress color="inherit" /> : "Iniciar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </ContentPaper>
      <ModalCliente
        clienteList={clienteList}
        handleCloseModal={handleCloseModal}
        handleSelectItem={handleSelectItem}
        openModalCliente={openModalCliente}
      />
      <ModalCondutor
        condutorList={condutorList}
        handleCloseModal={handleCloseModal}
        handleSelectItem={handleSelectItem}
        openModalCondutor={openModalCondutor}
      />
      <ModalVeiculo
        veiculoList={veiculoList}
        handleCloseModal={handleCloseModal}
        handleSelectItem={handleSelectItem}
        openModalVeiculo={openModalVeiculo}
      />
    </DeslocamentoContainer>
  );
}
