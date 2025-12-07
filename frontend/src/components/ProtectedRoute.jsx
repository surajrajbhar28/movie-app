import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const { userInfo, success } = useSelector((state) => state.auth);

  if (!success) {
    return <Navigate to="/login" replace />;
  }

  if (role && userInfo?.user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
