import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace  />;
  }
//   return children;

  try {
    const decoded = jwtDecode(token);    
    // Optional: Check if token is expired
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
        console.log("exp",decoded.exp);
        console.log("current time",currentTime)
      localStorage.removeItem("token");
      return <Navigate to="/" replace state={{ from: location }} />;
    }

    // You can also check roles here like: decoded.role === 'admin'
    return children;
  } catch (error) {
    //If decoding fails (invalid token)
    localStorage.removeItem("token");
    return <Navigate to="/" replace state={{ from: location }} />;
  }
};

export default ProtectedRoute;
