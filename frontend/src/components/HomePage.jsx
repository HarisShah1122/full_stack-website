import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import SubcategoryCard from './SubcategoryCard';
import ProductCard from './ProductCard';

const Home = () => {
  return (
    <div className="bg-white font-sans">
      <section>
        <img 
          src="/assets/banners/hero-banner.png" 
          alt="Hero Banner" 
          className="h-[300px] sm:h-[400px] w-full object-cover"
          loading="lazy"
        />
      </section>
      <section className="p-6">
        <h3 className="text-xl font-semibold text-center mb-4">
          Shop By Category
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4">
          <Link to="/unstitched">
            <CategoryCard
              title="Unstitched"
              img="/assets/unstitched/unstitched-1.jpg"
              description="Explore our unstitched collection"
            />
          </Link>
          <Link to="/mens-wear">
            <CategoryCard
              title="Men's Dress"
              img="/assets/mens/mens-dress-1.webp"
              description="Discover stylish men's clothing"
            />
          </Link>
          <Link to="/shawls">
            <CategoryCard
              title="Men's Shawl"
              img="/assets/shawls/shawl-1.jpg"
              description="Elegant shawls for all seasons"
            />
          </Link>
          <Link to="/bags">
            <CategoryCard
              title="Bags"
              img="/assets/bags/bag-1.jpg"
              description="Trendy bags for every occasion"
            />
          </Link>
        </div>
      </section>
      <section className="p-6">
        <h3 className="text-lg font-medium mb-6 text-center">
          CATEGORY OF MALE DRESS
        </h3>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <Link to="/unstitched">
            <SubcategoryCard
              title="Unstitched Dress"
              img="/assets/mens/unstiched-male-1.webp"
              description="Versatile unstitched fabrics"
            />
          </Link>
          <Link to="/product/eid-special">
            <SubcategoryCard
              title="Eid Dress"
              img="/assets/mens/eid-dress-1.webp"
              description="Festive attire for Eid"
            />
          </Link>
          <Link to="/product/party-wear">
            <SubcategoryCard
              title="Party Dress"
              img="/assets/mens/party-dress-1.jpg"
              description="Stylish party wear"
            />
          </Link>
        </div>
      </section>
      <section className="p-6">
        <h3 className="text-lg font-medium mb-6 text-center">
          MEN'S COLLECTION
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4">
          <Link to="/product/shalwar-kameez">
            <ProductCard title="Shalwar Kameez" img="/assets/mens/shalwar-kameez-1.jpg" />
          </Link>
          <Link to="/product/kurta-pajama">
            <ProductCard title="Kurta Pajama" img="/assets/mens/kurta-pajama-1.jpg" />
          </Link>
          <Link to="/product/party-wear">
            <ProductCard title="Party Dress 1" img="/assets/mens/party-dress-1.jpg" />
          </Link>
          <Link to="/product/party-wear">
            <ProductCard title="Party Dress 2" img="/assets/mens/party-dress-2.jpg" />
          </Link>
          <Link to="/product/party-wear">
            <ProductCard title="Party Dress 3" img="/assets/mens/party-dress-3.png" />
          </Link>
          <Link to="/product/party-wear">
            <ProductCard title="Party Dress 4" img="/assets/mens/party-dress-4.jpg" />
          </Link>
          <Link to="/product/party-wear">
            <ProductCard title="Party Dress 5" img="/assets/mens/party-dress-5.jpg" />
          </Link>
          <Link to="/product/party-wear">
            <ProductCard title="Party Dress 6" img="/assets/mens/party-dress-6.jpg" />
          </Link>
        </div>
      </section>
      <section className="p-6 relative">
        <h3 className="text-lg font-medium mb-6 text-center">
          CATEGORY OF FEMALE DRESS
        </h3>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <Link to="/product/female-unstitched">
            <SubcategoryCard
              title="Unstitched Female Dress"
              img="/assets/womens/unstiched-female-1.jpg"
              description="Customizable unstitched fabrics"
            />
          </Link>
          <Link to="/product/party-wear">
            <SubcategoryCard
              title="Party Dress"
              img="/assets/womens/party-female-1.jpg"
              description="Elegant party wear"
            />
          </Link>
          <Link to="/product/female-unstitched">
            <SubcategoryCard
              title="Casual Dress"
              img="/assets/womens/casual-female-1.jpg"
              description="Comfortable casual attire"
            />
          </Link>
        </div>
      </section>
      <section className="p-6">
        <h3 className="text-lg font-medium mb-6 text-center">
          FEMALE COLLECTION
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4">
          <Link to="/product/female-unstitched">
            <ProductCard title="Unstitched Dress" img="/assets/womens/unstiched-female-1.jpg" />
          </Link>
          <Link to="/product/eid-special">
            <ProductCard title="Eid Special" img="/assets/womens/eid-special-1.jpg" />
          </Link>
          <Link to="/product/party-wear">
            <ProductCard title="Party Wear" img="/assets/womens/party-female-1.jpg" />
          </Link>
          <Link to="/product/female-unstitched">
            <ProductCard title="Casual Dress" img="/assets/womens/casual-female-1.jpg" />
          </Link>
        </div>
      </section>
      <section className="p-6">
        <h3 className="text-lg font-medium mb-6 text-center">
          CATEGORY OF SHAWLS
        </h3>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <Link to="/shawls">
            <SubcategoryCard
              title="Winter Shawl"
              img="/assets/shawls/winter-shawl-1.jpg"
              description="Warm and cozy shawls"
            />
          </Link>
          <Link to="/shawls">
            <SubcategoryCard
              title="Pashmina Shawl"
              img="/assets/shawls/pashmina-shawl-1.jpg"
              description="Luxurious pashmina designs"
            />
          </Link>
          <Link to="/shawls">
            <SubcategoryCard
              title="Formal Shawl"
              img="/assets/shawls/formal-shawl-1.jpg"
              description="Elegant formal shawls"
            />
          </Link>
        </div>
      </section>
      <section className="p-6">
        <h3 className="text-lg font-medium mb-6 text-center">
          SHAWL COLLECTION
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4">
          <Link to="/product/winter-shawl">
            <ProductCard title="Winter Shawl" img="/assets/shawls/winter-shawl-1.jpg" />
          </Link>
          <Link to="/product/pashmina-shawl">
            <ProductCard title="Pashmina Shawl" img="/assets/shawls/pashmina-shawl-1.jpg" />
          </Link>
        </div>
      </section>
      <section className="p-6">
        <h3 className="text-lg font-medium mb-6 text-center">
          CATEGORY OF BAGS
        </h3>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <Link to="/bags">
            <SubcategoryCard
              title="Casual Bag"
              img="/assets/bags/casual-bag-1.jpg"
              description="Stylish everyday bags"
            />
          </Link>
          <Link to="/bags">
            <SubcategoryCard
              title="Leather Bag"
              img="/assets/bags/leather-bag-1.jpg"
              description="Premium leather bags"
            />
          </Link>
          <Link to="/bags">
            <SubcategoryCard
              title="Party Bag"
              img="/assets/bags/party-bag-1.jpg"
              description="Elegant party bags"
            />
          </Link>
        </div>
      </section>
      <section className="p-6">
        <h3 className="text-lg font-medium mb-6 text-center">
          BAG'S COLLECTION
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4">
          <Link to="/product/casual-bag">
            <ProductCard title="Casual Bag" img="/assets/bags/casual-bag-1.jpg" />
          </Link>
        </div>
      </section>
      <footer className="bg-gray-100 px-6 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8 text-center sm:text-left">
          <div>
            <img src="/public/logo2.png" alt="logo" className="h-14 mx-auto sm:mx-0 mb-4" loading="lazy" />
            <p className="font-semibold">Vital Collection PVT Ltd</p>
            <p className="mt-2 text-sm">Call Us: +92315-xxxx0983</p>
            <p className="text-sm">Email: khkula@gmail.com</p>
            <div className="flex justify-center sm:justify-start mt-3 space-x-3">
              <a href="#" className="text-pink-600 hover:text-pink-800">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-800">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-3">INFORMATION</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Shipping & Information</a></li>
              <li><a href="#">Store Locator</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Wholesale</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">CUSTOMER SUPPORT</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Return & Exchange</a></li>
              <li><a href="#">FAQ’s</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">NEWSLETTER SIGNUP</h4>
            <p className="text-sm mb-3">Receive our latest updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="p-2 border border-gray-300 rounded-l w-full text-sm"
              />
              <button className="bg-pink-600 text-white px-4 py-2 rounded-r text-sm hover:bg-pink-700">
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;