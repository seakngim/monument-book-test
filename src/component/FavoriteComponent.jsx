import { Breadcrumb, Button } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/Books Cover/Animal_Farm_Cover.jpg";
import { HiOutlineArchive } from "react-icons/hi";
import BookmarkService from "../redux/service/BookMarkService";
import { useDispatch, useSelector } from "react-redux";
import { setAllUserBookmark } from "../redux/slices/BookmarkSlice";

const FavoriteComponent = () => {
  const dispatch = useDispatch();
  const resBookmark = useSelector((state) => state.bookmark.allUserBookmark);
  // handle get order
  const handleGetBookmark = () => {
    BookmarkService.getAllBookmark(1, 50).then((res) => {
      console.log(res);
      dispatch(setAllUserBookmark(res.data));
    });
  };
  const handledelete = (id) => {
    BookmarkService.delBookmark(id)
      .then(() => {
        // If deletion is successful, update the local state immediately
        const updated = resBookmark.filter((item) => item.id !== id);
        dispatch(setAllUserBookmark(updated)); // Update the Redux state
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };
  useEffect(() => {
    handleGetBookmark();
  }, []);
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
              title: <p className="text-[#292D77]">Favorite</p>,
            },
          ]}
        />
        <div className="flex text-left  border-b pb-3 border-gray-400">
          <p className="text-lg font-bold text-[#292D77] dark:text-[#292D77]">
            All Favorite
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-2 mb-10 sm:grid-cols-1">
          {resBookmark &&
            resBookmark.map((dt, index) => (
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
                          <p className="text-[#2BD7AD]">$ {dt.book.price}</p>
                          <p>{dt.book.category}</p>
                          <p>{dt.book.publisher}</p>
                          <p>{dt.book.publishDate}</p>
                          <p>{dt.book.isbn}</p>
                          <p>{dt.book.qty}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end items-end gap-5">
                      <Button
                        className="flex items-center text-red-400 border-none shadow-sm"
                        onClick={() => handledelete(dt.id)}
                      >
                        <HiOutlineArchive className="mx-2" /> remove
                      </Button>
                      <Link to={`/checkout/${dt.id}`}>
                        <Button className="bg-[#292D77] text-white border-[#292D77] px-5">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>{" "}
              </>
            ))}
          {/* Book details JSX */}
        </div>
      </div>
    </section>
  );
};

export default FavoriteComponent;
