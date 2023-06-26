import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyle } from "../styles/global";
import theme from "../styles/theme/default";
import { Header } from "@/components/Header";
import { Container } from "@mui/material";
export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container maxWidth='xl' sx={{marginTop:"5.5rem",marginBottom:"1rem"}}>
      <Header />
      <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}
