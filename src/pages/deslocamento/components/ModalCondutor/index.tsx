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
import { CondutorData } from "@/@types/CondutorType";
import { ModalBox } from "./styles";
interface ModalCondutorProps {
  condutorList: CondutorData[];
  openModalCondutor: boolean;
  handleSelectItem(modalNumber: number, item: CondutorData): void;
  handleCloseModal(modalNumber: Number): void;
}
export const ModalCondutor: FunctionComponent<ModalCondutorProps> = ({
  condutorList,
  openModalCondutor,
  handleCloseModal,
  handleSelectItem,
}) => {
  const [filterList, setFilterList] = useState<CondutorData[]>(condutorList);
  const [filterText, setFilterText] = useState<string>("");

  function handleFilter(input: string) {
    let filterList = condutorList.filter((condutor) => {
      if (
        input == "" ||
        condutor.nome.toString().toLowerCase().includes(input.toLowerCase()) ||
        condutor.numeroHabilitacao
          .toString()
          .toLowerCase()
          .includes(input.toLowerCase())
      ) {
        return condutor;
      }
    });
    setFilterList(filterList);
  }
  function handleSelectCondutor(item: CondutorData) {
    handleSelectItem(2, item);
    handleCloseModal(2);
  }

  return (
    <Modal open={openModalCondutor} onClose={() => handleCloseModal(2)}>
      <ModalBox>
        <ContentPaper>
          <TextField
            label="Buscar por nome ou número da habilitação"
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
                  <TableCell>Número da Habilitação</TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "revert" } }}>
                    Categoria
                  </TableCell>
                  <TableCell align="center">Funções</TableCell>
                </TableRow>
              </TableHead>
              <StyledTableBody>
                {filterText
                  ? filterList.map((condutor, index) => (
                      <TableRow key={condutor.id}>
                        <TableCell>{condutor.nome}</TableCell>
                        <TableCell>{condutor.numeroHabilitacao}</TableCell>
                        <TableCell
                          sx={{ display: { xs: "none", md: "revert" } }}
                        >
                          {condutor.catergoriaHabilitacao}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label="Selecionar"
                            variant="outlined"
                            onClick={() => handleSelectCondutor(condutor)}
                            sx={{ color: "text.secondary" }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  : condutorList.map((condutor, index) => (
                      <TableRow key={condutor.id}>
                        <TableCell>{condutor.nome}</TableCell>
                        <TableCell>{condutor.numeroHabilitacao}</TableCell>
                        <TableCell
                          sx={{ display: { xs: "none", md: "revert" } }}
                        >
                          {condutor.catergoriaHabilitacao}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label="Selecionar"
                            variant="outlined"
                            onClick={() => handleSelectCondutor(condutor)}
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
