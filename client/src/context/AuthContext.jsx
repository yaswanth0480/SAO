// // import {
// //   createContext,
// //   useContext,
// //   useEffect,
// //   useState,
// // } from "react";

// // import {
// //   getCurrentUser,
// //   loginUser,
// //   logoutUser,
// //   registerUser,
// // } from "../services/authService";

// // const AuthContext = createContext(null);

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const checkSession = async () => {
// //       try {
// //         const response = await getCurrentUser();
// //         setUser(response.user);
// //       } catch {
// //         setUser(null);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     checkSession();
// //   }, []);

// //   const login = async (credentials) => {
// //     const response = await loginUser(credentials);
// //     setUser(response.user);
// //     return response;
// //   };

// //   const register = async (userData) => {
// //     const response = await registerUser(userData);
// //     setUser(response.user);
// //     return response;
// //   };

// //   const logout = async () => {
// //     try {
// //       await logoutUser();
// //     } finally {
// //       setUser(null);
// //     }
// //   };

// //   return (
// //     <AuthContext.Provider
// //       value={{
// //         user,
// //         loading,
// //         login,
// //         register,
// //         logout,
// //         isAuthenticated: Boolean(user),
// //       }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);

// //   if (!context) {
// //     throw new Error("useAuth must be used inside AuthProvider");
// //   }

// //   return context;
// // };
// import {
//   createContext,
//   // useEffect,
//   // useState,
// } from "react";

// import {
//   getCurrentUser,
//   loginUser,
//   logoutUser,
//   registerUser,
// } from "../services/useAuth";

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const response = await getCurrentUser();
//         setUser(response.user);
//       } catch {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkSession();
//   }, []);

//   const login = async (credentials) => {
//     const response = await loginUser(credentials);
//     setUser(response.user);
//     return response;
//   };

//   const register = async (userData) => {
//     const response = await registerUser(userData);
//     setUser(response.user);
//     return response;
//   };

//   const logout = async () => {
//     try {
//       await logoutUser();
//     } finally {
//       setUser(null);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         login,
//         register,
//         logout,
//         isAuthenticated: Boolean(user),
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
import {
  useEffect,
  useState,
} from "react";

import { AuthContext } from "./AuthContext";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    setUser(response.user);
    return response;
  };

  const register = async (userData) => {
    const response = await registerUser(userData);
    setUser(response.user);
    return response;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};