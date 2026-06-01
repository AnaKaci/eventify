import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import MyReservationsPage from "./pages/MyReservationsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route
            path="/reservations"
            element={
              <ProtectedRoute roles={["student"]}>
                <MyReservationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
