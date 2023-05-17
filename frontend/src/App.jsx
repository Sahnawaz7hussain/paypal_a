import { Box, Divider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import HeroImg from "./components/Home/HeroImg";
import MainRoute from "./routes/MainRoute";
import Footer from "./components/Footer";
//import "./App.css";
function App() {
  return (
    <Box className="App">
      <Navbar />
      <MainRoute />
      <Divider />
      <Footer />
    </Box>
  );
}

export default App;
