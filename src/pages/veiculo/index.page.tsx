import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getVeiculo } from "@/lib/axios";
import {
  StyledTableContainer,
  StyledTableBody,
  ContentPaper,
  VeiculoContainer,
} from "./styles";
import { useEffect, useState } from "react";
import { VeiculoData } from "@/@types/VeiculoType";
import { AxiosResponse } from "axios";
import { Add, Search } from "@mui/icons-material";
import { VeiculoTableItem } from "./components/VeiculoTableItem";
import { useRouter } from "next/router";

export default function Veiculo() {
  const router = useRouter();
  const [veiculoList, setVeiculoList] = useState<VeiculoData[]>([]);
  const [filterList, setFilterList] = useState<VeiculoData[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function callApi() {
      await getVeiculo().then((response: AxiosResponse<VeiculoData[]>) => {
        console.log(response.data);

        setVeiculoList(response.data);
        setFilterList(response.data);
      });
    }
    if (loading) {
      callApi();
      setLoading(false);
    }
  }, [loading]);

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
        return Veiculo;
      }
    });
    setFilterList(filterList);
  }


  return (
    <VeiculoContainer maxWidth={"xl"}>
      <Typography variant="h4" fontWeight={700} color={"primary.main"}>
        Listagem de Veículos
      </Typography>

      <ContentPaper>
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          color={"primary.dark"}
        >
          <Button variant="contained" color="success" startIcon={<Add />} onClick={()=> router.push(`/veiculo/new`)}>
            Criar Veículo
          </Button>
        </Box>

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
          onChange={(event) => handleFilter(event.target.value)}
        />

        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Placa</TableCell>
                <TableCell >
                  Marca e Modelo
                </TableCell>
                <TableCell sx={{ display: { xs: "none", md: "revert" } }}>Km atual</TableCell>
                <TableCell align="center">Funções</TableCell>
              </TableRow>
            </TableHead>
            <StyledTableBody>
              {filterList.map((Veiculo) => (
                <VeiculoTableItem
                  key={Veiculo.id}
                  veiculo={Veiculo}
                  setLoading={setLoading}
                />
              ))}
            </StyledTableBody>
          </Table>
        </StyledTableContainer>
      </ContentPaper>
    </VeiculoContainer>
  );
}
