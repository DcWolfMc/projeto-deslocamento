import { ClienteData } from "@/@types/ClienteType";
import { useRouter } from "next/router";
import {
  
  Button,
  Chip,
  Divider,
  Modal,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import { ModalBox } from "./styles";

interface ClienteTableItemProps {
  cliente: ClienteData;
  CallDeleteCliente(id: number): Promise<void>;
}
export const ClienteTableItem: FunctionComponent<ClienteTableItemProps> = ({
  cliente,
  CallDeleteCliente,
}) => {
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  function handleOpenModal() {
    setOpenDeleteModal(true);
  }
  function handleCloseModal() {
    setOpenDeleteModal(false);
  }
  function handleDeleteCliente(){
    CallDeleteCliente(cliente.id)
    handleCloseModal()

  }
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
            onClick={()=> router.push(`/cliente?id=${cliente.id}`)}
            sx={{ color: "text.secondary" }}
          />
          <Chip
            label="Editar"
            variant="outlined"
            sx={{ color: "text.secondary" }}
            onClick={()=> router.push(`/cliente/editar/?id=${cliente.id}`)}
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
                  Deletar Cliente?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Deseja proseguir em deleter o Cliente {cliente.nome} ?
                </Typography>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Button variant="contained" color="error" onClick={handleDeleteCliente}>
                    Deletar
                  </Button>
                  <Button variant="outlined" sx={{ color: "text.secondary", borderColor:"text.secondary" }} onClick={handleCloseModal}>
                    Cancelar
                  </Button>
                </Stack>
                </Stack>
              </ModalBox>
            </Modal>
          
        </Stack>
      </TableCell>
    </TableRow>
  );
};
