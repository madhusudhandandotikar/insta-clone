// import React, { useEffect, useState } from "react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import axios from "axios";
// import { toast } from "sonner";
// import { Link, useNavigate } from "react-router-dom";
// import { Loader2 } from "lucide-react";
// import { useSelector } from "react-redux";

// const Signup = () => {
//   const [input, setInput] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const { user } = useSelector((store) => store.auth);
//   const navigate = useNavigate();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const signupHandler = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await axios.post(
//         "https://instaclone-g9h5.onrender.com/api/v1/user/register",
//         input,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         navigate("/login");
//         toast.success(res.data.message);
//         setInput({
//           username: "",
//           email: "",
//           password: "",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, []);
//   return (
//     <div className="flex items-center w-screen h-screen justify-center">
//       <form
//         onSubmit={signupHandler}
//         className="shadow-lg flex flex-col gap-5 p-8"
//       >
//         <div className="my-4">
//           <h1 className="text-center font-bold text-xl">LOGO</h1>
//           <p className="text-sm text-center">
//             Signup to see photos & videos from your friends
//           </p>
//         </div>
//         <div>
//           <span className="font-medium">Username</span>
//           <Input
//             type="text"
//             name="username"
//             value={input.username}
//             onChange={changeEventHandler}
//             className="focus-visible:ring-transparent my-2"
//           />
//         </div>
//         <div>
//           <span className="font-medium">Email</span>
//           <Input
//             type="email"
//             name="email"
//             value={input.email}
//             onChange={changeEventHandler}
//             className="focus-visible:ring-transparent my-2"
//           />
//         </div>
//         <div>
//           <span className="font-medium">Password</span>
//           <Input
//             type="password"
//             name="password"
//             value={input.password}
//             onChange={changeEventHandler}
//             className="focus-visible:ring-transparent my-2"
//           />
//         </div>
//         {loading ? (
//           <Button>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Please wait
//           </Button>
//         ) : (
//           <Button type="submit">Signup</Button>
//         )}
//         <span className="text-center">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600">
//             Login
//           </Link>
//         </span>
//       </form>
//     </div>
//   );
// };

// export default Signup;

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      const res = await axios.post(
        "https://instaclone-g9h5.onrender.com/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials if needed
        }
      );

      // Check if the response indicates success
      if (res.data.success) {
        toast.success(res.data.message); // Show success message
        navigate("/login"); // Redirect to login page
        // Reset input fields
        setInput({
          username: "",
          email: "",
          password: "",
        });
      } else {
        // Handle case where success is false
        toast.error(res.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error); // Log the error for debugging
      // Check if error response exists and extract message
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage); // Show error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect if user is already logged in
    }
  }, [user, navigate]); // Add user and navigate as dependencies

  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        onSubmit={signupHandler}
        className="shadow-lg flex flex-col gap-5 p-8"
      >
        <div className="my-4">
          <h1 className="text-center font-bold text-xl">LOGO</h1>
          <p className="text-sm text-center">
            Signup to see photos & videos from your friends
          </p>
        </div>
        <div>
          <span className="font-medium">Username</span>
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
            required
          />
        </div>
        <div>
          <span className="font-medium">Email</span>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
            required
          />
        </div>
        <div>
          <span className="font-medium">Password</span>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
            required
          />
        </div>
        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Signup</Button>
        )}
        <span className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
