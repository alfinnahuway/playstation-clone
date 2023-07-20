import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

const LoginPages = () => {
  const { login, setEmail, setPwd, email, pwd, setErrMsg, errMsg, loading } =
    useContext(AuthContext);
  const [next, setNext] = useState(false);
  const emailRef = useRef();
  const errRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login();
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const nextPassword = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomainPattern = /\.(com|co\.id|net|org)$/i;
    if (!email) {
      setErrMsg("Email required");
    } else if (!emailPattern.test(email)) {
      setErrMsg("Email format must use '@' example: example@mail.com");
    } else if (!validDomainPattern.test(email)) {
      setErrMsg("Email must use the domain '.com,.co.id, .net, etc.'");
    } else {
      setErrMsg("");
      setNext(true);
    }
  };

  const backEmail = () => {
    setErrMsg("");
    setNext(false);
  };

  return (
    <>
      <section className="w-full h-screen bg-[url('https://my.account.sony.com/central/signin/9fe91826ca150e7fa133749535fa2ed86e5c1b70/assets/images/wallpaper.jpg')] bg-no-repeat bg-center bg-cover">
        <main className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-[25rem] h-[35rem] border flex flex-col">
            <div className="w-full p-4 bg-[#141414] relative">
              <h1 className="text-center text-white text-xl font-semibold">
                SONY WAKWAW
              </h1>
              <Link
                to="/"
                className="text-white text-2xl  absolute right-5 top-3 hover:text-gray-300"
              >
                X
              </Link>
              <button
                type="button"
                className={`text-white text-lg  absolute left-5 top-4 hover:text-gray-300 ${
                  next ? "" : "hidden"
                }`}
                onClick={backEmail}
              >
                Back
              </button>
            </div>
            <div className="w-full p-8 bg-[#00439c]">
              <h1 className="text-center text-white text-2xl font-semibold">
                Stasiun Bermain
              </h1>
            </div>
            <div className="w-full h-full bg-white grid grid-cols-1">
              <div className="w-full h-10 px-7 py-4">
                <p className="text-sm">
                  Sign in to PlayStation with one of your Sony accounts.
                  <a href=""> Learn More</a>
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="px-16">
                  <p
                    ref={errRef}
                    className={`w-full  mb-3 text-white text-center font-light text-[0.7rem] p-3 bg-red-600  opacity-50 ${
                      errMsg ? "" : "hidden"
                    }`}
                  >
                    {errMsg}
                  </p>
                </div>
                <div
                  className={`w-full h-full flex flex-col px-12 gap-2 ${
                    next ? "hidden" : ""
                  }`}
                >
                  <input
                    type="email"
                    id="email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    className="outline-none py-1 px-3 border rounded-sm"
                  />
                  <button
                    type="button"
                    className="p-2 bg-[#0070cc] text-white  font-semibold hover:bg-[#005499] text-sm rounded-sm "
                    onClick={nextPassword}
                  >
                    Next
                  </button>

                  <a href="" className="py-3 text-sm">
                    Trouble Signing In?
                  </a>
                  <button className="p-2  border text-sm rounded-sm mb-20">
                    Create New Account
                  </button>
                </div>
                <div
                  className={`w-full h-full flex-col px-12 gap-2 ${
                    next ? "flex" : "hidden"
                  }`}
                >
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    className="outline-none py-1 px-3 border rounded-sm"
                  />
                  <button
                    className="p-2 relative bg-[#0070cc] text-white  font-semibold hover:bg-[#005499] text-sm rounded-sm mb-28"
                    type="submit"
                  >
                    {loading ? (
                      <svg
                        class="animate-spin h-5 w-5 mr-3 absolute"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : null}
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
export default LoginPages;
