import React, { useState } from 'react'
import SmallHeader from '../components/SmallHeader'
import Section from '../components/Section'
import Head from 'next/head'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
const CalendarPage = () => {
  const [value, onChange] = useState(new Date())

  const clickDay = () => {
    console.log(value)
  }

  const datesToAddContentTo = [tomorrow, in3Days, in5Days]

  function tileContent({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (datesToAddContentTo.find((dDate) => isSameDay(dDate, date))) {
        return 'My content'
      }
    }
  }
  return (
    <>
      <SmallHeader page="FAQ" />
      <Section>
        <Head>
          <title>New Castle Federation of Teachers - Events</title>
        </Head>
        <div className="w-full p-8 flex justify-around">
          <Calendar tileContent={tileContent} onChange={onChange} onClickDay={clickDay} value={value} />
        </div>
        <div>{value.toString()}</div>
      </Section>
    </>
  )
}

export default CalendarPage
