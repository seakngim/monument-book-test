import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { Button, Menu, theme } from "antd";
import { RiFileListLine, RiMenuAddLine, RiUserSettingsLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const SiderBarComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div className=" bg-white">
      <div className="flex justify-end px-1 mb-2">
        <Button
          className="bg-[#292D77] hover:text-[#292D77] flex items-center text-gray-50 "
          onClick={toggleCollapsed}

        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: colorBgContainer }}
        className="shadow-lg h-screen"
      >

        <Menu
          // onClick={onClick}
          style={{ borderRight: 'none', }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={[
            {
              key: '1',
              icon: <RiUserSettingsLine />,
              label: <Link to="">Admin Dashboard</Link>,
            },
            {
              key: '2',
              label: "Books",
              children: [
                {
                  key: '21',
                  icon: <RiFileListLine />,
                  label: <Link to="list">List Books</Link>,
                },
                {
                  key: '22',
                  icon: <RiMenuAddLine />,
                  label: <Link to="createNew">Create New Book</Link>,
                }
              ],
            },
            {
              key: '3',
              icon: <RiMenuAddLine />,
              label: <Link to="author">Author</Link>,
              children: [
                {
                  key: '31',
                  icon: <RiFileListLine />,
                  label: <Link to="author-list">List Author</Link>,
                },
                {
                  key: '32',
                  icon: <RiMenuAddLine />,
                  label: <Link to="author">Create Author</Link>,
                }
              ],
            },
            {
              key: '4',
              icon: <RiMenuAddLine />,
              label: <Link to="categorise">Category</Link>,
              children: [
                {
                  key: '41',
                  icon: <RiFileListLine />,
                  label: <Link to="category-list">List Category</Link>,
                },
                {
                  key: '42',
                  icon: <RiMenuAddLine />,
                  label: <Link to="categorise">Create Category</Link>,
                }
              ],
            },
            {
              key: '5',
              icon: <RiMenuAddLine />,
              label: <Link to="categorise">Supplier</Link>,
              children: [
                {
                  key: '51',
                  icon: <RiFileListLine />,
                  label: <Link to="list-supplier">List Supplier</Link>,
                },
                {
                  key: '52',
                  icon: <RiMenuAddLine />,
                  label: <Link to="supplier">Create Supplier</Link>,
                }
              ],
            },
            {
              key: '6',
              icon: <RiMenuAddLine />,
              label: <Link to="categorise">Purchase</Link>,
              children: [
                {
                  key: '61',
                  icon: <RiFileListLine />,
                  label: <Link to="list-purchase">List Purchase</Link>,
                },
                {
                  key: '62',
                  icon: <RiMenuAddLine />,
                  label: <Link to="purchase">Create Purchase</Link>,
                }
              ],
            },
            {
              key: '7',
              icon: <RiMenuAddLine />,
              label: <Link to="import">Import Book</Link>,
            },
            {
              label: "HomePage",
              children: [
                {
                  key: "71",
                  label: <Link to="booksOfTheWeek">Books of The Week</Link>,
                },
                {
                  key: "72",
                  label: <Link to="bestSellingBooks">Best Selling Books</Link>,
                },
                {
                  key: "73",
                  label: <Link to="newArrivals">New Arrivals</Link>,
                },
                {
                  key: "74",
                  label: <Link to="featureAuthor">Feature Author</Link>,
                },
                {
                  key: "75",
                  label: <Link to="ourActivities">Our Activities</Link>,
                }
              ],
            },
          ]}
        />
      </Sider>

    </div>
  )
}

export default SiderBarComponent;
