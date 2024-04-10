import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CardComponent from './CardComponent';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import BookService from '../../../redux/service/BookService';
import { setBestSelling } from '../../../redux/slices/BookSlice';

export default function BestSellingComponent() {
  const dispatch = useDispatch();
  const bestSelling = useSelector((state) => state.book.bestSelling);
  const getAllBestSellingBooks = () => {
    BookService.getBookSelling()
      .then((res) => {
        dispatch(setBestSelling(res.data));
      })
      .catch((error) => {
        console.error("Error fetching best-selling books:", error);
      });
  };

  useEffect(() => {
    getAllBestSellingBooks()
  }, [])
  return (
    <section className='background-gradient'>
      <div className=' w-[80%] m-auto '>
        <Breadcrumb
        className='pt-5 pb-3 border-b border-[#292D77]'
        items={[
          {
            title: (
              <Link to="/" className="text-black me-5">
                Home
              </Link>
            ),
          },
          {
            title: <p className="text-[#292D77]">Best Selling Books</p>,
          },
        ]}
      />
      <h1 className="flex text-[#292D77] font-bold text-2xl py-5">
        Best Selling Books
      </h1>
      <div className="pb-10">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-6 mb-5">
          {bestSelling.length > 0 ? (
            bestSelling.map((item) => (
              <CardComponent key={item.id} id={item.id} image={item.coverImg} price={item.price} title={item.title} description={item.description} />
            ))
          ) : (
            <p className="text-[3.75rem] h-96 text-gray-400">No data</p>
          )}
        </div>
      </div>
      </div>
      
    </section>
  )
}
