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
import { getDeslocamento } from "@/lib/axios";
import {
  StyledTableContainer,
  StyledTableBody,
  ContentPaper,
  DeslocamentoContainer,
} from "./styles";
import { useEffect, useState } from "react";
import { DeslocamentoData } from "@/@types/DeslocamentoType";
import { AxiosResponse } from "axios";
import { Add, Search } from "@mui/icons-material";
import { DeslocamentoTableItem } from "./components/DeslocamentoTableItem";
import { useRouter } from "next/router";
import dayjs from "dayjs";

export default function Deslocamento() {
  const router = useRouter();
  const [deslocamentoList, setDeslocamentoList] = useState<DeslocamentoData[]>(
    []
  );
  const [filterList, setFilterList] = useState<DeslocamentoData[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function callApi() {
      await getDeslocamento().then(
        (response: AxiosResponse<DeslocamentoData[]>) => {
          console.log(response.data);

          setDeslocamentoList(response.data);
          setFilterList(response.data);
        }
      );
    }
    if (loading) {
      callApi();
      setLoading(false);
    }
  }, [loading]);

  function handleFilter(input: string) {
    let filterList = deslocamentoList.filter((deslocamento) => {
      let dataInicial = dayjs(deslocamento.inicioDeslocamento).format(
        "DD-MM-YYYY HH:mm:ss"
      );
      let datafinal = dayjs(deslocamento.fimDeslocamento).format(
        "DD-MM-YYYY HH:mm:ss"
      );
      if (
        input == "" ||
        dataInicial.toLowerCase().includes(input.toLowerCase()) ||
        (deslocamento.fimDeslocamento &&
          datafinal.toLowerCase().includes(input.toLowerCase()))
      ) {
        return Deslocamento;
      }
    });
    setFilterList(filterList);
  }

  return (
    <DeslocamentoContainer maxWidth={"xl"}>
      <Typography variant="h4" fontWeight={700} color={"primary.main"}>
        Listagem de Deslocamentoes
      </Typography>

      <ContentPaper>
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          color={"primary.dark"}
        >
          <Button
            variant="contained"
            color="success"
            startIcon={<Add />}
            onClick={() => router.push(`/deslocamento/new`)}
          >
            Criar Deslocamento
          </Button>
        </Box>

        <TextField
          label="Buscar por Data de início ou finalização do Deslocamento"
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
                <TableCell sx={{ display: { xs: "none", md: "revert" } }}>
                  Motivo
                </TableCell>
                <TableCell>Data de Início</TableCell>
                <TableCell>Data de Finalização</TableCell>
                <TableCell align="center">Funções</TableCell>
              </TableRow>
            </TableHead>
            <StyledTableBody>
              {filterList.map((deslocamento, index) => (
                <DeslocamentoTableItem
                  key={deslocamento.id}
                  deslocamento={deslocamento}
                  setLoading={setLoading}
                />
              ))}
            </StyledTableBody>
          </Table>
        </StyledTableContainer>
      </ContentPaper>
    </DeslocamentoContainer>
  );
}
