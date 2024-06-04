import { Route, Routes } from "react-router-dom";
import { OrderPage } from "./pages/OrderPage";
import { AboutPage } from "./pages/AboutPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<OrderPage />} />
      <Route path="about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;
