import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CardComponent from './CardComponent';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { setNewArrival } from '../../../redux/slices/BookSlice';
import BookService from '../../../redux/service/BookService';


export default function NewArrivalsComponent() {
    const dispatch = useDispatch();
    const newArrival = useSelector((state) => state.book.newArrival);
    const newArrivalService = () => {
        BookService.getNeweArrival()
            .then((res) => {
                dispatch(setNewArrival(res.data));
            })
            .catch((error) => {
                console.error("Error fetching new arrivals:", error);
            });
    };
    const newArrivals = newArrival.map((item) => ({
        id: item.id,
        coverImg: item.coverImg,
        price: item.price,
        title: item.title,
        description: item.description,
        author: item.author.map((autor) => autor.name),
    }));

    useEffect(() => {
        newArrivalService();
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
                            title: <p className="text-[#292D77]">New Arrivals</p>,
                        },
                    ]}
                />
                <h1 className="flex text-[#292D77] font-bold text-2xl py-5">
                    New Arrivals
                </h1>
                <div className="pb-10">
                    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-6 mb-5">
                        {newArrivals.length > 0 ? (
                            newArrivals.map((item) => (
                                <>
                                    <CardComponent key={item.id} id={item.id} image={item.coverImg} price={item.price} title={item.title} description={item.description} />
                                </>
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
