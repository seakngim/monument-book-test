import { Card, message } from "antd";
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { HiEye, HiHeart, HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import CartPopup from "../../popup/CartPopup";
import BookmarkService from "../../../redux/service/BookMarkService";

const CardProductComponent = (props) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [cartId, setcartId] = useState();
  const showModal = (id) => {
    setOpen(true);
    setcartId(id);
  };

  const handleOk = () => {
    setcartId("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 200);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const handleAddToFav = () => {
    // Implement the logic to add the product to the cart
    console.log("Product added to cart:", props.id);
    const bookId =props.id;
    BookmarkService.AddBookmark(bookId).then((res)=>{
      console.log(res,"res")
      if(res.status == false){
        message.error("Cart entry already exists")
      }else{
        message.success("Cart Add already")
      }
    });
  };
  return (
    <>
      <Card
        className="mt-8 border-0 card-hover shadow-lg"
        hoverable
        cover={
          <div className="image relative">
            <div className="overlay-img bg-[#EEF4F9] flex justify-center">
              <img
                alt="example"
                src={props.image}
                className="px-14 lg:px-4 md:px-8 py-4 card-image h-64"
              />
            </div>
            <div className="icon-container flex gap-2 absolute">
              <Link to="">
                <HiHeart className="h-8 w-8 bg-white rounded px-1 py-2 text-[#292D77]"  onClick={handleAddToFav} />
              </Link>
              <Link to={`/book/view/${props.id}`}>
                <HiEye className="h-8 w-8 bg-white rounded px-1 py-2 text-[#292D77]" />
              </Link>
              <Link to="">
                <HiOutlineShoppingCart
                  className="h-8 w-8 bg-white rounded px-1 py-2 text-[#292D77]"
                  onClick={() => showModal(props.id)}
                />
              </Link>
            </div>
          </div>
        }
      >
        <p className="text-lg text-gray-700 font-bold line-clamp-1">
          {props.title}
        </p>
        <p className="text-base text-gray-500  line-clamp-1 pt-2">
          {props.description}
        </p>
        <p className="text-[#292D77] text-2xl font-bold py-2">
          $ {props.price}
        </p>
        <Link to={`/checkout/${props.id}`}>
          <div
            key="buy-order-now"
            className="flex justify-center bg-blue-800 p-2 my-1"
          >
            <div className="text-white flex font-bold text-base">
              <FaCartPlus className="mr-2" style={{ fontSize: "24px" }} /> Buy
              Now
            </div>
          </div>
        </Link>
      </Card>
      <CartPopup
        visible={open}
        confirmLoading={confirmLoading}
        cartId={cartId}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
};

export default CardProductComponent;
