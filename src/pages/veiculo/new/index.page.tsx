import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Typography,
  Button,
  TextField,
  Grid,
  Stack,
  CircularProgress,
} from "@mui/material";
import router from "next/router";
import { VeiculoContainer, ContentPaper } from "./styles";
import { NewVeiculoData } from "@/@types/VeiculoType";
import { FormEvent, useState } from "react";
import { addVeiculo } from "@/lib/axios";
import { AxiosResponse } from "axios";
export default function NewVeiculo() {
  const [placa, setPlaca] = useState<string>("");
  const [marcaModelo, setMarcaModelo] = useState<string>("");
  const [anoFabricacao, setAnoFabricacao] = useState<string>("");
  const [kmAtual, setKmAtual] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const newVeiculoData: NewVeiculoData = {
      placa,
      marcaModelo,
      anoFabricacao: Number(anoFabricacao),
      kmAtual: Number(kmAtual),
    };
    await addVeiculo(newVeiculoData)
      .then((response: AxiosResponse) => {
        console.log("newVeiculo response data:", response.data);
        router.push(`/veiculo/${response.data}`);
        setLoading(false);
      })
      .catch((error) => {
        console.log("newVeiculo error:", error.message, error.data.response);
        setError(error.data.response);
        setLoading(false);
      });
  }
  return (
    <VeiculoContainer maxWidth={"xl"}>
      <Stack maxWidth={470}>
        <Typography variant="h5" fontWeight={700} color={"primary.main"}>
          Cadastre um novo Veículo
        </Typography>
        <Typography variant="body2" fontWeight={500} color={"text.primary"}>
          Precisamos de algumas informações para criar um novo veículo.
          Certifique de preencher todos os dados abaixo.
        </Typography>
      </Stack>
      <ContentPaper>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight={700} color={"error"}>
                {error != "" ? `Error: ${error}` : ""}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Placa do Veículo"
                value={placa}
                variant="outlined"
                size="small"
                required
                onChange={(e) => setPlaca(e.target.value)}
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Marca e Modelo do Veículo"
                variant="outlined"
                value={marcaModelo}
                size="small"
                fullWidth
                required
                onChange={(e) => setMarcaModelo(e.target.value)}
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Ano de Fabricação"
                value={anoFabricacao}
                variant="outlined"
                size="small"
                type="number"
                required
                onChange={(e) => setAnoFabricacao(e.target.value)}
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Km Atual"
                value={kmAtual}
                variant="outlined"
                size="small"
                type="number"
                required
                onChange={(e) => setKmAtual(e.target.value)}
                sx={{ input: { color: "text.secondary" } }}
              />
            </Grid>

            <Grid item xs={6} color={"text.secondary"}>
              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                startIcon={!loading && <ArrowBack />}
                onClick={() => router.back()}
              >
                Voltar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                disabled={loading}
                endIcon={!loading && <ArrowForward />}
              >
                {loading ? <CircularProgress color="inherit" /> : "Cadastrar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </ContentPaper>
    </VeiculoContainer>
  );
}