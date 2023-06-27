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
import { getCliente } from "@/lib/axios";
import {
  StyledTableContainer,
  StyledTableBody,
  ContentPaper,
  ClienteContainer,
} from "./styles";
import { useEffect, useState } from "react";
import { ClienteData } from "@/@types/ClienteType";
import { AxiosResponse } from "axios";
import { Add, Search } from "@mui/icons-material";
import { ClienteTableItem } from "./components/ClienteTableItem";
import { useRouter } from "next/router";

export default function Cliente() {
  const router = useRouter();
  const [clienteList, setClienteList] = useState<ClienteData[]>([]);
  const [filterList, setFilterList] = useState<ClienteData[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function callApi() {
      await getCliente().then((response: AxiosResponse<ClienteData[]>) => {
        console.log(response.data);

        setClienteList(response.data);
        setFilterList(response.data);
      });
    }
    if (loading) {
      callApi();
      setLoading(false);
    }
  }, [loading]);

  function handleFilter(input: string) {
    let filterList = clienteList.filter((cliente) => {
      if (
        input == "" ||
        cliente.nome.toString().toLowerCase().includes(input.toLowerCase()) ||
        cliente.númeroDocumento
          .toString()
          .toLowerCase()
          .includes(input.toLowerCase())
      ) {
        return cliente;
      }
    });
    setFilterList(filterList);
  }


  return (
    <ClienteContainer maxWidth={"xl"}>
      <Typography variant="h4" fontWeight={700} color={"primary.main"}>
        Listagem de clientes
      </Typography>

      <ContentPaper>
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          color={"primary.dark"}
        >
          <Button variant="contained" color="success" startIcon={<Add />} onClick={()=> router.push(`/cliente/new`)}>
            Criar cliente
          </Button>
        </Box>

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
          onChange={(event) => handleFilter(event.target.value)}
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
              {filterList.map((cliente, index) => (
                <ClienteTableItem
                  key={cliente.id}
                  cliente={cliente}
                  setLoading={setLoading}
                />
              ))}
            </StyledTableBody>
          </Table>
        </StyledTableContainer>
      </ContentPaper>
    </ClienteContainer>
  );
}
