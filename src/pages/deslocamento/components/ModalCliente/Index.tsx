import { Search } from "@mui/icons-material";
import {
  TextField,
  InputAdornment,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Chip,
  Modal,
} from "@mui/material";
import {
  ContentPaper,
  StyledTableBody,
  StyledTableContainer,
} from "../../styles";
import { FunctionComponent, useState } from "react";
import { ClienteData } from "@/@types/ClienteType";
import { ModalBox } from "./styles";
interface ModalClienteProps {
  clienteList: ClienteData[];
  openModalCliente: boolean;
  handleSelectItem(modalNumber: number, item: ClienteData): void;
  handleCloseModal(modalNumber: Number): void;
}
export const ModalCliente: FunctionComponent<ModalClienteProps> = ({
  clienteList,
  openModalCliente,
  handleCloseModal,
  handleSelectItem,
}) => {
  const [filterList, setFilterList] = useState<ClienteData[]>(clienteList);
  const [filterText, setFilterText] = useState<string>("");

  function handleFilter(input: string) {
    let filterList = clienteList.filter((cliente) => {
      if (
        input == "" ||
        cliente.nome.toString().toLowerCase().includes(input.toLowerCase()) ||
        cliente.numeroDocumento
          .toString()
          .toLowerCase()
          .includes(input.toLowerCase())
      ) {
        return cliente;
      }
    });
    setFilterList(filterList);
  }
  function handleSelectCliente(item: ClienteData) {
    handleSelectItem(1, item);
    handleCloseModal(1);
  }

  return (
    <Modal open={openModalCliente} onClose={() => handleCloseModal(1)}>
      <ModalBox>
        <ContentPaper>
          <TextField
            label="Buscar por nome ou por número de documento"
            variant="outlined"
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color={"action"} />
                </InputAdornment>
              ),
            }}
            sx={{ input: { color: "text.secondary" } }}
            onChange={(event) => {
              setFilterText(event.target.value);
              handleFilter(event.target.value);
            }}
          />

          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "revert" } }}>
                    Número do documento
                  </TableCell>
                  <TableCell>Logradouro</TableCell>
                  <TableCell align="center">Funções</TableCell>
                </TableRow>
              </TableHead>
              <StyledTableBody>
                {filterText
                  ? filterList.map((cliente, index) => (
                      <TableRow key={cliente.id}>
                        <TableCell>{cliente.nome}</TableCell>
                        <TableCell
                          sx={{ display: { xs: "none", md: "revert" } }}
                        >
                          {cliente.numeroDocumento}
                        </TableCell>
                        <TableCell>{cliente.logradouro}</TableCell>
                        <TableCell>
                          <Chip
                            label="Selecionar"
                            variant="outlined"
                            onClick={() => handleSelectCliente(cliente)}
                            sx={{ color: "text.secondary" }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  : clienteList.map((cliente, index) => (
                      <TableRow key={cliente.id}>
                        <TableCell>{cliente.nome}</TableCell>
                        <TableCell
                          sx={{ display: { xs: "none", md: "revert" } }}
                        >
                          {cliente.numeroDocumento}
                        </TableCell>
                        <TableCell>{cliente.logradouro}</TableCell>
                        <TableCell>
                          <Chip
                            label="Selecionar"
                            variant="outlined"
                            onClick={() => handleSelectCliente(cliente)}
                            sx={{ color: "text.secondary" }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
              </StyledTableBody>
            </Table>
          </StyledTableContainer>
        </ContentPaper>
      </ModalBox>
    </Modal>
  );
};
