import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = UserAuth();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log(email);
      await logIn(email, password);
      toast.success(`Logged in successfully!`);

      navigate("/");
    } catch (err) {
      console.log(error);
      setError(err.message);
      toast.error("Wrong password or Email! Please try again.");
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl font-bold text-center text-gray-900">
              התחברות
            </h1>

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4 placeholder:text-center"
              name="email"
              placeholder="אימייל"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4 placeholder:text-center"
              name="password"
              placeholder="סיסמא"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full text-center text-white bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              התחבר
            </button>
          </div>

          <div className="text-grey-900 mt-6">
            חדשים בגיסטדיום?
            <Link to="/register">
              <h6 className="no-underline mr-3 font-bold border-b border-blue text-grey-900 hover:text-blue-700">
                הירשמו כאן
              </h6>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
