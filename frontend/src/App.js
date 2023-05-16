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
import Necklaces from "./components/pages/Products/Necklaces";
import Earrings from "./components/pages/Products/Earrings";
import Bracelets from "./components/pages/Products/Bracelets";
import AllProducts from "./components/pages/Products/AllProducts";
import AddAccessory from "./components/pages/Products/AddProduct";
import ManageProducts from "./components/pages/Products/ManageProducts";

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
            <Route path="/accessory/create" element={<AddAccessory />} />
            <Route path="/necklaces" element={<Necklaces />} />
            <Route path="/earrings" element={<Earrings />} />
            <Route path="/Bracelets" element={<Bracelets />} />
            <Route path="/accessory/all" element={<ManageProducts />} />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
