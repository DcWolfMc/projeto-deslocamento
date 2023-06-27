import { VeiculoData } from "@/@types/VeiculoType";
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
import { deleteVeiculo } from "@/lib/axios";
import { AxiosError } from "axios";

interface VeiculoTableItemProps {
  veiculo: VeiculoData;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export const VeiculoTableItem: FunctionComponent<VeiculoTableItemProps> = ({
  veiculo,
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
  function handleDeleteVeiculo() {
    CallDeleteVeiculo(veiculo.id);
    handleCloseModal();
  }

  async function CallDeleteVeiculo(id: number) {
    await deleteVeiculo(id)
      .then((response) => {
        setSnackbarType("info");
        setSnackbar(true);
        setSnackbarMassage("Veiculo deletado com sucesso!");
        console.log("DeleteResponse:", response);

        setLoading((prev) => !prev);
      })
      .catch((error: AxiosError) => {
        setSnackbarType("error");
        setSnackbar(true);
        setSnackbarMassage("Algo deu errado ao deletar veiculo!");
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
      <TableCell>{veiculo.placa}</TableCell>
      <TableCell>{veiculo.marcaModelo}</TableCell>
      <TableCell sx={{ display: { xs: "none", md: "revert" } }}>
        {veiculo.kmAtual}
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
            onClick={() => router.push(`/veiculo/${veiculo.id}`)}
            sx={{ color: "text.secondary" }}
          />
          <Chip
            label="Editar"
            variant="outlined"
            sx={{ color: "text.secondary" }}
            onClick={() => router.push(`/veiculo/editar/${veiculo.id}`)}
          />
          <Chip
            label="Apagar"
            variant="filled"
            color="error"
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
                  Deletar Veiculo?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Deseja proseguir em deleter o veiculo de placa {veiculo.placa} ?
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
