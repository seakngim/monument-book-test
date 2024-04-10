import React from "react";

export default function CardCategoryComponent(props) {
  const { categorys, onClick } = props;
  return (
    <div className="py-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  grid place-content-center grid-flow-row gap-7">
      {categorys.map((category) => (
        // eslint-disable-next-line react/jsx-key
        <div className="border border-gradient duration-300 hover:shadow-lg rounded-lg" onClick={() => onClick(category.id)}>
          <div className="flex space-x-4">
            <div className="shrink-0 flex-none w-24">
              <img
                src={category.image}
                alt={category.title}
              />
            </div>
            <div className="my-2">
              <p className="text-base pt-3 pb-2 font-semibold text-[#292D77] dark:text-[#292D77] line-clamp-1">
                {category.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                {category.description}
              </p>
              <p className="text-sm border-t-2 py-2 font-medium text-[#292D77] dark:text-[#292D77] line-clamp-1">
                {category.qty} ooks
              </p>
            </div>
          </div>


        </div>
      ))}
    </div>
  );
}
