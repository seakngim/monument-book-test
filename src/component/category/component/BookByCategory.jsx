import React, { useEffect } from "react";
import HeaderCategoryComponent from "./HeadingComponent";
import CardProductComponent from "./CardProductComponent";
import CategoryService from "../../../redux/service/CategoryService";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import { setCategoryById } from "../../../redux/slices/CategorySlice";

const BookByCategory = () => {
  const categories = useSelector((state) => state.category.categoryById);
  console.log(categories, "categories");
  const id = useParams();
  const dispatch = useDispatch();
  console.log("id", id.id);
  const handleGetCategory = () => {
    CategoryService.getCategoryById(id.id)
      .then((res) => {
        dispatch(setCategoryById(res.data));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  useEffect(() => {
    handleGetCategory();
  }, []);

  return (
    <>
      <section>
        <div className="h-screen justify-between max-w-full md:px-28 lg:px-60 sm:px-28 px-10 pb-10">
          <>
            <HeaderCategoryComponent
              namecategory={categories.name}
              titlecategory={categories.name}
              decriptioncategory={categories.description}
            />
            <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
              {categories.books && categories.books.map((item) => (
                <CardProductComponent
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.coverImg}
                  description={item.description}
                  price={item.price}
                />
              ))}
            </div>
          </>
        </div>
      </section>
    </>
  );
};

export default BookByCategory;
