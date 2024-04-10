import {
  FaCartArrowDown,
  FaCartPlus,
  FaHeart,
  FaDollarSign,
} from "react-icons/fa6";
import React, { useState } from "react";
import { Card, message } from "antd";
import CartPopup from "../../popup/CartPopup";
import { Link } from "react-router-dom";
import BookmarkService from "../../../redux/service/BookMarkService";

export default function CardComponent(props) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [cartId, setcartId] = useState();
  const handleAddToCart = () => {
    // Implement the logic to add the product to the cart
    console.log("Product added to cart:", props.id);
    setOpen(true);
    setcartId(props.id);
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
  const handleView = () => {
    // Implement the logic to add the product to the cart
    console.log("Product added to cart:", props.id);
    const bookId =props.id;
    BookmarkService.AddBookmark(bookId).then(()=>{
      message.success("Added success!");
    });
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
  return (
    <div className="w-[18%] shadow-md bg-white rounded-lg hover:shadow-lg dark:bg-white hover:opacity-90 transition duration-500">
      
      <Card
        className="relative"
        cover={
          <Link to={`/book/view/${props.id}`}  style={{
            height: 340,
            padding: 20,
          }}>
          <img
           
            alt="card-cover"
            src={props.image}
          />
          </Link>
        }
        // onClick={handleView}
        actions={[
          // eslint-disable-next-line react/jsx-key
          <div className="bg-white absolute inset-x-0 bottom-2">
            <div
              key="buy-order-now"
              className="flex justify-center bg-blue-800 p-2 my-1"
            >
              <Link to={`/checkout/${props.id}`}>
                <div className="text-white flex font-bold text-base text-center">
                  <FaCartPlus className="mr-2" style={{ fontSize: "24px" }} />{" "}
                  Buy Now
                </div>
              </Link>
            </div>
            <div
              key="favorite-cart"
              className="flex justify-between bg-white px-1"
            >
              <div className="text-red-600 border justify-center text-center flex font-bold py-2 w-[40%] text-base "
              onClick={handleAddToFav}
              >
                <FaHeart className="mr-2" style={{ fontSize: "24px" }} />{" "}
                Favorite
              </div>
              <div
                className="text-orange-600 justify-center text-center border py-2 w-[40%] flex font-bold text-base ml-5"
                onClick={handleAddToCart}
              >
                <FaCartArrowDown
                  className="mr-2"
                  style={{ fontSize: "24px" }}
                />{" "}
                Cart
              </div>
            </div>
          </div>,
        ]}
      >
          <Link to={`/book/view/${props.id}`}  style={{
            height: 340,
            padding: 20,
          }}>
        <div className="absolute inset-x-0 bottom-10 bg-gray-200 h-[45%] opacity-80 z-0"></div>
        <div className="absolute inset-x-0 bottom-28 z-0">
          <h5 className="mb-2 mt-5 px-5 text-md tracking-widest font-bold text-[#252835] uppercase line-clamp-1">
            {props.title}
          </h5>
          <p className="h-12 font-normal px-5 grid-flow-row  text-black line-clamp-2">
            {props.description}
          </p>
          <div className="text-blue-600 justify-end text-right flex font-bold px-5 w-full text-xl items-center">
            <FaDollarSign className="mr-2" style={{ fontSize: "20px" }} />{" "}
            {props.price}
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
    </div>
  );
}
