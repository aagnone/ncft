import React from 'react'
import SmallHeader from '../components/SmallHeader'
import Section from '../components/Section'
import { useFaq } from '../lib/hooks'
import classnames from 'classnames'
import FaqItem from '../components/FaqItem'
import Head from 'next/head'
const Faq = () => {
  const data = useFaq()
  return (
    <>
      <SmallHeader page="FAQ" />
      <Section>
        <Head>
          <title>New Castle Federation of Teachers - FAQ</title>
        </Head>
        <div className="w-full p-8 flex justify-around">
          {data?.map((item, i) => {
            return <FaqItem data={item} key={i} />
          })}
        </div>
      </Section>
    </>
  )
}

export default Faq
