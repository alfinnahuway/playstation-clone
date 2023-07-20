import { Link } from "react-router-dom";
import { navList } from "./nav-list/navList";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";
import { useState } from "react";

const Header = () => {
  const [active, setAcive] = useState(false);

  const listPage = () => {
    setAcive(!active);
  };

  const { isAuthenticated, logout, userName, avatar, userEmail } =
    useContext(AuthContext);
  return (
    <header className="w-full fixed shadow-xl z-10 bg-white">
      <nav className="w-[95%] mx-auto flex justify-between items-center">
        <div>Playstation</div>
        <div className="px-10">
          <ul className="w-full h-20 flex items-center gap-4">
            {navList.map((items) => (
              <li key={items.id}>{items.title}</li>
            ))}
          </ul>
        </div>
        <div>
          {isAuthenticated ? (
            <div className="flex gap-4">
              <button
                type="button"
                onClick={listPage}
                className="w-10 h-10 overflow-hidden rounded-full"
              >
                <img className="w-full" src={avatar} alt="" />
              </button>

              <div
                className={`w-72 font-semibold absolute py-2 px-1 top-16 right-12 bg-white rounded-xl ${
                  active ? "" : "hidden"
                }`}
              >
                <button className="flex">
                  <img className="w-20 h-20 rounded-full" src={avatar} alt="" />
                  <div className="p-2">
                    <h1>{userName}</h1>
                    <p className="text-sm text-gray-300">{userEmail}</p>
                  </div>
                </button>
                <button onClick={logout} className="w-full text-left p-2">
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link
              to={"login-pages"}
              className="w-20 px-4 py-1 rounded-2xl bg-[#0070cc] text-white  font-semibold hover:bg-[#005499] text-sm"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
