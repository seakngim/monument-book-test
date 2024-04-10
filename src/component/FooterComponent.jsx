import React from "react";
import logo from "../assets/images/MBLogo.png";
import { Avatar } from "antd";
import { MailOutlined, PhoneOutlined, YoutubeOutlined, FacebookOutlined } from '@ant-design/icons';
import { AiOutlineFacebook } from "react-icons/ai";
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";

const FooterComponent = () => {
  return (
    <footer className="bg-[#292D77] border-t-2 py-2 text-white">
      <div className="w-[80%] m-auto mt-[25px] bg-white-200 relative">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8">
          {/* section	logo (name monument Book) */}
          <section className="mb-6 grid justify-items-center text-center">
            <Link to="/" className="flex">
              <Avatar
                size={100}
                src={logo}
                className="bg-white p-4 h-0"
              />
            </Link>
            <p className="lg:-mt-10 mt-2">Monument Books was established in Phnom Penh in 1993 and has grown to become the largest chain of bookstores in Cambodia.</p>
          </section>
          {/* section menu */}
          <section>
            <h2 className="mb-2 pb-4 text-sm font-semibold text-white uppercase dark:text-white border-1 border-b border-dotted">
              Menu
            </h2>
            <div className="divide-dashed" />
            <ul className="text-white px-2">
              <li className="mt-5">
                <Link to="/" className="hover:underline hover:underline-offset-8">
                  Home
                </Link>
              </li>
              <li className="mt-2">
                <Link to="/book" className="hover:underline hover:underline-offset-8">
                  Books
                </Link>
              </li>
              <li className="mt-2">
                <Link to="/profile" className="hover:underline hover:underline-offset-8">
                  Profile
                </Link>
              </li>
              <li className="mt-2">
                <Link to="/cart" className="hover:underline hover:underline-offset-8">
                  View Cart
                </Link>
              </li>
              <li className="mt-2">
                <Link to="/order" className="hover:underline hover:underline-offset-8">
                  My Order
                </Link>
              </li>
              <li className="mt-2">
                <Link to="/favorite" className="hover:underline hover:underline-offset-8">
                  My Favorite
                </Link>
              </li>
            </ul>
          </section>
          {/* section contact us */}
          <section>
            <h2 className="mb-2 pb-4 text-sm font-semibold text-white uppercase dark:text-white border-1 border-b border-dotted">
              Contact Us
            </h2>
            <div className="divide-dashed" />
            <ul className="dark:text-white px-2">
              <li className="mt-5 hover:underline hover:underline-offset-8">
                {/* <PhoneOutlined className="mr-2" /> */}
                <Link to="tel:(+855) 17 899 599">(+855) 17 899 599</Link>
              </li>
              <li className="flex items-center mt-2 hover:underline hover:underline-offset-4">
                <MailOutlined className="mr-2" />
                <Link to="sambo@monument-books.com">Email</Link>
              </li>
              <li className="flex items-center mt-2 hover:underline hover:underline-offset-4">
                <YoutubeOutlined className="mr-2" />
                <Link to="https://www.youtube.com/channel/UCaRmWh_w0O6nZlpPLRgnFQw">YouTube</Link>
              </li>
              <li className="flex items-center mt-2 hover:underline hover:underline-offset-4">

                <AiOutlineFacebook className="mr-2" />
                <Link to="https://web.facebook.com/monumentbooksandtoys">Facebook</Link>
              </li>
            </ul>
          </section>
          {/* section location */}
          <section>
            <h2 className="mb-2 pb-4 text-sm font-semibold text-white uppercase dark:text-white border-1 border-b border-dotted">
              Address
            </h2>
            <div className="max-w-auto mt-5 px-2">
              <iframe className="w-full h-60" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15635.59016861525!2d104.92130265908833!3d11.559202279381877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095139ffd8720b%3A0x214ebe2326526948!2sMonument%20Books!5e0!3m2!1sen!2skh!4v1708155008884!5m2!1sen!2skh" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </section>
        </div>
        <hr className="my-2 border-white sm:mx-auto dark:border-white-700" />
        {/* copy right */}
        <p className="text-center">&copy; {new Date().getFullYear()} Monument Books. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
