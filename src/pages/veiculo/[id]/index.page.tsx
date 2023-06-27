import { VeiculoData } from "@/@types/VeiculoType";
import { deleteVeiculo, getVeiculoById } from "@/lib/axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
  VeiculoContainer,
  ContentPaper,
  VeiculoItemHeader,
  VeiculoItemContent,
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
import { AxiosError } from "axios";
import { ModalBox } from "../components/styles";
import { ArrowBackRounded, Delete, } from "@mui/icons-material";

interface VeiculoItensProps {
  tag: string;
  value: string;
}
export default function VeiculoPage(props: VeiculoData) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [snackbar, setSnackbar] = useState<boolean>(false);
  const [snackbarType, setSnackbarType] = useState<"error" | "info">("error");
  const [snackbarMassage, setSnackbarMassage] = useState<string>("");

  const VeiculoItens: VeiculoItensProps[] = [
    { tag: "Placa", value: props.placa },
    { tag: "Id", value: props.id.toString() },
    { tag: "Marca e Modelo", value: props.marcaModelo },
    { tag: "Ano de Fabricação", value: props.anoFabricacao.toString() },
    { tag: "Km Atual", value: props.kmAtual.toString()},
  ];

  const router = useRouter();
  function handleOpenModal() {
    setOpenDeleteModal(true);
  }
  function handleCloseModal() {
    setOpenDeleteModal(false);
  }

  async function CallDeleteVeiculo(id: number) {
    await deleteVeiculo(id)
      .then((response) => {
        setSnackbarType("info");
        setSnackbar(true);
        setSnackbarMassage("Veiculo deletado com sucesso!");
        console.log("DeleteResponse:", response);
        router.back();
      })
      .catch((error: AxiosError) => {
        setSnackbarType("error");
        setSnackbar(true);
        setSnackbarMassage("Algo deu errado ao deletar Veiculo!");
        console.log("DeleteError:", error.message);
      });
  }

  function handleDeleteVeiculo() {
    CallDeleteVeiculo(props.id);
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
    <VeiculoContainer>
      <ContentPaper>
        <Box display={"flex"} alignItems={"center"} gap={2}>
        <IconButton  sx={{color:"text.secondary", border:"2px solid"}} onClick={()=> router.back()}>
        <ArrowBackRounded/>
        </IconButton>
        <Typography variant="h5" color={"text.secondary"} fontWeight={700}>
          Informações do Veículo
        </Typography>
        
        </Box>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 0 }}>
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
                onClick={() => router.push(`/veiculo/editar/${props.id}`)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleOpenModal}
                startIcon={<Delete/>}
              >
                Deletar Veículo
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
                      Deletar Veiculo?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Deseja proseguir em deleter o veículo de placa {props.placa} ?
                    </Typography>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteVeiculo}
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
          {VeiculoItens.map((item, index) => (
            <Grid key={`${item.tag}-${item.value}`} item xs={6}>
              <VeiculoItemHeader>{item.tag}</VeiculoItemHeader>
              <VeiculoItemContent>{item.value}</VeiculoItemContent>
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
    </VeiculoContainer>
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
  const VeiculoId = String(params?.id);

  const Veiculo = await getVeiculoById(Number(VeiculoId));
  const data = await Veiculo.data;
  return {
    props: data,
    revalidate: 60 * 10, // 10 minutes
  };
};
