import { ClienteData } from "@/@types/ClienteType";
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
import { deleteCliente } from "@/lib/axios";
import { AxiosError } from "axios";

interface ClienteTableItemProps {
  cliente: ClienteData;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export const ClienteTableItem: FunctionComponent<ClienteTableItemProps> = ({
  cliente,
  setLoading,
}) => {
  const router = useRouter();
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
  function handleDeleteCliente() {
    CallDeleteCliente(cliente.id);
    handleCloseModal();
  }

  async function CallDeleteCliente(id: number) {
    await deleteCliente(id)
      .then((response) => {
        setSnackbarType("info");
        setSnackbar(true);
        setSnackbarMassage("Cliente deletado com sucesso!");
        console.log("DeleteResponse:", response);

        setLoading((prev) => !prev);
      })
      .catch((error: AxiosError) => {
        setSnackbarType("error");
        setSnackbar(true);
        setSnackbarMassage("Algo deu errado ao deletar cliente!");
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
      <TableCell>{cliente.nome}</TableCell>
      <TableCell sx={{ display: { xs: "none", md: "revert" } }}>
        {cliente.numeroDocumento}
      </TableCell>
      <TableCell>{cliente.logradouro}</TableCell>
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
            onClick={() => router.push(`/cliente/${cliente.id}`)}
            sx={{ color: "text.secondary" }}
          />
          <Chip
            label="Editar"
            variant="outlined"
            sx={{ color: "text.secondary" }}
            onClick={() => router.push(`/cliente/editar/${cliente.id}`)}
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
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalBox>
              <Stack direction={"column"} gap={2}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Deletar Cliente?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Deseja proseguir em deleter o Cliente {cliente.nome} ?
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
