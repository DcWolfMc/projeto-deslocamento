import { Box, Container, Typography } from "@mui/material";
import { parseISO } from "date-fns";
import Image from "next/image";

export default function Home() {
  const date = new Date().toISOString();
  const parsedDate = parseISO(date);
  console.log("Iso date:",date );
  console.log("Parsed date:",parsedDate );
  
  return (
    <Box >
      <Typography variant="h2" fontWeight={700} color={"primary.light"} textAlign={"center"}>
        Bem-vindo a Detour
      </Typography>
      <Typography variant="body1" fontWeight={700} color={"text.primary"} textAlign={"center"}>
        Para aqueles que desejam se deslocar sem complicações
      </Typography>
      <Typography variant="h5" fontWeight={700} color={"text.primary"} textAlign={"center"} marginTop={15}>
        Acesse um de nossos serviços no menu acima e tenha uma frutífera experiência!
      </Typography>
    </Box>
  );
}
