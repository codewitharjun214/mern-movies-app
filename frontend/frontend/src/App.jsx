import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from "./pages/LoginUser";
import LoginAdmin from "./pages/LoginAdmin";
import Movies from "./pages/Movies";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/admin" element={<LoginAdmin />} />

        <Route
          path="/movies"
          element={<ProtectedRoute><Movies /></ProtectedRoute>}
        />
        <Route
          path="/add-movie"
          element={<ProtectedRoute><AddMovie /></ProtectedRoute>}
        />
        <Route
          path="/edit/:id"
          element={<ProtectedRoute><EditMovie /></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
