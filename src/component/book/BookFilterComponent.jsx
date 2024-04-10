import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Dropdown, Pagination } from "antd";
import { Link } from "react-router-dom";
import BookService from "../../redux/service/BookService";
import { useDispatch, useSelector } from "react-redux";
import { setAllBook } from "../../redux/slices/BookSlice";
import CartPopup from "../popup/CartPopup";
import CardProductComponent from "../category/component/CardProductComponent";

const BookFilterComponent = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [cartId, setcartId] = useState();

  const dispatch = useDispatch();
  const resAllBook = useSelector((state) => state.book.allBook);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 120;
//   const getAllBookService = async (page) => {
//     try {
//       const response = await BookService.getAllBook(1, pageSize);
//       dispatch(setAllBook(response.data));
//     } catch (error) {
//       // Handle the error as needed (e.g., show an error message to the user)
//     }
//   };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // getAllBookService(page);
  };

  const Data = resAllBook.map((res) => ({
    id: res.id,
    src: res.coverImg,
    price: res.price,
    title: res.title,
    description: res.description,
  }));

  const items = [
    {
      key: "1",
      label: <Link>1st menu item</Link>,
    },
    {
      key: "2",
      label: <Link>1st menu item</Link>,
    },
    {
      key: "3",
      label: <Link>1st menu item</Link>,
    },
  ];
  useEffect(() => {
    // getAllBookService(currentPage);
  }, [currentPage]);

  const handleOk = () => {
    setcartId("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 200);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className="max-w-[80%] m-auto w-full">
      <Breadcrumb
        className='pt-5 pb-3'
        items={[
          {
            title: (
              <Link to="/" className="text-black me-5">
                Home
              </Link>
            ),
          },
          {
            title: <p className="text-[#292D77] ">Books</p>,
          },
        ]}
      />
      <div className="flex text-left border-b pb-3 border-gray-400">
        <p className="text-lg font-bold text-[#292D77] dark:text-[#292D77]">
          All Books
        </p>
      </div>
      <div>
        <div>
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {Data &&
              Data.map((item) => (
                <CardProductComponent
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.src}
                  description={item.description}
                  price={item.price}
                />
              ))}
          </div>
          <CartPopup
            visible={open}
            confirmLoading={confirmLoading}
            cartId={cartId}
            onOk={handleOk}
            onCancel={handleCancel}
          />
          <div className="justify-center flex p-3">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              // total={totalBooks} // Use the length of the fetched data for total
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookFilterComponent;
