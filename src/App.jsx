import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";
import ProblemList from "./pages/ProblemList";
import ProblemDetail from "./pages/ProblemDetail";
import ProblemUpdate from "./pages/ProblemUpdate";
import Navbar from "./components/Navbar";
import CreateProblemPage from "./pages/ProblemCreate";
import ProfilePage from "./pages/ProfilePage"

function App() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const location = useLocation();
  const hideNavbar = ["/login", "/register", "/"];

  return (
    <>
      {!hideNavbar.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route element={<Landing />} path="/" />
        <Route
          element={<Register setUsername={setUsername} setRole={setRole} />}
          path="/register"
        />
        <Route
          element={<Login setUsername={setUsername} setRole={setRole} />}
          path="/login"
        />
        <Route
          element={<Leaderboard username={username} />}
          path="/leaderboard"
        />
        <Route element={<ProblemList />} path="/problems" />
        <Route element={<ProblemDetail />} path="/problem/:id" />
        <Route element={<ProblemUpdate />} path="/problem-update/:id" />
        <Route element={<CreateProblemPage />} path="/problem-create" />
        <Route element = {<ProfilePage/>} path = "/profile/:username"/>
      </Routes>
    </>
  );
}

export default App;
