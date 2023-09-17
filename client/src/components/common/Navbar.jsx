import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../../redux/reducers/auth";
import { BsCart3 } from "react-icons/bs";
import Cart from "../order/Cart";
import { useState } from "react";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const [showCart, setShowCart] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-evenly">
          <div className="flex flex-1 items-center justify-start">
            <Link to="/" className="flex flex-shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Home"
              />
            </Link>

            {user?.role === "staff" && (
              <>
                <Link
                  to="/products/new"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ml-3"
                >
                  Create Product
                </Link>
              </>
            )}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative mr-4">
              <BsCart3
                onClick={() => setShowCart(!showCart)}
                className="text-gray-400 h-5 w-5 cursor-pointer hover:text-gray-200"
              />
              {showCart && (
                <Cart className="absolute w-72 h-96 top-8 right-2 z-10" />
              )}
            </div>
            {user ? (
              <div className="flex flex-col items-center relative ml-3">
                <p className="text-gray-300">{user.email}</p>
                <button
                  onClick={() => {
                    dispatch(signout());
                    navigate("/signin");
                  }}
                  className="text-gray-400 px-3 cursor-pointer rounded-md text-sm font-medium"
                >
                  Signout
                </button>
              </div>
            ) : (
              <div>
                <Link
                  to="/signin"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
