import React, { useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllCategory } from '../../redux/slices/CategorySlice';
import CategoryService from '../../redux/service/CategoryService';
import CardCategoryComponent from './component/CardCategory';

export default function CategoryComponent() {
    const categories = useSelector((state) => state.category.allCategory);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGetCategory = () => {
        CategoryService.getAllCategory()
            .then((res) => {
                dispatch(setAllCategory(res.data));
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    };

    useEffect(() => {
        handleGetCategory();
    }, []);

    const categorys = categories.map((item) => ({
        id: item.id,
        title: item.name,
        description: item.description,
        qty: item.books.length,
        image: item.coverImage,
    }));

    const handleCategoryClick = (categoryId) => {
        console.log('Selected category ID:', categoryId);
        navigate(`/category/${categoryId}`);
    };

    return (
        <section>
            <div className="max-w-full w-[80%] mx-auto h-screen">
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
                            title: <p className="text-[#292D77]">Category</p>,
                        },
                    ]}
                />
                <div className="flex text-left border-b pb-3 border-gray-400">
                    <p className="text-lg font-bold text-[#292D77] dark:text-[#292D77]">All Category</p>
                </div>
                <CardCategoryComponent categorys={categorys} onClick={handleCategoryClick} />
            </div>
        </section>
    );
}
