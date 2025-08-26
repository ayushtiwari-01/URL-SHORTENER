import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {logout} from "@/db/apiAuth";
import useFetch from "@/hooks/use-fetch";
// Corrected the import path for Avatar
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {LinkIcon, LogOut} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {BarLoader} from "react-spinners";
import {Button} from "./ui/button";
import {UrlState} from "@/context";

const Header = () => {
  const {loading, fn: fnLogout} = useFetch(logout);
  const navigate = useNavigate();

  const {user, fetchUser} = UrlState();

  // Function to get initials (first letter of first name + first letter of last name)
  const getInitials = (fullName) => {
    if (!fullName) return "AT";
    
    const nameParts = fullName.trim().split(/\s+/);
    
    if (nameParts.length === 1) {
      // Only one name, return first two letters
      return nameParts[0].slice(0, 2).toUpperCase();
    }
    
    // First letter of first name + first letter of last name
    const firstInitial = nameParts[0][0].toUpperCase();
    const lastInitial = nameParts[nameParts.length - 1][0].toUpperCase();
    
    return firstInitial + lastInitial;
  };

  return (
    <>
      {/* The main container for the header */}
      <nav className="py-4 flex justify-between items-center border-b border-gray-800">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" className="h-12" alt="TrimLink Logo" />
          <span className="text-2xl font-bold tracking-tight hidden md:block">TrimLink</span>
        </Link>

        {/* Action Buttons/User Menu Section */}
        <div className="flex gap-4 items-center">
          {!user ? (
            // Styled Login Button with a gradient
            <Button
              onClick={() => navigate("/auth")}
              className="px-6 font-bold text-white bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 rounded-md transition-all duration-300"
            >
              Login
            </Button>
          ) : (
            // Styled Dropdown Menu
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full overflow-hidden focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {getInitials(user?.user_metadata?.name)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              {/* Styled Dropdown Content */}
              <DropdownMenuContent className="w-56 bg-gray-900 border-gray-700 text-white">
                <DropdownMenuLabel className="text-gray-400">
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    fnLogout().then(() => {
                      fetchUser();
                      navigate("/");
                    });
                  }}
                  className="text-red-400 focus:text-red-500 focus:bg-red-900/50 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {/* The loading bar remains, but now it's clearly below the styled header */}
      {loading && <BarLoader className="my-4" width={"100%"} color="#22D3EE" />}
    </>
  );
};

export default Header;
