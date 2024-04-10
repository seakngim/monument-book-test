import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Select, Space } from "antd";
import { Link } from "react-router-dom";
import pic from "../assets/images/Books Cover/Animal_Farm_Cover.jpg";
import BookService from "../redux/service/BookService";
import { setBookById } from "../redux/slices/BookSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartPopup from "./popup/CartPopup";

const ViewComponent = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const resBook = useSelector((state) => state.book.bookbyId)
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [cartId, setcartId] = useState();
    console.log(resBook, "resBook");
    const handleGetBook = () => {
        BookService.getBookById(id).then((res) => {
            dispatch(setBookById(res.data));
        });
    };
    useEffect(() => {
        handleGetBook();
    }, []);
    const showModal = () => {
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
    return (
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
                        title: (
                            <Link to="/book" className="text-black me-5">
                                Book
                            </Link>
                        ),
                    },
                    {
                        title: <p className="text-[#292D77]">View</p>,
                    },
                ]}
            />
            <div className="flex text-left  border-b pb-3 border-gray-400">
                <p className="text-lg font-bold text-[#292D77] dark:text-[#292D77]">Book Detail</p>
            </div>
            {resBook && resBook.length > 0 && (
                <div className="grid md:grid-cols-2 gap-2 mb-5 sm:grid-cols-1">
                    <div className="bg-[#EEF4F9] mt-10">
                        <div className="py-8 items-center">
                            <img className="w-56 mx-auto" src={resBook[0].coverImg} alt="" />
                        </div>
                    </div>
                    <div className="my-5 md:my-10">
                        <div className="md:ms-8">
                            {resBook && resBook.map((dt, index) => (
                                <div key={dt.id}>
                                    <p className="font-bold text-2xl text-[#292D77] line-clamp-1">{dt.title}</p>
                                    <div className="flex leading-loose">
                                        <div className="font-semibold w-32 ">
                                            <p>Author:</p>
                                        </div>
                                        <div className="">
                                            <div className="flex gap-5">
                                                {dt.author.map((authors, idx) => (
                                                    <span className="font-semibold text-[#292D77]" key={idx}>{authors.name}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-10">
                                        <div className="font-semibold w-32 ">
                                            <p>Description:</p>
                                        </div>
                                        <div className="">
                                            <p className="line-clamp-4">{dt.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex leading-loose">
                                        <div className="font-semibold w-32 ">
                                            <p>Price:</p>
                                        </div>
                                        <div className="">
                                            <p className="text-[#2BD7AD]">$ {dt.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex leading-loose">
                                        <div className="font-semibold w-32 ">
                                            <p>Category:</p>
                                        </div>
                                        <div className="">
                                            <div className="flex gap-5">
                                                {dt.categories.map((category, idx) => (
                                                    <span key={idx}>{category.name}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex leading-loose">
                                        <div className="font-semibold w-32 ">
                                            <p>Publisher:</p>
                                        </div>
                                        <div className="">
                                            <p>{dt.publisher}</p>
                                        </div>
                                    </div>
                                    <div className="flex leading-loose">
                                        <div className="font-semibold w-32 ">
                                            <p className="w-32">Published date:</p>
                                        </div>
                                        <div className="">
                                            <p>{dt.publishDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex leading-loose">
                                        <div className="font-semibold w-32 ">
                                            <p>ISBN:</p>
                                        </div>
                                        <div className="">
                                            <p>{dt.isbn}</p>
                                        </div>
                                    </div>
                                    <div className="flex leading-loose">
                                        <div className="font-semibold w-32 ">
                                            <p>In stock</p>
                                        </div>
                                        <div className="">
                                            <p>{dt.qty}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-end items-end mt-5">
                                <Button className="text-black border-blue-800" onClick={showModal}>
                                    Add to cart
                                </Button>
                                <Button className="ms-3 bg-blue-800 text-white border-blue-800">
                                    <Link to={`/checkout/${resBook[0].id}`}>
                                        Buy Now
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* Book details JSX */}
                </div>
            )}
            <CartPopup
                visible={open}
                confirmLoading={confirmLoading}
                cartId={cartId}
                onOk={handleOk}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default ViewComponent;
