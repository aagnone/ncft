import React from 'react'
import Image from 'next/image'
import Teachers from '../public/teacher2.png'
import fullLogo from '../public/fullLogo.png'
import Hxl from './elements/Hxl'
const Header = () => {
  return (
    <div className="relative bg-gradient-to-r from-main to-secondary-light md:h-screen w-screen bottomBanner mb-24">
      <div className="pt-20 md:pt-0 w-3/4 md:w-1/2 lg:w-1/3 md:h-screen flex justify-center flex-col z-40 left-10 md:left-1/5 relative md:pb-0 pb-4 md:transform md:-translate-y-8">
        <p className="p-3 px-6 rounded-lg bg-main-light text-white font-bold inline-block w-max mb-6">
          Its your union too
        </p>

        <Hxl color="white">New Castle Federation of Teachers</Hxl>

        <p className="text-white py-2 inline-block leading-7">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, amet quam? Molestias illo enim veritatis
          facere sunt corrupti unde illum praesentium quod minima omnis, accusamus alias dolorem quis necessitatibus
          exercitationem. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, amet quam? Molestias
          illo enim veritatis facere sunt corrupti unde illum praesentium quod minima omnis, accusamus alias dolorem
          quis necessitatibus exercitationem.
        </p>
      </div>
      <div className="banner-image mask md:absolute top-0 right-0 -z-1">
        <Image className="h-auto max-w-full" src={Teachers} alt="Landscape picture" width={899} height={899} />
      </div>
      <div className="hidden lg:block absolute bottom-8 right-1/4">
        <Image className="w-1/2 h-1/2" src={fullLogo} alt="Landscape picture" width={249} height={249} />
      </div>
    </div>
  )
}

export default Header
