import Latest from "./pages/latest";
import { Routes, Route } from "react-router-dom";
import LoginPages from "./pages/login-pages";
import GameDetails from "./pages/game-details";
import { AuthContext } from "./auth/AuthProvider";
import { useContext } from "react";

function App() {
  const { detailGames } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Latest />} />
        <Route path="game-details/:id" element={<GameDetails />} />
        <Route path="login-pages" element={<LoginPages />} />
      </Routes>
    </>
  );
}

export default App;
