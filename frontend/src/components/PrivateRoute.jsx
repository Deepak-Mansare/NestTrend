import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.user);

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
export default PrivateRoute;
