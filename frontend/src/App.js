import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//Components
import NavigationBar from "./components/layouts/NavigationBar";
import Footer from "./components/layouts/Footer";
import Container from "./components/layouts/Container";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Container>
        <Routes></Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
