import React from 'react'
import HeaderCategoryComponent from './HeadingComponent'
import CardProductComponent from './CardProductComponent';

const ArtDesignComponent = () => {
  return (
    <section>
      <div className='max-w-full sm:px-[20px] md:px-[50px] lg:px-[100px] px-2 pb-10'>
        <HeaderCategoryComponent namecategory="Art Design" titlecategory="Art Design" decriptioncategory="Showcase art and design with visuals and text, catering to various audiences for education, inspiration, and heritage preservation." />
        <div className='grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4'>
          <CardProductComponent title="Text Title" description="Text description" price="2.00" />
        </div>
      </div>
    </section>
  )
}

export default ArtDesignComponent