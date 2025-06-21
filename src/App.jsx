import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";
import ProblemList from "./pages/ProblemList";
import ProblemDetail from "./pages/ProblemDetail";
import ProblemUpdate from "./pages/ProblemUpdate";
import Navbar from "./components/Navbar";
import CreateProblemPage from "./pages/ProblemCreate";

function App() {
  const location = useLocation();
  const hideNavbar = ["/login", "/register","/"];

  return (
    <>
      {!hideNavbar.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route element={<Landing />} path="/" />
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/login" />
        <Route element={<Leaderboard />} path="/leaderboard" />
        <Route element={<ProblemList />} path="/problems" />
        <Route element={<ProblemDetail />} path="/problem/:id" />
        <Route element={<ProblemUpdate />} path="/problem-update" />
        <Route element={<CreateProblemPage/>} path="/problem-create"/>
      </Routes>
    </>
  );
}

export default App;
