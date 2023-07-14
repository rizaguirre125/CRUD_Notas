import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import TaskPage from "./pages/TaskPage.jsx";
import TaskFormPage from "./pages/TaskFormPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";
import { TaskProvider } from "./context/TasksContext.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Navbar />
          <main className="container-lg mx-auto px-10 my-5">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TaskPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
