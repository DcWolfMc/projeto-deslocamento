import { DeslocamentoData } from "@/@types/DeslocamentoType";
import { useRouter } from "next/router";
import {
  Alert,
  Button,
  Chip,
  Divider,
  Modal,
  Snackbar,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { ModalBox } from "./styles";
import { deleteDeslocamento } from "@/lib/axios";
import { AxiosError } from "axios";
import dayjs from "dayjs";

interface DeslocamentoTableItemProps {
  deslocamento: DeslocamentoData;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export const DeslocamentoTableItem: FunctionComponent<
  DeslocamentoTableItemProps
> = ({ deslocamento, setLoading }) => {
  const router = useRouter();
  const dataInicial = dayjs(deslocamento.inicioDeslocamento).format("DD-MM-YYYY HH:mm:ss")
  const datafinal = dayjs(deslocamento.fimDeslocamento).format("DD-MM-YYYY HH:mm:ss")
  
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [snackbar, setSnackbar] = useState<boolean>(false);
  const [snackbarType, setSnackbarType] = useState<"error" | "info">("error");
  const [snackbarMassage, setSnackbarMassage] = useState<string>("");

  function handleOpenModal() {
    setOpenDeleteModal(true);
  }
  function handleCloseModal() {
    setOpenDeleteModal(false);
  }
  function handleDeleteDeslocamento() {
    CallDeleteDeslocamento(deslocamento.id);
    handleCloseModal();
  }

  async function CallDeleteDeslocamento(id: number) {
    await deleteDeslocamento(id)
      .then((response) => {
        setSnackbarType("info");
        setSnackbar(true);
        setSnackbarMassage("Deslocamento deletado com sucesso!");
        console.log("DeleteResponse:", response);

        setLoading((prev) => !prev);
      })
      .catch((error: AxiosError) => {
        setSnackbarType("error");
        setSnackbar(true);
        setSnackbarMassage("Algo deu errado ao deletar deslocamento!");
        console.log("DeleteError:", error.message);
      });
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
    <TableRow>
      <TableCell sx={{ display: { xs: "none", md: "revert" } }}>{deslocamento.motivo}</TableCell>
      <TableCell>{dataInicial}</TableCell>
      <TableCell>
        {deslocamento.fimDeslocamento
          ? datafinal
          : "Não finalizado"}
      </TableCell>
      <TableCell>
        <Stack
          direction={{ sx: "column", md: "row" }}
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent={"flex-end"}
          spacing={{ xs: 0.25, md: 1 }}
        >
          <Chip
            label="Exibir"
            variant="outlined"
            onClick={() => router.push(`/deslocamento/${deslocamento.id}`)}
            sx={{ color: "text.secondary" }}
          />
          <Chip
            label="Finalizar"
            variant="outlined"
            sx={{ color: "text.secondary" }}
            disabled={deslocamento.fimDeslocamento != undefined}
            onClick={() =>
              router.push(`/deslocamento/editar/${deslocamento.id}`)
            }
          />
          <Chip
            label="Apagar"
            variant="filled"
            color="secondary"
            onClick={handleOpenModal}
          />
          <Modal
            open={openDeleteModal}
            onClose={handleCloseModal}
          >
            <ModalBox>
              <Stack direction={"column"} gap={2}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Deletar deslocamento?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Deseja proseguir em deleter o deslocamento iniciado em{" "}
                  {deslocamento.inicioDeslocamento} no Quilometro{" "}
                  {deslocamento.kmInicial} ?
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
        </Stack>
      </TableCell>
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
    </TableRow>
  );
};
