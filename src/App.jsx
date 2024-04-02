import { Container, CssBaseline } from "@mui/material";
import "./App.css";
import MainContent from "./Components/MainContent/MainContent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";

function App() {
  const [myMood, setMyMood] = useState(
    localStorage.getItem("currentMode") === null
      ? "light"
      : localStorage.getItem("currentMode") === "light"
      ? "light"
      : "dark"
  );
  const darkTheme = createTheme({
    palette: {
      mode: myMood,
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div
          style={{ display: "flex", justifyContent: "center", width: "97vw" }}
        >
          <Container maxWidth="xl">
            <MainContent setMyMood={setMyMood} />
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
