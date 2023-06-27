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
import { getCondutor } from "@/lib/axios";
import {
  StyledTableContainer,
  StyledTableBody,
  ContentPaper,
  CondutorContainer,
} from "./styles";
import { useEffect, useState } from "react";
import { CondutorData } from "@/@types/CondutorType";
import { AxiosResponse } from "axios";
import { Add, Search } from "@mui/icons-material";
import { CondutorTableItem } from "./components/CondutorTableItem";
import { useRouter } from "next/router";

export default function Condutor() {
  const router = useRouter();
  const [condutorList, setCondutorList] = useState<CondutorData[]>([]);
  const [filterList, setFilterList] = useState<CondutorData[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function callApi() {
      await getCondutor().then((response: AxiosResponse<CondutorData[]>) => {
        console.log(response.data);

        setCondutorList(response.data);
        setFilterList(response.data);
      });
    }
    if (loading) {
      callApi();
      setLoading(false);
    }
  }, [loading]);

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
        return Condutor;
      }
    });
    setFilterList(filterList);
  }


  return (
    <CondutorContainer maxWidth={"xl"}>
      <Typography variant="h4" fontWeight={700} color={"primary.main"}>
        Listagem de Condutores
      </Typography>

      <ContentPaper>
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          color={"primary.dark"}
        >
          <Button variant="contained" color="success" startIcon={<Add />} onClick={()=> router.push(`/condutor/new`)}>
            Criar Condutor
          </Button>
        </Box>

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
          onChange={(event) => handleFilter(event.target.value)}
        />

        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell >
                  Número da Habilitação
                </TableCell>
                <TableCell sx={{ display: { xs: "none", md: "revert" } }}>Categoria</TableCell>
                <TableCell align="center">Funções</TableCell>
              </TableRow>
            </TableHead>
            <StyledTableBody>
              {filterList.map((Condutor, index) => (
                <CondutorTableItem
                  key={Condutor.id}
                  Condutor={Condutor}
                  setLoading={setLoading}
                />
              ))}
            </StyledTableBody>
          </Table>
        </StyledTableContainer>
      </ContentPaper>
    </CondutorContainer>
  );
}
