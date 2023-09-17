import { BrowserRouter, Route, Routes } from "react-router-dom";
import SigninPage from "./pages/Signin";
import SignupPage from "./pages/Signup";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navbar from "./components/common/Navbar";
import ProductListPage from "./pages/ProductList";
import ProductCreatePage from "./pages/ProductCreate";
import CheckoutPage from "./pages/Checkout";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/products/new" element={<ProductCreatePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
