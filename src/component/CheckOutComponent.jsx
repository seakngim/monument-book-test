import {
  Breadcrumb,
  Button,
  Card,
  InputNumber,
  QRCode,
  Statistic,
  message,
  theme,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import BookService from "../redux/service/BookService";
import { useDispatch, useSelector } from "react-redux";
import { setBookById } from "../redux/slices/BookSlice";
import UserProfileService from "../redux/service/UserProfileService";

const CheckOutComponent = () => {
  const { useToken } = theme;
  const { id } = useParams();
  const isInitialMount = useRef(true);
  const dispatch = useDispatch();
  const resBook = useSelector((state) => state.book.bookbyId);
  console.log(resBook[0]);
  const [prices, setPrices] = useState(0);
  const [qtys, setQtys] = useState();
  const handleGetBook = () => {
    BookService.getBookById(id).then((res) => {
      dispatch(setBookById(res.data));
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
  const token = localStorage.getItem("token");
  const onChange = (value) => {

    if (value === 0) {
      message.error("Please enter a quantity greater than 0");
      setQtys(5);
    } else {
      console.log("changed", value);
      setQtys(value); // Update quantity state
      const totalPrice = Data.reduce((acc, dt) => acc + dt.price * value, 0); // Recalculate subtotal
      setPrices(totalPrice);
    }
  };
  useEffect(() => {
    handleGetBook();
  }, []);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log("Navigated to checkout for book ID:", id);
    }
  }, [id]);

  useEffect(() => {

    if (resBook.length > 0) {
      const initialPrice = resBook[0].price;
      setPrices(initialPrice);
    }
  }, [resBook]);
  const handleBuy = () => {
    const data = [
      {
        qty: qtys,
        productId: id,
      },
    ];
    
    // UserProfileService.getUserProfile().then((res)=>{
    //   console.log(res.data.creditCard)
    //   if(res.data.creditCard == null){
          
    //   }
    // })
    //  BookService.PurchaseCheckout(data).then((res) => {
    //   console.log(res);
    //   if (res.status == false) {
    //     message.error("Unvailable quantity");
    //   } else {
    //     message.success("Purchase successful");
    //   }
    // });
  };


  return (
    <>
      <div className="w-[80%] m-auto">
        <Breadcrumb
          className='pt-5 pb-3'
          items={[
            {
              title: (
                <Link to="/">
                  <p>Home</p>
                </Link>
              ),
            },
            {
              title: (
                <Link to="/book">
                  <p>Book</p>
                </Link>
              ),
            },
            {
              title: <p className="text-blue-800">Check Out</p>,
            },
          ]}
        />
        <div className="border-b-2 border-gray-400">
          <div className="mb-3 font-bold">Check Out</div>
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="col-span-2 grid md:grid-cols-4 sm:grid-cols-1">
            <div className="my-10 col-span-1">
              <div className="ms-8 ">
                {Data.map((dt, index) => (
                  <div key={index}>
                    <img src={dt.cover} alt={`Image ${index}`} />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 col-span-2">
              <div className="mt-5 ms-8">
                {Data.map((dt) => (
                  <div key={dt.id}>
                    <p className="text-lg mb-4 line-clamp-1 ">{dt.title}</p>
                    {dt.category.map((rescategory) => (
                      // eslint-disable-next-line react/jsx-key
                      <p className="bg-yellow-600 text-white p-1 w-fit px-5 mb-4">
                        {rescategory.name}
                      </p>
                    ))}
                    {/* <p className="ml-5 line-clamp-2 text-sm">{dt.description}</p> */}
                    <p className="text-xl text-[#2BD7AD] font-bold">
                      {dt.price} <span>$</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 col-span-1">
              <div className="mt-5 ms-8">
                {Data.map((dt) => (
                  <>
                    <div className="flex justify-end items-center ">
                      <InputNumber
                        min={1}
                        max={dt.qty}
                        type="number"
                        defaultValue={1}
                        onChange={onChange}
                        className="mt-3 px-2 py-1"
                      />
                      <p className=" ml-5">
                        <span>In stock </span>
                        {dt.qty}
                      </p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1  m-10">
            <Card
              title="Order summary"
              bordered={false}
              style={{
                width: 300,
                backgroundColor: "#f7f8fa",
              }}
            >
              <div className="flex justify-between">
                <p className="w-[50%]">Subtotal </p>
                <p className="text-end  w-[50%]">
                  <span>$ </span>
                  {prices}
                </p>
                <hr />
              </div>
              <div className="flex justify-between">
                <p className="w-[50%]">delivery </p>
                <p className="text-end  w-[50%]">free</p>
                <hr></hr>
              </div>
              <div className="flex justify-between">
                <p className="w-[50%]">TAX </p>
                <p className="text-end  w-[50%]">10%</p>
                <hr></hr>
              </div>
              <div className="border py-2 px-5 flex justify-between">
                <p className="w-[50%]">AMOUNT </p>
                <p className="text-end  w-[50%]">
                  <span>$ </span>
                  {prices + prices / 10}
                </p>
                <hr></hr>
              </div>
              <div className="flex justify-end mt-5">
                <Button className="flex border justify-end bg-blue-700 text-white">
                  {token ? (
                    <button onClick={handleBuy}>Proceed to Checkout</button>
                  ) : (
                    <Link to="/sign-in">Proceed to Checkout</Link>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutComponent;
