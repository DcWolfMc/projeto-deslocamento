import { CondutorData } from "@/@types/CondutorType";
import { deleteCondutor, getCondutorById } from "@/lib/axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
  CondutorContainer,
  ContentPaper,
  CondutorItemHeader,
  CondutorItemContent,
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
import dayjs from "dayjs";

interface CondutorItensProps {
  tag: string;
  value: string;
}
export default function CondutorPage(props: CondutorData) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [snackbar, setSnackbar] = useState<boolean>(false);
  const [snackbarType, setSnackbarType] = useState<"error" | "info">("error");
  const [snackbarMassage, setSnackbarMassage] = useState<string>("");

  const CondutorItens: CondutorItensProps[] = [
    { tag: "Nome", value: props.nome },
    { tag: "Id", value: props.id.toString() },
    { tag: "Númeroda Habilitacao", value: props.numeroHabilitacao },
    { tag: "Categoria da Habilitacao", value: props.catergoriaHabilitacao },
    { tag: "Vencimento Habilitacao", value: dayjs(props.vencimentoHabilitacao,).format('DD-MM-YYYY')},
  ];

  const router = useRouter();
  function handleOpenModal() {
    setOpenDeleteModal(true);
  }
  function handleCloseModal() {
    setOpenDeleteModal(false);
  }

  async function CallDeleteCondutor(id: number) {
    await deleteCondutor(id)
      .then((response) => {
        setSnackbarType("info");
        setSnackbar(true);
        setSnackbarMassage("Condutor deletado com sucesso!");
        console.log("DeleteResponse:", response);
        router.back();
      })
      .catch((error: AxiosError) => {
        setSnackbarType("error");
        setSnackbar(true);
        setSnackbarMassage("Algo deu errado ao deletar condutor!");
        console.log("DeleteError:", error.message);
      });
  }

  function handleDeleteCondutor() {
    CallDeleteCondutor(props.id);
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
    <CondutorContainer>
      <ContentPaper>
        <Box display={"flex"} alignItems={"center"} gap={2}>
        <IconButton  sx={{color:"text.secondary", border:"2px solid"}} onClick={()=> router.back()}>
        <ArrowBackRounded/>
        </IconButton>
        <Typography variant="h5" color={"text.secondary"} fontWeight={700}>
          Informações do Condutor
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
                onClick={() => router.push(`/condutor/editar/${props.id}`)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleOpenModal}
              >
                Deletar Condutor
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
                      Deletar Condutor?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Deseja proseguir em deleter o condutor {props.nome} ?
                    </Typography>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteCondutor}
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
          {CondutorItens.map((item, index) => (
            <Grid key={`${item.tag}-${item.value}`} item xs={6}>
              <CondutorItemHeader>{item.tag}</CondutorItemHeader>
              <CondutorItemContent>{item.value}</CondutorItemContent>
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
