import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, roles = [] }) {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/events" replace />;
  }

  return children;
}

export default ProtectedRoute;
