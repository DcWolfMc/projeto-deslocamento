import { DeslocamentoData } from "@/@types/DeslocamentoType";
import { deleteDeslocamento, getClienteById, getCondutorById, getDeslocamentoById, getVeiculoById } from "@/lib/axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
  DeslocamentoContainer,
  ContentPaper,
  DeslocamentoItemHeader,
  DeslocamentoItemContent,
} from "./styles";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { ModalBox } from "../components/DeslocamentoTableItem/styles";
import { ArrowBackRounded, } from "@mui/icons-material";
import dayjs from "dayjs";
import { ClienteData } from "@/@types/ClienteType";
import { CondutorData } from "@/@types/CondutorType";
import { VeiculoData } from "@/@types/VeiculoType";

interface DeslocamentoItensProps {
  tag: string;
  value: string;
}
interface DeslocamentoPageProps {
  deslocamentoData: DeslocamentoData;
  clienteData: ClienteData;
  condutorData: CondutorData;
  veiculoData: VeiculoData;
}
export default function DeslocamentoPage(props: DeslocamentoPageProps) {
  const {clienteData,condutorData,deslocamentoData,veiculoData} = props
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [snackbar, setSnackbar] = useState<boolean>(false);
  const [snackbarType, setSnackbarType] = useState<"error" | "info">("error");
  const [snackbarMassage, setSnackbarMassage] = useState<string>("");
  const router = useRouter();
  
  const deslocamentoItens: DeslocamentoItensProps[] = [
    { tag: "Id Deslocamento", value: deslocamentoData.id.toString() },
    { tag: "Motivo", value: deslocamentoData.motivo?deslocamentoData.motivo:"" },
    { tag: "Checklist", value: deslocamentoData.checkList?deslocamentoData.checkList:"" },
    { tag: "Km Inicial", value: deslocamentoData.kmInicial.toString() },
    { tag: "Km Final", value: deslocamentoData.kmFinal?deslocamentoData.kmFinal.toString():"Não finalizado" },
    { tag: "Inicio do deslocamento", value: dayjs(deslocamentoData.inicioDeslocamento,).format('DD-MM-YYYY')},
    { tag: "Final do deslocamento", value: deslocamentoData.fimDeslocamento?dayjs(deslocamentoData.fimDeslocamento,).format('DD-MM-YYYY'):"Não finalizado"},
  ];
  const clienteItens: DeslocamentoItensProps[] = [
    { tag: "Id Cliente", value: clienteData.id.toString() },
    { tag: "Nome do Cliente", value: clienteData.nome },
    { tag: "Nome do Cliente", value: clienteData.tipoDocumento },
    { tag: "Documento do Cliente", value: clienteData.numeroDocumento },
  ];
  const condutorItens: DeslocamentoItensProps[] = [
    { tag: "Id Condutor", value: condutorData.id.toString() },
    { tag: "Nome do Condutor", value: condutorData.nome },
    { tag: "Nome do Condutor", value: condutorData.numeroHabilitacao },
    { tag: "Documento do Condutor", value: condutorData.catergoriaHabilitacao },
  ];
  const veiculoItens: DeslocamentoItensProps[] = [
    { tag: "Id Veículo", value: veiculoData.id.toString() },
    { tag: "Nome do Veículo", value: veiculoData.placa },
    { tag: "Nome do Veículo", value: veiculoData.marcaModelo },
    { tag: "Documento do Veículo", value: veiculoData.kmAtual.toString() },
  ];

  
  function handleOpenModal() {
    setOpenDeleteModal(true);
  }
  function handleCloseModal() {
    setOpenDeleteModal(false);
  }

  async function CallDeleteDeslocamento(id: number) {
    await deleteDeslocamento(id)
      .then((response) => {
        setSnackbarType("info");
        setSnackbar(true);
        setSnackbarMassage("Deslocamento deletado com sucesso!");
        console.log("DeleteResponse:", response);
        router.back();
      })
      .catch((error: AxiosError) => {
        setSnackbarType("error");
        setSnackbar(true);
        setSnackbarMassage("Algo deu errado ao deletar Deslocamento!");
        console.log("DeleteError:", error.message);
      });
  }

  function handleDeleteDeslocamento() {
    CallDeleteDeslocamento(deslocamentoData.id);
    handleCloseModal();
  }

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };

  return (
    <DeslocamentoContainer>
      <ContentPaper>
        <Box display={"flex"} alignItems={"center"} gap={2}>
        <IconButton  sx={{color:"text.secondary", border:"2px solid"}} onClick={()=> router.back()}>
        <ArrowBackRounded/>
        </IconButton>
        <Typography variant="h5" color={"text.secondary"} fontWeight={700}>
          Informações do Deslocamento
        </Typography>
        
        </Box>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }}>
          <Grid
            item
            xs={12}
          >
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              gap={2}
              color={"text.secondary"}
            >
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => router.push(`/deslocamento/editar/${deslocamentoData.id}`)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleOpenModal}
              >
                Deletar Deslocamento
              </Button>
              <Modal
                open={openDeleteModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <ModalBox>
                  <Stack direction={"column"} gap={2}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Deletar Deslocamento?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Deseja proseguir em deleter desse deslocamento ?
                    </Typography>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteDeslocamento}
                      >
                        Deletar
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          color: "text.secondary",
                          borderColor: "text.secondary",
                        }}
                        onClick={handleCloseModal}
                      >
                        Cancelar
                      </Button>
                    </Stack>
                  </Stack>
                </ModalBox>
              </Modal>
            </Box>
          </Grid>
          {deslocamentoItens.map((item, index) => (
            <Grid key={`${item.tag}-${item.value}`} item xs={6}>
              <DeslocamentoItemHeader>{item.tag}</DeslocamentoItemHeader>
              <DeslocamentoItemContent>{item.value}</DeslocamentoItemContent>
            </Grid>
          ))}
          <Grid item xs={12}>
          <Typography
            variant="h6"
            textAlign={"center"}
            color={"text.secondary"}
            component="h6">
            Dados cliente
          </Typography>
          </Grid>
          {clienteItens.map((item, index) => (
            <Grid key={`${item.tag}-${item.value}`} item xs={6}>
              <DeslocamentoItemHeader>{item.tag}</DeslocamentoItemHeader>
              <DeslocamentoItemContent>{item.value}</DeslocamentoItemContent>
            </Grid>
          ))}
          <Grid item xs={12}>
          <Typography
            variant="h6"
            textAlign={"center"}
            color={"text.secondary"}
            component="h6">
            Dados condutor
          </Typography>
          </Grid>
          
          {condutorItens.map((item, index) => (
            <Grid key={`${item.tag}-${item.value}`} item xs={6}>
              <DeslocamentoItemHeader>{item.tag}</DeslocamentoItemHeader>
              <DeslocamentoItemContent>{item.value}</DeslocamentoItemContent>
            </Grid>
          ))}
          <Grid item xs={12}>
          <Typography
            variant="h6"
            textAlign={"center"}
            color={"text.secondary"}
            component="h6">
            Dados veículo
          </Typography>
          </Grid>
          {veiculoItens.map((item, index) => (
            <Grid key={`${item.tag}-${item.value}`} item xs={6}>
              <DeslocamentoItemHeader>{item.tag}</DeslocamentoItemHeader>
              <DeslocamentoItemContent>{item.value}</DeslocamentoItemContent>
            </Grid>
          ))}
        </Grid>
      </ContentPaper>
      <Snackbar
        open={snackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarType}
          sx={{ width: "100%" }}
        >
          {snackbarMassage}
        </Alert>
      </Snackbar>
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