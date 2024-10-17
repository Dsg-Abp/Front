import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./route/RouterProtect";
import TelaInicial from "./pages/TelaInicial";
import { AlimentoProvider } from "./contexts/AlimentoContext";
import AlimentoSearchPage from "./pages/AlimentosPage/AlimentoPage";
import { WaterProvider } from "./contexts/WaterContext"; // Importando o WaterProvider

function Rotas() {
  return (
    <AuthProvider>
      <UserProvider>
        <AlimentoProvider>
          <WaterProvider> {/* Envolvendo com WaterProvider */}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/TelaInicial" element={<TelaInicial />} />
                <Route path="/Alimento" element={<AlimentoSearchPage />} />
              </Route>
            </Routes>
          </WaterProvider>
        </AlimentoProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default Rotas;
