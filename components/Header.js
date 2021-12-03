import React from 'react'
import Image from 'next/image'
import headerImage from '../public/header-image.png'
import fullLogo from '../public/fullLogo.png'
import Hxl from './elements/Hxl'
const Header = () => {
  return (
    <div className="relative bg-main bg-mesh md:h-screen w-screen bottomBanner mb-24">
      <div className="pt-20 md:pt-0 w-3/4 md:w-1/2 lg:w-1/3 md:h-screen flex justify-center flex-col z-40 left-10 md:left-1/5 relative md:pb-0 pb-4 md:transform md:-translate-y-8">
        <p className="p-3 px-6 rounded-lg bg-accent-light text-main opacity-70 font-bold inline-block w-max mb-6">
          Its your union too
        </p>

        <Hxl bold color="white">New Castle Federation of Teachers</Hxl>

        <p className="text-white py-3 inline-block leading-7">
            The American Federation of Teachers is a union of professionals that champions fairness; democracy; economic
            opportunity; and high-quality public education, healthcare and public services for our students, their
            families and our communities. We are committed to advancing these principles through community engagement,
            organizing, collective bargaining and political activism, and especially through the work our members do
        </p>
      </div>
      {/* <div className="banner-image mask md:absolute top-0 right-0 -z-1">
        <Image className="h-auto max-w-full" src={Teachers} alt="Landscape picture" width={899} height={899} />
      </div>
      <div className="hidden lg:block absolute bottom-8 right-1/4">
        <Image className="w-1/2 h-1/2" src={fullLogo} alt="Landscape picture" width={249} height={249} />
      </div> */}
      <div className="mask md:absolute -top-2 -right-8 md:opacity-70">
        <Image className={"h-auto max-w-full"} src={headerImage} alt="Landscape picture" width={821} height={824} />
      </div>
      <div className="hidden lg:block absolute bottom-8 right-1/4 ">
        <Image className="w-1/2 h-1/2" src={fullLogo} alt="Landscape picture" width={249} height={249} />
      </div>
      <div className="scroll-down hidden md:block"></div>
    </div>
  )
}

export default Header
