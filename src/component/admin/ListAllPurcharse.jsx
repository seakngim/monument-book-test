import React, { useEffect, useState } from "react";
import {
  Button,
  Space,
  Table,
  Popconfirm,
  Modal,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import BookService from "../../redux/service/BookService";
import { useSelector, useDispatch } from "react-redux";
import { setAllImport } from "../../redux/slices/BookSlice";

import AddPurchaseComponent from "./AddPurchaseComponent";
import { Link } from "react-router-dom";

const ListAllPurcharse = () => {

  const dispatch = useDispatch();
  const rdata = useSelector((state) => state.book.bookImport);
  console.log(rdata, "rdata");

  const handlegetAllPurchase = () => {
    BookService.getPurchase(1, 500).then((res) => {
      dispatch(setAllImport(res.data));
    });
  };

  const dataSource = rdata.slice().reverse().map((item, index) => ({
    index: index+1,
    key: item.id,
    supplier: item.supplier.name,
    book: item.book.title,
    price: item.cost,
    qty: item.qty,
    date: item.date,
    tax: `${item.tax} %`,
  }));

  // const handleEdit = (record) => {
  //   setFormValue(record);
  // };





  const columns = [
    {
      title: "No",
      dataIndex: "index",
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
    },
    {
      title: "Book",
      dataIndex: "book",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "TAX",
      dataIndex: "tax",
    },
    {
      title: "QTY",
      dataIndex: "qty",
    },
    {
      title: "DATE",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "date",
      render: (_, record) => (
        <Space size="middle">
          {dataSource.length >= 1 ? (
            <a onClick={() => handleEdit(record)}>
              <EditOutlined />
            </a>
          ) : null}
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record)}
          >
            <a>
              <DeleteOutlined />
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    handlegetAllPurchase();
  }, []);



  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
    handlegetAllPurchase();
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);

  };

  return (
    <>
      <div className="shadow-lg ">
        <div className="grid grid-cols-2 px-10">
          <p className="text-2xl">LIST ALL PURCHASE</p>
          <div className="flex justify-end">
            <Link to={"/dashboard/add-purchase"}><Button className="w-fit"  >Add New purchase</Button></Link>
            {/* <Button type="default" onClick={showModal}>
              Add New Purcharse
            </Button> */}
          </div>
        </div>
        <div className="p-5">
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
      <Modal
  
        open={open}
        width={800}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <AddPurchaseComponent
              onOpen = {handleOk}
          />
        </div>
      </Modal>
    </>
  );
};

export default ListAllPurcharse;
