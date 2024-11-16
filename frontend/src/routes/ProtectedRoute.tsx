import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store";
import Navbar from "@/components/layout/Navbar";

// interface PrivateRouteProps {
//   component: ComponentType<unknown>;
// }

// const ProtectedRoute: React.FC<PrivateRouteProps> = ({
//   component: Component,
//   ...rest
// }) => {
//   const { isAuthenticated } = useAppSelector((state) => state.user);

//   console.log("isAuthenticated", isAuthenticated);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   console.log("rest component", { ...rest });

//   return <Component {...rest} />;
// };

const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }
};

export default ProtectedRoute;
