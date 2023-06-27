import { VeiculoData, EditVeiculoData } from "@/@types/VeiculoType";
import { getVeiculoById, updateVeiculo } from "@/lib/axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { VeiculoContainer, ContentPaper } from "./styles";
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { AxiosResponse } from "axios";
export default function VeiculoPage(props: VeiculoData) {
  const { id } = props;
  const [placa, setPlaca] = useState<string>(props.placa);
  const [marcaModelo, setMarcaModelo] = useState<string>(props.marcaModelo);
  const [anoFabricacao, setAnoFabricacao] = useState<string | number>(props.anoFabricacao);
  const [kmAtual, setKmAtual] = useState<string | number>(props.kmAtual);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  console.log("dados Veiculo:", props);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const EditVeiculoData: EditVeiculoData = {
      id,
      anoFabricacao: Number(anoFabricacao),
      kmAtual: Number(kmAtual),
      marcaModelo,
    };
    await updateVeiculo(id, EditVeiculoData)
      .then((response: AxiosResponse) => {
        console.log("editVeiculo response data:", response.data);
        router.push(`/veiculo/${response.data}`);
      })
      .catch((error) => {
        console.log("editVeiculo error:", error);
        setError(error.response.data);
        setLoading(false);
      });
  }

  return (
    <VeiculoContainer maxWidth={"xl"}>
      <Stack maxWidth={470}>
        <Typography variant="h5" fontWeight={700} color={"primary.main"}>
          Editar de Veículo
        </Typography>
        <Typography variant="body2" fontWeight={500} color={"text.primary"}>
          Seja bem-vindo a edição de veículo, Aqui você pode atualizar as
          informações de seu {props.marcaModelo} de placa {props.placa}.
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
                disabled
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
                {loading ? <CircularProgress color="inherit" /> : "Editar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </ContentPaper>
      <Typography variant="body2" fontWeight={700} color={"text.primary"}>
        *Para modificar a placa do veículo, busca
        atendimento personalizado na central.
      </Typography>
    </VeiculoContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const VeiculoId = String(params?.id);

  const Veiculo = await getVeiculoById(Number(VeiculoId));
  const data = await Veiculo.data;
  return {
    props: data,
    revalidate: 60 * 10, // 10 minutes
  };
};
