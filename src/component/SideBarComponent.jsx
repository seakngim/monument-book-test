import React, { Fragment, useState } from "react";
import { Transition, Popover } from "@headlessui/react";
import logo from "../assets/images/MBLogo.png";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { items } from "./DataComponent";
import { Menu } from "antd";

const Sidebar = () => {
  const [current, setCurrent] = useState("function");
  
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Transition
      as={Fragment}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        className="absolute z-40 inset-x-0 top-0 px-2 pb-5 origin-top-right transform transition lg:hidden divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 "
      >
        <section className="flex justify-between">
          <img className="p-2 pt-5 object-cover h-20" src={logo} alt="logo" />
          <Popover.Button className="focus:outline-none hover:bg-white">
            <HiX className="h-6 w-6 text-[#292D77] hover:text-[#333333]  outline-none border-none" />
          </Popover.Button>
        </section>
        <Menu
            className="items-center text-center font-medium text-[#292D77]"
            onClick={onClick}
            selectedKeys={[current]}
            mode="inline"
            items={items}
          />
          {Navigation.auth?.map((auth) => (
            <Link
              key={auth?.id}
              to={auth?.link}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#292D77] hober:bg-[#292D77] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              {auth?.name}
            </Link>
          ))}
      </Popover.Panel>
    </Transition>
  );
};

export default Sidebar;
