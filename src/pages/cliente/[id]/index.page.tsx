import { ClienteData } from "@/@types/ClienteType";
import { deleteCliente, getClienteById } from "@/lib/axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
  ClienteContainer,
  ContentPaper,
  ClienteItemHeader,
  ClienteItemContent,
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
import { ArrowBackRounded, } from "@mui/icons-material";

interface clienteItensProps {
  tag: string;
  value: string;
}
export default function ClientePage(props: ClienteData) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [snackbar, setSnackbar] = useState<boolean>(false);
  const [snackbarType, setSnackbarType] = useState<"error" | "info">("error");
  const [snackbarMassage, setSnackbarMassage] = useState<string>("");

  const clienteItens: clienteItensProps[] = [
    { tag: "nome", value: props.nome },
    { tag: "id", value: props.id.toString() },
    { tag: "Tipo documento", value: props.tipoDocumento },
    { tag: "Número Documento", value: props.numeroDocumento },
    { tag: "Logradouro", value: props.logradouro ? props.logradouro : "" },
    { tag: "Número", value: props.numero ? props.numero : "" },
    { tag: "Cidade", value: props.cidade ? props.cidade : "" },
    { tag: "Bairro", value: props.bairro ? props.bairro : "" },
    { tag: "UF", value: props.uf ? props.uf : "" },
  ];

  const router = useRouter();
  function handleOpenModal() {
    setOpenDeleteModal(true);
  }
  function handleCloseModal() {
    setOpenDeleteModal(false);
  }

  async function CallDeleteCliente(id: number) {
    await deleteCliente(id)
      .then((response) => {
        setSnackbarType("info");
        setSnackbar(true);
        setSnackbarMassage("Cliente deletado com sucesso!");
        console.log("DeleteResponse:", response);
        router.back();
      })
      .catch((error: AxiosError) => {
        setSnackbarType("error");
        setSnackbar(true);
        setSnackbarMassage("Algo deu errado ao deletar cliente!");
        console.log("DeleteError:", error.message);
      });
  }

  function handleDeleteCliente() {
    CallDeleteCliente(props.id);
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
    <ClienteContainer>
      <ContentPaper>
        <Box display={"flex"} alignItems={"center"} gap={2}>
        <IconButton  sx={{color:"text.secondary", border:"2px solid"}} onClick={()=> router.back()}>
        <ArrowBackRounded/>
        </IconButton>
        <Typography variant="h5" color={"text.secondary"} fontWeight={700}>
          Informações do Cliente
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
                onClick={() => router.push(`/cliente/editar/${props.id}`)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleOpenModal}
              >
                Deletar Cliente
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
                      Deletar Cliente?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Deseja proseguir em deleter o Cliente {props.nome} ?
                    </Typography>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteCliente}
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
          {clienteItens.map((item, index) => (
            <Grid key={`${item.tag}-${item.value}`} item xs={6}>
              <ClienteItemHeader>{item.tag}</ClienteItemHeader>
              <ClienteItemContent>{item.value}</ClienteItemContent>
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
