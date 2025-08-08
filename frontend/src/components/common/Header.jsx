import React from 'react';
import { NavBar } from '../../config';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useSearchParams, useNavigate,Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, UserCog, LogOut, ShoppingCart } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems } from '@/slices/cartSlice';
import { logoutUser } from '@/slices/authSlice';
import UserCartWrapper from '../shop/useCartWrapper';
import { Avatar, AvatarFallback } from "../ui/avatar";
import Logo from '../../../public/Logo.png'

// MenuItems Component
const MenuItems = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  function handleNavigate(item) {
    const brand = searchParams.get('brand');
    const params = new URLSearchParams();

    if (item.id !== "home" && item.id !== "products") {
      params.set("category", item.id);
      if (brand) params.set("brand", brand);
      navigate(`/shop/products?${params.toString()}`);
    } else if (item.id === "products") {
      navigate("/shop/products");
    } else {
      navigate(item.path);
    }
  }

  return (
    <nav className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
      {NavBar.map((item, i) => (
        <Label key={i} onClick={() => handleNavigate(item)} id={item.id}>
          {item.label}
        </Label>
      ))}
    </nav>
  );
};

// HeaderRight Component
const HeaderRight = () => {
  const { user } = useSelector(state => state.auth);
  const isAuthenticated = !!user;
  const { cartItems } = useSelector(state => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  React.useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user?.id, isAuthenticated]);

  return (
    <div className="flex items-center gap-4">
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1.5 right-0 text-sm font-bold">
              {cartItems?.items?.length || 0}
            </span>
            <span className="sr-only">User cart</span>
          </Button>
        </SheetTrigger>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items || []}
        />
      </Sheet>

      {!isAuthenticated ? (
        <Button onClick={() => navigate("/auth/login")}>Login</Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black">
              <AvatarFallback className="bg-black text-white font-extrabold">
                {user?.userName?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56">
            <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/shop/account")}>
              <UserCog className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <div className="flex items-center px-5 py-3">
      {/* Left: Logo */}
     
      <div className="flex-1">
         <Link to='/shop/home'>
        <div className="flex"><img height={50} width={50} src={Logo} /><h1 className='text-2xl font-bold'>E-Commerce</h1></div>
        </Link>
      </div>


      {/* Center: Navbar items */}
      <div className="flex-1 hidden lg:flex justify-center">
        <MenuItems />
      </div>

      {/* Right: Cart & Login/User */}
      <div className="hidden lg:flex-1 lg:flex lg:justify-end lg:items-center">
        <HeaderRight />
      </div>

      {/* Mobile Menu Trigger */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="border p-2">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-80 sm:w-96" side="left">
            <MenuItems />
            <div className="mt-6">
              <HeaderRight />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Header;
