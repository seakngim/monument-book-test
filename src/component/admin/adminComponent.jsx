import React from "react";
import { Link, Outlet } from "react-router-dom";
import SiderBarComponent from "./siderBarComponent";
import { Layout } from "antd";
import logo from "../../assets/images/Monument Book logo.png"
const AdminComponent = () => {
  return (
    <>
      <div className="bg-[#292D77] z-40 mb-5 sticky top-0 shadow-lg">
        <Link to="/">
          <div className="flex ml-6 py-4 items-center text-white">
            <img className="w-12 mr-5" src={logo} alt="logo" />
            Monument Books & Toys
          </div>
        </Link>
      </div>
      <Layout className="max-w-full ">
        <SiderBarComponent />
        <Layout className="bg-white px-5">
          <Outlet />
        </Layout>
      </Layout>
    </>
  );
};

export default AdminComponent;
