import { useState } from "react";
import { useAuth } from "../store/useAuth";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // 🔁 Zustand auth store (currently unused)
  const { login , isLogin }  = useAuth();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const success = validateForm()
    if ( success === true ) login(formData)
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center 
                  justify-center relative"
      style={{ backgroundImage: "url('/signup.jpg')" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/40 
                      via-purple-600/40 to-indigo-900/60" />

      <div className="relative z-10 max-w-md w-full bg-white/20 backdrop-blur-xl p-8 
                      rounded-xl shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-2">Login</h2>
        <p className="text-2xl text-center mb-6">Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value})}
              className={`input input-bordered w-full mb-4 px-4 py-2 rounded 
                        bg-white/80 text-black outline-none`}/>
          </div>

          {/* Password with Toggle */}
          <div>
            <label className="block mb-1">Password</label>
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value})}
                className={`input input-bordered w-full px-4 py-2 rounded bg-white/80
                           text-black outline-none pr-10`}/>
              <button
                type="button"
                onClick={() => setShowPassword( !showPassword )}
                className="absolute top-1/2 right-3 transform -translate-y-1/2">
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-black" />
                ) : (
                  <Eye className="w-5 h-5 text-black" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={ isLogin }
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white 
                        font-bold py-2 rounded transition">
              { isLogin ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Loading...
                </span>
                ) : (
                "Login"
              )}
          </button>
        </form>

        {/* Link to login */}
        <div>
          <p className="cursor-pointer text-white mt-5 text-center">
            Don't have an account ?{" "}
          <Link to="/signup" className="font-bold text-black underline">
              Create account
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Login;