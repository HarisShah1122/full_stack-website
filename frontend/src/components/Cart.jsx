import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useContext(AuthContext);

  const totalPrice = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link
            to="/"
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center border-b py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateCartQuantity(item.id, -1)}
                      className="text-gray-600 px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="text-gray-600 px-2 py-1 border rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="text-gray-800 font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <p className="text-xl font-semibold text-gray-800">
              Total: ${totalPrice}
            </p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
