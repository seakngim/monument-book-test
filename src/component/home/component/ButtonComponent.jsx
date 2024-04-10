import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonComponent(props) {
    const sytleDefualt = "px-5 block mx-auto py-2 rounded-lg duration-300 hover:text-2xl hover:py-4 text-lg font-bold text-[#292D77] border border-2 border-gradient"
    const handleOnClick = () => {

    }
    return (
        <Link to={props.link}>
            <button onClick={props.onClick || handleOnClick} className={props?.className || sytleDefualt}>
                {props.namebutton}
            </button>
        </Link>
    )
}
