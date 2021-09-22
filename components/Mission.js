import React from 'react'
import Image from 'next/image'
import TextMarker from './TextMarker'
import TeachersMeeting2 from '../public/teachersMeeting2.jpg'
import ourUnion from '../public/ncft.jpg'
import Hxl from './elements/Hxl'

const Mission = () => {
  return (
    <div className="lg:grid grid-cols-2 gap-0 transform">
      <div className="pr-6 transform md:-translate-x-4">
        <Image className="h-auto max-w-full rounded-huge pr-6" src={TeachersMeeting2} alt="Teachers Meetings" />
      </div>
      <div className="flex justify-center p-6 flex-col w-2/3 ml-16">
        <TextMarker>About Us</TextMarker>
        <Hxl className="my-3 font-bold" color="main" bold>Our Mission Statement</Hxl>
        <p className="leading-7 my-3">
          The American Federation of Teachers is a union of professionals that champions fairness; democracy; economic
          opportunity; and high-quality public education, healthcare and public services for our students, their
          families and our communities. We are committed to advancing these principles through community engagement,
          organizing, collective bargaining and political activism, and especially through the work our members do
        </p>
        <div className="w-50 relative flex justify-center">
          <Image src={ourUnion} alt="" width={231.6} height={217.2} />
        </div>
      </div>
    </div>
  )
}

export default Mission
