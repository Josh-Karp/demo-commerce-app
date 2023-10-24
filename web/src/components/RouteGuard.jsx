import { Navigate, Outlet } from "react-router-dom";
import { getAuthUser } from "../utils/localAuth";

function RouteGuard({ redirectPath = "/auth/login" }) {
  const user = getAuthUser();

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

export default RouteGuard;
