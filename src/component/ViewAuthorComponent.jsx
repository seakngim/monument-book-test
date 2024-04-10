import React, { useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthorServise from "../redux/service/AuthorService";
import { setAuthorById } from "../redux/slices/AuthorSlice";
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";

const ViewAuthorComponent = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const resAuthorById = useSelector((state) => state.author.authorById);

  const handleGetAuthorById = () => {
    try {
      AuthorServise.getAuthorById(param.id).then((res) => {
        dispatch(setAuthorById(res.body.data));
      });
    } catch (error) {
      // Handle the error as needed (e.g., show an error message to the user)
    }
  };

  useEffect(() => {
    handleGetAuthorById();
  }, []);

  console.log(resAuthorById);
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
              title: (
                <Link to="/authors" className="text-black me-5">
                  Authors
                </Link>
              ),
            },
            {
              title: <p className="text-[#292D77] ">View</p>,
            },
          ]}
        />
      </div>
      {/* Breadcrumb */}
      {/* Page Title */}
      <div className="flex text-left border-b pb-3 border-gray-400">
        <p className="text-lg font-bold text-[#292D77] dark:text-[#292D77]">
          Authors Details
        </p>
      </div>
      {/* Page Title */}
      {/* Author Detials */}
      <div className="py-5">
        <div className="flex">
          <h1 className="mx-auto font-bold text-[7vw] md:text-6xl ">
            {resAuthorById.name}
          </h1>
        </div>
        <div className="max-w-[95rem] mx-auto mt-5 flex flex-col lg:flex-row gap-5">
          <div className="max-w-[44rem] max-h-[44rem] w-[70vw] h-[70vw] lg:w-[40vw] lg:h-[40vw] flex m-auto shrink-0">
            <img
              className="w-full h-full object-cover m-auto rounded-lg"
              src={resAuthorById.image}
              alt="george_orwell"
            />
          </div>
          <div className="max-w-[44rem] max-h-[70vw] lg:max-h-[44rem] w-[70vw] lg:h-[40vw] overflow-y-scroll m-auto">
            <p className="font-medium text-[16px] md:text-[18px] text-justify indent-5">
              {resAuthorById.description}
            </p>
          </div>
        </div>
        {/* Author Books */}
        <div className="max-w-[95rem] mx-auto mt-5 flex gap-2 overflow-x-scroll">
          {resAuthorById.books?.map((books) => (
            <div
              key={books.id}
              className="flex max-w-[11.25rem] max-h-[16.40625rem] w-[24vw] h-[35vw] rounded-lg shrink-0"
            >
              <img
                className="max-w-full max-h-full m-auto rounded-md"
                src={books.coverImg}
                alt="book cover"
              />
            </div>
          ))}
        </div>
        {/* Author Books */}
      </div>
      {/* Author Detials */}
    </div>
  );
};

export default ViewAuthorComponent;
