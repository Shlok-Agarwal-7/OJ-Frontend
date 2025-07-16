import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";
import ProblemList from "./pages/ProblemList";
import ProblemDetail from "./pages/ProblemDetail";
import ProblemUpdate from "./pages/ProblemUpdate";
import Navbar from "./components/Navbar";
import CreateProblemPage from "./pages/ProblemCreate";
import ProfilePage from "./pages/ProfilePage";
import ContestsPage from "./pages/ContestsPage";
import ContestDetailPage from "./pages/ContestDetailPage";
import ContestCreateForm from "./pages/ContestCreatePage";
import ContestAddProblems from "./components/ContestAddProblems";
function App() {
  const location = useLocation();
  const hideNavbar = [
    "/login",
    "/register",
    "/",
    "/contests/:cid/problem/:pid",
  ];

  const shouldHideNavbar = hideNavbar.some((pattern) =>
    matchPath({ path: pattern, end: true }, location.pathname)
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route element={<Landing />} path="/" />
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/login" />
        <Route element={<Leaderboard />} path="/leaderboard" />
        <Route element={<ProblemList />} path="/problems" />
        <Route element={<ProblemDetail />} path="/problem/:pid" />
        <Route element={<ProblemUpdate />} path="/problem-update/:id" />
        <Route element={<CreateProblemPage />} path="/problem-create" />
        <Route element={<ProfilePage />} path="/profile/:username" />
        <Route element={<ContestsPage />} path="/contests" />
        <Route element={<ContestDetailPage />} path="/contests/:id" />
        <Route element={<ProblemDetail />} path="/contests/:cid/problem/:pid" />
        <Route element={<ContestCreateForm />} path="/Contests/create" />
        <Route element={<ContestAddProblems />} path="/addProblems/:id" />
      </Routes>
    </>
  );
}

export default App;
