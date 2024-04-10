import React, { useEffect, useState } from "react";
import { Button, Card, InputNumber, Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setBookById } from "../../redux/slices/BookSlice";
import BookService from "../../redux/service/BookService";
import CartService from "../../redux/service/CartService";
import { useNavigate } from "react-router-dom";
const CartPopup = ({ visible, confirmLoading, cartId, onOk, onCancel }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [prices, setPrices] = useState(0);
  const [qtys, setQtys] = useState(0);
  const navigate = useNavigate();
  const resBook = useSelector((state) => state.book.bookbyId);
  const token = localStorage.getItem("token")
  console.log("resBook", resBook);
  const dispatch = useDispatch();
  const handleGetBook = () => {
    BookService.getBookById(cartId)
      .then((res) => {
        dispatch(setBookById(res.data));
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const Data = resBook.map((resItem) => ({
    title: resItem.title,
    Author: resItem.author.map((resAuthor) => {
      resAuthor.name;
    }),
    price: resItem.price,
    category: resItem.categories,
    Publisher: resItem.publisher,
    PublisherDate: resItem.publishDate,
    ISBN: resItem.isbn,
    cover: resItem.coverImg,
    qty: resItem.qty,
    description: resItem.description,
  }));
  const onChange = (value) => {
    console.log("changed", value);
    setQtys(value); // Update quantity state
    const totalPrice = Data.reduce((acc, dt) => acc + dt.price * value, 0); // Recalculate subtotal
    setPrices(totalPrice);
  };
  useEffect(() => {

    if (resBook.length > 0) {
      const initialPrice = resBook[0].price;
      setPrices(initialPrice);

    }
  }, [resBook]);
  useEffect(() => {
    if (visible) {
      // If the modal becomes visible, call handleGetBook
      setModalVisible(true);
      handleGetBook();
    } else {
      // Reset the quantity input when the modal is closed
      setQtys(1);
    }
  }, [visible, cartId]);
  const handleBuy = () => {
    // const data = [
    //   {
    //     qty: qtys,
    //     productId: id,
    //   },
    // ];
    // console.log(data);
    // BookService.buyservice(data).then((res) => {
    //   console.log(res);
    // });
  };
  const handleCancel = () => {
    // Reset the quantity input
    setQtys(1);
    onCancel();
  };

  const handleOk = () => {
    const data = {
      qty: qtys,
      bookId: cartId
    }
    if (token) {
      CartService.AddCart(data).then((res) => {
        console.log(res);
        !res.status ? message.error("Add Cart false! this book aleady added") : (message.success("Add Cart successful"), onOk());
      }).catch((e) => {
        console.log(e);
      })
      setQtys(1);
    }else{
      navigate(`/sign-in`);
    }
  };
  return (
    <Modal
      title="Add to Cart"
      visible={visible}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      centered // Center the modal vertically
      width={1000}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="buy" style={{ backgroundColor: '#1890ff', borderColor: '#1890ff', color: 'white' }} onClick={handleOk}>
          Add To Cart
        </Button>,
      ]}
    >
      <div>
        <div className="grid md:grid-cols-8 sm:grid-cols-1">
          <div className="mt-10 col-span-2">
            <div className="mt-5 ms-8 ">
              {Data.map((dt, index) => (
                <div key={index}>
                  <img src={dt.cover} alt={`Image ${index}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 col-span-4">
            <div className="mt-5 ms-8 ">
              {Data.map((dt) => (
                <div key={dt.id}>
                  <p className="text-md line-clamp-1">{dt.title}</p>
                  {dt.category.map((rescategory) => (
                    // eslint-disable-next-line react/jsx-key
                    <p className="bg-yellow-600 text-white p-1 w-fit px-5">
                      {rescategory.name}
                    </p>
                  ))}
                  {/* <p className="ml-5 line-clamp-2 text-sm">{dt.description}</p> */}
                  <p className="text-lg text-green-700">
                    {dt.price} <span>$</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 col-span-2 bg-gray-50 px-3">
            <div className="mt-5">
              {Data.map((dt) => (
                <>
                  <div className="flex justify-between items-center mt-10 ">
                    <InputNumber
                      min={1}
                      max={2000}
                      type="number"
                      value={qtys}
                      onChange={onChange}
                      className="mt-3 px-2 py-1"
                    />
                    <p className="ml-5">
                      <span>In stock </span>
                      {dt.qty}
                    </p>
                  </div>
                  <div className="flex justify-between pt-5">
                    <p className="w-[50%]">Total </p>
                    <p className="text-end  w-[50%]">
                      <span>$ </span>
                      {prices}
                    </p>
                    <hr />
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CartPopup;
