import React, { useEffect, useState } from "react";
import { Breadcrumb, Pagination } from "antd";
import { Link } from "react-router-dom";
import { setAllAuthor } from "../redux/slices/AuthorSlice";
import AuthorServise from "../redux/service/AuthorService";
import { useDispatch, useSelector } from "react-redux";

const AuthorComponent = () => {
  const itemPerPage = 8;
  const [currentPage, setCurrentPage] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const dispatch = useDispatch();
  const resAllAuthor = useSelector((state) => state.author.allAuthors);

  const getAllAuthor = async (currentPage) => {
    try {
      const response = await AuthorServise.getAllAuthor(
        currentPage,
        itemPerPage
      );
      dispatch(setAllAuthor(response.body.data));
      setTotalItems(response.body.totalElements);
    } catch (error) {
      // Handle the error as needed (e.g., show an error message to the user)
    }
  };

  useEffect(() => {
    getAllAuthor(currentPage);
  }, [currentPage]);

  const data = resAllAuthor.map((res) => ({
    id: res.id,
    name: res.name,
    description: res.description,
    image: res.image,
  }));

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getAllAuthor(page);
  };

  return (
    <div className="max-w-[80%] m-auto w-full">
      {/* Breadcrumb */}
      <div>
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
              title: <p className="text-[#292D77] ">Authors</p>,
            },
          ]}
        />
      </div>
      {/* Breadcrumb */}
      {/* Page Title */}
      <div className="flex text-left border-b pb-3 border-gray-400">
        <p className="text-lg font-bold text-[#292D77] dark:text-[#292D77]">
          Authors
        </p>
      </div>
      {/* Page Title */}
      {/* Author Card Comp */}
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-5">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between max-w-[20rem] w-[20rem] h-[26rem] md:w-[36vw] lg:w-[24vw] xl:w-[18vw] mx-auto rounded-lg shadow-md hover:shadow-lg hover:shadow-gray-400 transition-shadow"
          >
            <div className="py-5 rounded-t-lg bg-indigo-100">
              <Link to={`/authors/view/${item.id}`}>
                <img
                  className="w-[15rem] h-[15rem] mx-auto object-cover rounded-lg"
                  src={item.image}
                  alt={item.name}
                />
              </Link>
            </div>
            <div className="flex flex-col justify-between p-3">
              <h1 className="font-bold text-2xl line-clamp-1 text-indigo-900">
                {item.name}
              </h1>
              <p className="text-sm line-clamp-3">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Author Card Comp */}
      {/* Pagination */}
      <div className="flex justify-end">
        <Pagination
          current={setCurrentPage}
          pageSize={itemPerPage}
          total={totalItems}
          onChange={handlePageChange}
        />
      </div>
      {/* Pagination */};
    </div>
  );
};

export default AuthorComponent;
