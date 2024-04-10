import { Breadcrumb, Button } from 'antd'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/images/Books Cover/Animal_Farm_Cover.jpg";
import OrderService from '../redux/service/OrderService';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUserOrder } from '../redux/slices/MyOrderSlice';

const OrderComponent = () => {
    const dispatch = useDispatch();
    const resOrder = useSelector((state) => state.orther.allUserOrder);
   
    // handle get order
    const handleGetOrder=()=>{
        OrderService.getAllOrder(1,10).then((res)=>{
            console.log(res);
            dispatch(setAllUserOrder(res.data));
        })
    }  
    console.log(resOrder,"resOrder");
    useEffect(()=>{
        handleGetOrder();
    },[])
    return (
        <section>
            <div className="max-w-full w-[80%] mx-auto">
                <Breadcrumb
                    className="pt-5 pb-3"
                    items={[
                        {
                            title: (
                                <Link to="/" className="text-black me-5">
                                    Home
                                </Link>
                            ),
                        },
                        {
                            title: <p className="text-[#292D77]">Order</p>,
                        },
                    ]}
                />
                <div className="flex text-left  border-b pb-3 border-gray-400">
                    <p className="text-lg font-bold text-[#292D77] dark:text-[#292D77]">All Order</p>
                </div>
                

                <div className="grid md:grid-cols-2 gap-2 mb-10 sm:grid-cols-1">
            {resOrder &&
              resOrder.map((dt, index) => (
                <>
                  <div className="bg-[#EEF4F9] mt-10">
                    <div className="py-8 items-center">
                      <img
                        className="w-56 mx-auto"
                        src={dt.book.coverImg}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="ms-8">
                      <div className="mt-5">
                        <p className="font-bold text-2xl text-[#292D77] py-3">
                          {dt.book.title}
                        </p>
                        <div className="flex gap-10 leading-loose ">
                          <div className="font-semibold w-60">
                            <p>Author:</p>
                            <p className="h-16">Description:</p>
                            <p>Price:</p>
                            <p>Qty:</p>
                            <p>Publisher:</p>
                            <p>Published date:</p>
                            <p>ISBN:</p>
                            <p>In stock</p>
                          </div>
                          <div className="">
                            <div className="flex gap-5">
                              <span className="font-semibold text-[#292D77]">
                                {dt.book.title}
                              </span>
                            </div>
                            <p className="h-16 line-clamp-2">
                              {dt.book.description}
                            </p>
                            <p className="text-[#2BD7AD]">$ {dt.price}</p>
                            <p>{dt.qty}</p>
            
                            <p>{dt.book.publisher}</p>
                            <p>{dt.book.publishDate}</p>
                            <p>{dt.book.isbn}</p>
                            <p>{dt.book.qty}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end items-end">
                                    <Button className="ms-3 bg-blue-800 text-white border-blue-800">
                                        <Link to={`/checkout/${dt.id}`}>
                                            Buy Agian
                                        </Link>
                                    </Button>
                                </div>
                    </div>
                  </div>{" "}
                </>
              ))}
            {/* Book details JSX */}
          </div>
            </div>
        </section>
    )
}

export default OrderComponent