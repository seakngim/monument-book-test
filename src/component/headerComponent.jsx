import React, { useState } from "react";
import { Popover } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/MBLogo.png";
import Sidebar from "./SideBarComponent";
import { FiHeart, FiLogOut, FiShoppingBag, FiUser } from "react-icons/fi";
import { HiOutlineMenu, HiOutlineShoppingCart, HiSearch } from "react-icons/hi";
import { Dropdown, Form, Input, Menu, Modal } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import SearchService from "../redux/service/SearchSevice";
import { useDispatch } from "react-redux";
import { setAllBook } from "../redux/slices/BookSlice";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = [
    {
      label: <Link to="/"> Home </Link>,
      key: "home",
    },
    {
      label: <Link to="/book"> Books </Link>,
      key: "book",
    },
    {
      label: <Link to="/category">Category</Link>,
      key: "category",
    },
    {
      label: <Link to="/about-us">About Us</Link>,
      key: "about-us",
    },
    {
      label: <Link to="/contact">Contact Us </Link>,
      key: "contact",
    },
  ];
  // const [current, setCurrent] = useState("function");
  const onFinish = (values) => {
    // Handle the search logic here
    console.log("Search:", values);
  };
  // const onClick = (e) => {
  //   console.log("click ", e);
  //   setCurrent(e.key);
  // };

  const [current, setCurrent] = useState(...items);
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(current);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    localStorage.clear();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(localStorage.getItem("user_role"), "localStoragee");
  const onChange = (value, _e, info) => {
    console.log(info?.source, value);
    SearchService.getAllSearch(value).then((res) => {
      console.log(res);
      dispatch(setAllBook(res));
      navigate(`/book/${"search?p=" + value}`);
    });
  };
  return (
    <Popover className="bg-white shadow-md sticky top-0 z-10 max-w-full text-white ">
      <div className="flex justify-between gap-5 items-center w-[80%] m-auto h-20">
        <Link className="flex-none" to="/">
          <img className="py-3 object-cover h-20" src={logo} alt="logo" />
        </Link>
        <Menu
          className="grow lg:flex hidden"
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          // style={{ backgroundColor: current ? 'blue' : 'red' }}
        />
        <div className="flex items-center justify-end py-5 gap-5 ">
          <Search
            className="hidden lg:block"
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onChange}
          />

          {localStorage.getItem("token") ? (
            <Dropdown
              menu={{
                items: [
                  {
                    label: <Link to="/profile"> Profile </Link>,
                    key: "1",
                    icon: (
                      <FiUser style={{ fontSize: "16px", color: "#292D77" }} />
                    ),
                  },
                  {
                    type: "divider",
                  },
                  {
                    label: <Link to="/cart">Cart</Link>,
                    key: "2",
                    icon: (
                      <HiOutlineShoppingCart
                        style={{ fontSize: "16px", color: "#292D77" }}
                      />
                    ),
                  },
                  {
                    type: "divider",
                  },
                  {
                    label: <Link to="/order">Order</Link>,
                    key: "3",
                    icon: (
                      <FiShoppingBag
                        style={{ fontSize: "16px", color: "#292D77" }}
                      />
                    ),
                  },
                  {
                    type: "divider",
                  },
                  {
                    label: <Link to="/favorite">Favorite</Link>,
                    key: "4",
                    icon: (
                      <FiHeart style={{ fontSize: "16px", color: "#292D77" }} />
                    ),
                  },
                  {
                    type: "divider",
                  },
                  {
                    label: (
                      <>
                        <p type="primary" onClick={showModal}>
                          Sign out
                        </p>
                      </>
                    ),
                    key: "2",
                    icon: (
                      <FiLogOut
                        style={{ fontSize: "16px", color: "#292D77" }}
                      />
                    ),
                  },
                ],
              }}
              placement="bottomRight"
              arrow={{
                pointAtCenter: true,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <AppstoreOutlined
                  style={{ fontSize: "20px", color: "#292D77" }}
                />
              </a>
            </Dropdown>
          ) : (
            <div className="flex text-[#292D77] gap-2 ">
              <Link to="dashboard">
                <button className="w-24 py-2 font-bold text-[#292D77] hover:text-gray-50 duration-300 hover:bg-[#292D77] hover:border rounded-lg border border-white">
                  Sign in
                </button>
              </Link>
              <Link to="/sign-up">
                <button className="w-24 py-2 font-bold text-[#292D77] hover:text-gray-50 duration-300 hover:bg-[#292D77] border border-[#292D77] rounded-lg">
                  Sign up
                </button>
              </Link>
            </div>
          )}

          <Popover.Button className="lg:hidden inline-flex items-center rounded-md focus:outline-none ">
            <HiOutlineMenu className="h-6 w-6 text-[#292D77] outline-none border-none" />
          </Popover.Button>

          {localStorage.getItem("token") &&
          localStorage.getItem("user_role") == "ADMIN" ? (
            <>
              <Link to="/dashboard"><p className="text-[#292d77] border-collapse border py-2 px-4 rounded-md hover:bg-[#292d77]  duration-500 hover:text-gray-50">Dashboard</p></Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="pb-3 w-[80%] m-auto">
        <Search
          className="flex lg:hidden"
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onChange}
        />
      </div>
      <Sidebar />
      <Modal
        title="LOG OUT"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <button
            key="cancel"
            className="border border-[#292D77] text-[#292D77] px-5 py-1 rounded-md hover:bg-[#292D77] hover:text-gray-50 duration-500 mr-2"
            onClick={handleCancel}
          >
            Cancel
          </button>,
          <button
            key="ok"
            className="border border-red-500 bg-red-500 text-red-50 px-5 py-1 rounded-md hover:bg-red-600 duration-500"
            onClick={handleOk}
          >
            Ok
          </button>,
        ]}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </Popover>
  );
};

export default HeaderComponent;
