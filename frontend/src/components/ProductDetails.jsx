import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaLock } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AuthContext from '../context/AuthContext';

const products = {
  "shalwar-kameez": {
    title: "Shalwar Kameez",
    sku: "MW-SK-001",
    oldPrice: 4500,
    newPrice: 3499,
    images: ["/assets/mens/shalwar-kameez-1.jpg", "/assets/mens/shalwar-kameez-2.jpg", "/assets/mens/shalwar-kameez-3.webp"],
    colors: ["Navy Blue", "White", "Black"],
    description: "Premium cotton shalwar kameez with intricate embroidery, perfect for formal and casual occasions.",
    disclaimer: "Colors may vary slightly due to lighting and screen settings.",
  },
  "kurta-pajama": {
    title: "Kurta Pajama",
    sku: "MW-KP-002",
    oldPrice: 3800,
    newPrice: 2799,
    images: ["/assets/mens/kurta-pajama-1.jpg", "/assets/mens/kurta-pajama-2.jpg", "/assets/mens/kurta-pajama-3.webp"],
    colors: ["Beige", "Green", "Grey"],
    description: "Comfortable kurta pajama set, ideal for festive events and daily wear.",
    disclaimer: "Dry clean recommended to maintain fabric quality.",
  },
  "female-unstitched": {
    title: "Unstitched Dress",
    sku: "FW-UD-001",
    oldPrice: 5200,
    newPrice: 3999,
    images: ["/assets/womens/unstiched-female-1.jpg", "/assets/womens/party-female-1.jpg", "/assets/womens/casual-female-1.jpg"],
    colors: ["Red", "Blue", "Gold"],
    description: "Elegant unstitched fabric with detailed embroidery, perfect for custom tailoring.",
    disclaimer: "Fabric length may vary slightly.",
  },
  "eid-special": {
    title: "Eid Special",
    sku: "FW-ES-002",
    oldPrice: 6500,
    newPrice: 4999,
    images: ["/assets/womens/eid-special-1.jpg", "/assets/womens/unstiched-female-1.jpg", "/assets/womens/casual-female-1.jpg"],
    colors: ["Pink", "Purple", "Green"],
    description: "Festive dress with vibrant colors and intricate patterns, ideal for Eid celebrations.",
    disclaimer: "Handle with care to preserve embellishments.",
  },
  "party-wear": {
    title: "Party Wear",
    sku: "FW-PW-003",
    oldPrice: 4800,
    newPrice: 3699,
    images: ["/assets/womens/party-female-1.jpg", "/assets/womens/unstiched-female-1.jpg", "/assets/womens/casual-female-1.jpg"],
    colors: ["Black", "Maroon", "Silver"],
    description: "Stylish party wear dress, perfect for evening events and celebrations.",
    disclaimer: "Dry clean only.",
  },
  "unstitched-dress-1": {
    title: "Unstitched Dress 1",
    sku: "UW-UD1-001",
    oldPrice: 3500,
    newPrice: 2499,
    images: ["/assets/unstitched/unstitched-1.jpg", "/assets/unstitched/casual-1.jpg"],
    colors: ["Blue", "Green"],
    description: "Versatile unstitched fabric for custom designs, suitable for all seasons.",
    disclaimer: "Colors may vary slightly due to lighting.",
  },
  "unstitched-dress-2": {
    title: "Unstitched Dress 2",
    sku: "UW-UD2-002",
    oldPrice: 4000,
    newPrice: 2999,
    images: ["/assets/unstitched/casual-1.jpg", "/assets/unstitched/unstitched-1.jpg"],
    colors: ["Red", "White"],
    description: "High-quality unstitched fabric with elegant patterns, ideal for custom tailoring.",
    disclaimer: "Fabric length may vary slightly.",
  },
  "winter-shawl": {
    title: "Winter Shawl",
    sku: "SH-W-001",
    oldPrice: 3000,
    newPrice: 1999,
    images: ["/assets/shawls/winter-shawl-1.jpg", "/assets/shawls/winter-shawl-2.jpg"],
    colors: ["Brown", "Grey"],
    description: "Warm and cozy winter shawl, perfect for cold seasons.",
    disclaimer: "Dry clean recommended.",
  },
  "pashmina-shawl": {
    title: "Pashmina Shawl",
    sku: "SH-P-002",
    oldPrice: 4500,
    newPrice: 3499,
    images: ["/assets/shawls/pashmina-shawl-1.jpg", "/assets/shawls/pashmina-shawl-2.jpg"],
    colors: ["Black", "Cream"],
    description: "Luxurious pashmina shawl with intricate designs.",
    disclaimer: "Handle with care to preserve fabric quality.",
  },
  "casual-bag": {
    title: "Casual Bag",
    sku: "BG-C-001",
    oldPrice: 2500,
    newPrice: 1799,
    images: ["/assets/bags/casual-bag-1.jpg", "/assets/bags/casual-bag-2.jpg"],
    colors: ["Blue", "Brown"],
    description: "Stylish casual bag for everyday use.",
    disclaimer: "Colors may vary slightly due to lighting.",
  },
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const product = products[id] || products["shalwar-kameez"];
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [paymentMethod, setPaymentMethod] = useState("HBL");
  const [paymentError, setPaymentError] = useState(null);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = async () => {
    if (!user || !token) {
      navigate("/signin");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: id,
          quantity,
          color: selectedColor,
          price: product.newPrice,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Item added to cart successfully!");
      } else {
        alert(data.error || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Server error. Please try again later.");
    }
  };

  const handleBuyNow = async () => {
    if (!user || !token) {
      navigate("/signin");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: [
            {
              productId: id,
              quantity,
              color: selectedColor,
              price: product.newPrice,
            },
          ],
          paymentMethod,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        if (paymentMethod === "COD") {
          alert("Cash on Delivery order placed successfully!");
          navigate(`/success?orderID=${data.orderId}&paymentMethod=${paymentMethod}`);
        } else {
          window.location.href = data.paymentUrl;
        }
      } else {
        setPaymentError(data.error || "Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setPaymentError("Server error. Please try again later.");
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="w-full h-[400px] sm:h-[500px]"
          >
            {product.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {product.title}
          </h1>
          <p className="text-gray-500 text-sm">SKU: {product.sku}</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 line-through text-lg">
              Rs. {product.oldPrice}
            </span>
            <span className="text-red-600 font-bold text-xl">
              Rs. {product.newPrice}
            </span>
          </div>
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">Color: {selectedColor}</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? "border-blue-600" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">Quantity</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded"
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">Payment Method</h3>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="HBL">HBL (Credit/Debit Card)</option>
              <option value="JazzCash">JazzCash (Card/Mobile Wallet)</option>
              <option value="UBL">UBL (Credit/Debit Card)</option>
              <option value="EasyPay">EasyPay (Card/Mobile Wallet)</option>
              <option value="COD">Cash on Delivery</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white font-medium py-3 rounded hover:bg-blue-800 transition flex items-center justify-center"
            >
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-green-600 text-white font-medium py-3 rounded hover:bg-green-800 transition"
            >
              Buy Now
            </button>
          </div>
          {paymentError && <p className="text-red-600 mt-2">{paymentError}</p>}
          <div className="border-t pt-4 mt-4">
            <p className="text-gray-600 flex items-center gap-2">
              <FaLock className="text-green-600" /> Secure Checkout
            </p>
            <p className="text-gray-600">Free Delivery on orders over Rs. 5000</p>
            <p className="text-gray-600">30-Day Return Policy</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Description</h2>
        <p className="text-gray-600">{product.description}</p>
        <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">Disclaimer</h2>
        <p className="text-gray-600">{product.disclaimer}</p>
      </div>
    </div>
  );
};

export default ProductDetails;