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
import { VeiculoData } from "@/@types/VeiculoType";
import { ModalBox } from "./styles";
interface ModalVeiculoProps {
  veiculoList: VeiculoData[];
  openModalVeiculo: boolean;
  handleSelectItem(modalNumber: number, item: VeiculoData): void;
  handleCloseModal(modalNumber: Number): void;
}
export const ModalVeiculo: FunctionComponent<ModalVeiculoProps> = ({
  veiculoList,
  openModalVeiculo,
  handleCloseModal,
  handleSelectItem,
}) => {
  const [filterList, setFilterList] = useState<VeiculoData[]>(veiculoList);
  const [filterText, setFilterText] = useState<string>("");

  function handleFilter(input: string) {
    let filterList = veiculoList.filter((veiculo) => {
      if (
        input == "" ||
        veiculo.placa.toString().toLowerCase().includes(input.toLowerCase()) ||
        veiculo.marcaModelo
          .toString()
          .toLowerCase()
          .includes(input.toLowerCase())
      ) {
        return veiculo;
      }
    });
    setFilterList(filterList);
  }
  function handleSelectVeiculo(item: VeiculoData) {
    handleSelectItem(3, item);
    handleCloseModal(3);
  }

  return (
    <Modal open={openModalVeiculo} onClose={() => handleCloseModal(3)}>
      <ModalBox>
        <ContentPaper>
          <TextField
            label="Buscar por placa ou por modelo do veículo"
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
                  <TableCell>Placa</TableCell>
                  <TableCell>Marca e Modelo</TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "revert" } }}>
                    Km atual
                  </TableCell>
                  <TableCell align="center">Funções</TableCell>
                </TableRow>
              </TableHead>
              <StyledTableBody>
                {filterText
                  ? filterList.map((veiculo, index) => (
                      <TableRow key={veiculo.id}>
                        <TableCell>{veiculo.placa}</TableCell>
                        <TableCell>{veiculo.marcaModelo}</TableCell>
                        <TableCell
                          sx={{ display: { xs: "none", md: "revert" } }}
                        >
                          {veiculo.kmAtual}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label="Selecionar"
                            variant="outlined"
                            onClick={() => handleSelectVeiculo(veiculo)}
                            sx={{ color: "text.secondary" }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  : veiculoList.map((veiculo, index) => (
                      <TableRow key={veiculo.id}>
                        <TableCell>{veiculo.placa}</TableCell>
                        <TableCell>{veiculo.marcaModelo}</TableCell>
                        <TableCell
                          sx={{ display: { xs: "none", md: "revert" } }}
                        >
                          {veiculo.kmAtual}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label="Selecionar"
                            variant="outlined"
                            onClick={() => handleSelectVeiculo(veiculo)}
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
