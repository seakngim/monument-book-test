import React, { Fragment } from "react";
import { Card, Col, Row, Table } from "antd";
import { HiOutlineCurrencyDollar, HiOutlineShoppingBag, HiOutlineUser, HiOutlineUserGroup, } from "react-icons/hi";
import { Column, Line } from "@ant-design/plots";

const ListAdminComponent = () => {
  let dataSource = [];


  // columns for table
  const columns = [
    {
      title: "No",
      dataIndex: "id",
      width: "15%",
      align: "center",
      fixed: "left",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      width: "20%",
      align: "center",
    },
    {
      title: "Book Name",
      dataIndex: "title",
      align: "center",
      width: "30%",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "40%",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "center",
      width: "20%",
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
      align: "center",
      width: "20%",
    },
    {
      title: "Author",
      dataIndex: "authorId",
      align: "center",
      width: "25%",
    },
    {
      title: "Vendor",
      dataIndex: "vender",
      align: "center",
      width: "20%",

    },
    {
      title: "Quantity",
      dataIndex: "pty",
      align: "center",
      width: "20%",

    },
    {
      title: "Cost",
      dataIndex: "cost",
      align: "center",
      width: "20%",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      width: "20%",
      align: "center",
      fixed: "right",
    },
  ];


  const cardItems = [
    {
      id: 1,
      title: "Today's Sale",
      value: "$ 24,035",
      icon: <HiOutlineCurrencyDollar size={20} />,
    },
    {
      id: 2,
      title: "Today's Users",
      value: "3,700",
      icon: <HiOutlineUserGroup size={20} />,
    },
    {
      id: 3,
      title: "New Clients",
      value: "+100",
      icon: <HiOutlineUser size={20} />,
    },
    {
      id: 4,
      title: "New Orders",
      value: "$13,200",
      icon: <HiOutlineShoppingBag size={20} />,
    },

  ]

  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    // style: { width: '50%' },
  };

  return (
    <Fragment>
      {/* card */}
      <Row className="w-full grid gap-y-4 gap-x-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 xl:gap-x-4">
        {cardItems.map((card) => (
          <Col className='relative shadow-lg'>
            <Card hoverable bordered={false} key={card.id}>
              <h6 className="text-sm">{card.title}</h6>
              <h3 className="text-xl text-[#292D77] font-bold">{card.value}</h3>
              <div className='absolute top-7 right-4 bg-[#EEF4F9] fs-1 p-3 rounded-lg text-[#292D77]'>{card.icon}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      {/* plots */}
      <Row className="w-full my-3 sm:my-5 grid gap-y-4 gap-x-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <Col span={24} className="py-5 shadow-lg rounded-lg ">
          <div className="h-24 flex" >
            <span className="block px-4">
              <h3 className="font-bold text-xl text-[#292D77]">Sales Overview</h3>
              <p className="text-sm">than last year</p>
            </span>
            <span className="block px-5 text-[#292D77]">
              Color: <span className="font-medium">Blue</span>
            </span>
          </div>
          <Line {...config} className="flex items-end" />
        </Col>
        <Col span={24} className="shadow-lg py-5 rounded-lg">
          <div className="mt-2 h-24">
            <span className="block px-4">
              <h3 className="font-bold text-xl text-[#292D77]">Active User</h3>
              <p className="text-sm">than last week</p>
              {/* <p className="mt-2">We have created multiple options for you to put together and customise into pixel perfect pages.</p> */}
            </span>
          </div>
          <div className="flex items-end">
            <Column {...config} />
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ListAdminComponent;
// pagination={{ pageSize: 10, total: 100, showSizeChanger: true }}
