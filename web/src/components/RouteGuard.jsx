import { Navigate, Outlet } from "react-router-dom";

function RouteGuard({ user, redirectPath = "/auth/login" }) {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

export default RouteGuard;
