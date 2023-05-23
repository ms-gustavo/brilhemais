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
import ProductDetails from "./components/pages/Products/ProductDetails";
import EditProduct from "./components/pages/Products/EditProduct";
import ManageCarroussel from "./components/pages/Products/ManageCarroussel";
import CreateCarroussel from "./components/pages/Products/CreateCarroussel";
import CreateCategory from "./components/pages/Products/CreateCategory";
import ManageCategory from "./components/pages/Products/ManageCategory";
import Care from "./components/pages/Others/Care";
import Delivery from "./components/pages/Others/Delivery";

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
            <Route path="/cares" element={<Care />} />
            <Route path="/deliveries" element={<Delivery />} />
            <Route path="/accessory/edit/:id" element={<EditProduct />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/accessory/:id" element={<ProductDetails />} />
            <Route path="/accessory/create" element={<AddAccessory />} />
            <Route path="/category/create" element={<CreateCategory />} />
            <Route path="/category/manage" element={<ManageCategory />} />
            <Route path="/accessory/all" element={<ManageProducts />} />
            <Route path="/carroussel/all" element={<ManageCarroussel />} />
            <Route path="/carroussel/create" element={<CreateCarroussel />} />
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
