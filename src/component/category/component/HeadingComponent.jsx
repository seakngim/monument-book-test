import { Breadcrumb } from 'antd'
import React from 'react'
import iconCategory from '../../../assets/images/cover-category.png'
import { Link } from 'react-router-dom'


const HeaderCategoryComponent = (props) => {
    return (
        <>
            <Breadcrumb
                className='py-5'
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
                            <Link to="/category" className="text-black me-5">
                                Category
                            </Link>
                        ),
                    },
                    {
                        title: <p className="text-[#292D77]">{props.namecategory}</p>,
                    },
                ]}
            />
            <div className="flex text-left space-x-6 border-b pb-5 border-gray-400">
                <div className="shrink-0 flex-none w-24">
                    <img
                        src={iconCategory}
                        className="animate-pulse-5s rounded-lg"
                    />
                </div>
                <div className="mt-5">
                    <p className="text-xl font-bold text-[#292D77] dark:text-[#292D77]">{props.titlecategory}</p>
                    <p className="text-base text-gray-500 dark:text-gray-400 my-2 line-clamp-2 max-w-md">{props.decriptioncategory}</p>
                </div>
            </div>
        </>
    )
}

export default HeaderCategoryComponent