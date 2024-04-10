import React from 'react'
import { Link } from 'react-router-dom'

export default function CardOurActivites(props) {
    return (
        <div className="max-w-[18%] shadow-md bg-white rounded-lg hover:shadow-lg dark:bg-white hover:opacity-90 transition duration-500">
            <Link to={props.link}>
                <img
                    alt="cover"
                    className="h-[240px] w-full rounded-t-lg"
                    src={props.image}
                />
            </Link>
            <div className="p-5">
                <h5 className="mb-2 text-md tracking-widest font-bold text-gray-900 dark:text-[#253C95]  uppercase line-clamp-1">
                    {props.title}
                </h5>
                <p className="mb-3 font-normal grid-flow-row text-gray-700 dark:text-gray-400 line-clamp-3">
                    {props.description}
                </p>
            </div>
        </div>
    )
}
