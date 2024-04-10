import React from 'react'

const Content = (props) => {
    const { children } = props;
    return (
        <div className='relative px-[1.5625rem] md:px-[3.125rem] lg:px-[4.6875rem] xl:px-[6.25rem]'>{children}</div>
    )
}

export default Content
