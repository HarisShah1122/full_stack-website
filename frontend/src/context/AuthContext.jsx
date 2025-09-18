import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // 🛒 Cart state
  const [cart, setCart] = useState([]);

  // fetch user if token exists
  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await fetch("http://localhost:8081/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            setToken(null);
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          setToken(null);
          localStorage.removeItem("token");
        }
      };
      fetchUser();
    }
  }, [token]);

  // auth functions
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // cart functions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, cart, addToCart, removeFromCart, updateCartQuantity }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
