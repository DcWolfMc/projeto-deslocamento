import {
  Box,
  Button,
  Chip,
  TextField,
  Divider,
  InputAdornment,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { getCliente, deleteCliente } from "@/lib/axios";
import {
  StyledTableContainer,
  StyledTableBody,
  ContentPaper,
  ClienteContainer,
} from "./styles";
import { useEffect, useState } from "react";
import { ClienteData } from "@/@types/ClienteType";
import { AxiosError, AxiosResponse } from "axios";
import { Add, Search } from "@mui/icons-material";
import { ClienteTableItem } from "./components/ClienteTableItem";
import { useRouter } from "next/router";

export default function Cliente() {
  const router = useRouter();
  const [clienteList, setClienteList] = useState<ClienteData[]>([]);
  const [filterList, setFilterList] = useState<ClienteData[]>([]);
  const [snackbar, setSnackbar] = useState<boolean>(false);
  const [snackbarType, setSnackbarType] = useState<"error"|"info">("error");
  const [snackbarMassage, setSnackbarMassage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function callApi() {
      await getCliente().then((response: AxiosResponse) => {
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
          label="Buscar por nome"
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
                  Numero do documento
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
                  CallDeleteCliente={() => CallDeleteCliente(cliente.id)}
                />
              ))}
            </StyledTableBody>
          </Table>
        </StyledTableContainer>
      </ContentPaper>
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
    </ClienteContainer>
  );
}
