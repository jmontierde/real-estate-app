// import avatar from "/src/assets/avatar.png";
import { Link } from "react-router-dom";
import userIcon from "/src/assets/user-icon.png";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/features/user/usersSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast("Logged out successfully.");
    console.log("logout");
  };

  return (
    <>
      <ToastContainer />

      <div className="flex justify-between py-6 px-16 items-center ">
        <div>Habi</div>
        <nav className="space-x-6">
          <Link to="/">Home</Link>
          <Link to="about">About</Link>
          <Link to="contact">Contanct</Link>
          <Link to="agent">Agent</Link>
        </nav>

        {isAuthenticated ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img src={userIcon} className="w-8 h-8" alt="" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Link to="/register">
            <img src={userIcon} className="w-8 h-8" alt="" />
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
