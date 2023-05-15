import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//Components
import NavigationBar from "./components/layouts/NavigationBar";
import Footer from "./components/layouts/Footer";
import Container from "./components/layouts/Container";
import Home from "./components/pages/Home/Home";
import Register from "./components/pages/Auth/Register";
import { UserProvider } from "./context/UserContext";
import Message from "./components/layouts/Message";
import Login from "./components/pages/Auth/Login";

function App() {
  return (
    <Router>
      <UserProvider>
        <NavigationBar />
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
