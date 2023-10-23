import { getAuthUserRole } from "../utils/localAuth";

function AdminGuard({ children }) {
  const userRole = getAuthUserRole();

  if (!userRole && userRole == "admin") {
    return <>{children}</>;
  }

  return null;
}

export default AdminGuard;
