import React from 'react'

export default function FeatureComponent(props) {
  const scrollToSection = (sectionId) => {
    const sectionRef = document.getElementById(sectionId);
    if (sectionRef) {
      window.scrollTo({
        top: sectionRef.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  };
  return (
    <div className="py-10 w-[80%] lg:w-[75%] xl:w-[65%] grid place-content-center grid-flow-row lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 mx-auto ">
      {props.scrolls.map((scroll) => (
        <button key={scroll.id} onClick={() => scrollToSection(scroll.section)} href={scroll.link} className="scroll-link">
          <div className="bg-[#292D77] hover:opacity-90 transition duration-500 h-auto rounded-lg px-5 pb-2 lg:pb-5 pt-2 text-center">
            <img className="mx-auto lg:w-20 xl:w-28 my-4" src={scroll.image} alt="featureimage" />
            <p className="lg:text-lg text-white font-bold h-14 uppercase">{scroll.title}</p>
          </div>
        </button>
      ))}
    </div>
  )
} 
