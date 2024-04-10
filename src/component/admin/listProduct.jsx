import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Button, Form, Modal, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import Search from "antd/es/input/Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BookService from "../../redux/service/BookService";
import { useDispatch, useSelector } from "react-redux";
import { setAllBook, setAllImport } from "../../redux/slices/BookSlice";
import { HiEye } from "react-icons/hi";

const ListProduct = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [views, setViews] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const resAllBook = useSelector((state) => state.book.allBook);
  const pageSize = 120;
  // get all import book
  const getAllBookService = async () => {
    try {
      const response = await BookService.getAllBook(1, pageSize);
      console.log(response.data);
      dispatch(setAllBook(response.data));
    } catch (error) {
      console.log(error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  };

  const { data, setbookdit, setData } = props;
  const dataSource = resAllBook.map((item, index) => ({
    no: index + 1,
    key: item.id,
    publishDate: item.publishDate,
    isbn: item.isbn,
    price: item.price,
    title: item.title,
    description: item.description,
    publisher: item.publisher,
    author: item.author,
    category: item.categories,
    pty: item.qty,
  }));

  const onCreate = () => {
    setOpen(false);
  };

  if (data) {
    dataSource.push(data);
  }

  const viewDetails = (code) => {
    let values = dataSource.filter((id) => id.code === code);
    if (values) {
      setViews(values);
    }
  };

  // const onUpdate = () => {
  //   let values = dataSource;
  //   if (values) {
  //     setbookdit(values);
  //   }
  // };

  // columns for table
  const columns = [
    {
      title: "No",
      dataIndex: "no",
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
      width: "50%",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "60%",
      render: (description) => (
        <div
          style={{
            whiteSpace: "pre-wrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "center",
      width: "40%",
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
      align: "center",
      width: "20%",
    },
    {
      title: "Publish Date",
      dataIndex: "publishDate",
      align: "center",
      width: "30%",
    },
    {
      title: "Author",
      dataIndex: "author",
      align: "center",
      width: "25%",
      render: (authors) => (
        <>
          {authors.map((author) => {
            let color = author.length > 5 ? "geekblue" : "green";
            return (
              <Tag color={color} key={author}>
                {author.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "pty",
      align: "center",
      width: "20%",
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "20%",
      render: (categories) => (
        <>
          {categories.map((category) => {
            let color = category.length > 5 ? "geekblue" : "green";
            return (
              <Tag color={color} key={category}>
                {category.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      width: "30%",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Link to={`/book/view/${record.key}`}>
            <HiEye className="h-8 w-8 bg-white rounded px-1 py-2 text-[#292D77]" />
          </Link>
          <Link
            to={`/dashboard/edit/${record.key}`}
            onClick={() => console.log("Record data:", record)}
          >
            <EditOutlined
              style={{ color: "##292D77" }}
            // onClick={() => onUpdate(record)}
            />
          </Link>
          <DeleteOutlined
            onClick={() => {
              onDeleteProduct(record.key);
            }}
            style={{ color: "red" }}
          />
        </Space>
      ),
    },
  ];
  useEffect(() => {
    getAllBookService();
  }, []);
  const onDeleteProduct = (code) => {
    Modal.confirm({
      title: " Are you sure you want to delete this book record?",
      onOk: () => {
        BookService.delProduct(code).then(() => {
          getAllBookService();
        });
        console.log(code);
      },
    });
  };

  return (
    <div className="shadow-lg rounded-lg">
      <Form
        style={{
          padding: 10,
          paddingLeft: 10,
          paddingRight: 10,
          marginBottom: 10,
          borderRadius: "5px",
          background: "#ffffff",
        }}
      >
        <Space style={{ justifyContent: "space-between", display: "flex" }}>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
          // onSearch={onChange}
          />
          <Button
            block
            onClick={() =>
              navigate("/dashboard/createNew", {
                state: { previousPath: pathname },
              })
            }
            icon={<PlusSquareOutlined fill="#000" />}
            style={{ border: 0, backgroundColor: "#3A53A4", color: "#fff" }}
          >
            Create New
          </Button>
        </Space>

      </Form>
      <div
        style={{
          padding: 10,
          paddingBottom: 20,
          borderRadius: "5px",
          background: "#fff",
        }}
      >
        {/* table */}
        <div className="py-2 rounded-lg">
          <Table
            bordered
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: 1500, y: 600 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
