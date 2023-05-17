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
import AllProducts from "./components/pages/Products/AllProducts";
import AddAccessory from "./components/pages/Products/AddProduct";
import ManageProducts from "./components/pages/Products/ManageProducts";
import CategoryPage from "./components/pages/Products/CategoryPage";

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
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/accessory/create" element={<AddAccessory />} />
            <Route path="/accessory/all" element={<ManageProducts />} />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route path="/" exact element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
