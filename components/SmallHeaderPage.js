import React from 'react'
import Section from './Section'
import SmallHeader from './SmallHeader'

const SmallHeaderPage = ({ children, page }) => {
  return (
    <>
      <SmallHeader page={page} />
      <Section>{children}</Section>
    </>
  )
}

export default SmallHeaderPage
