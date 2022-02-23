import React from 'react'
import Hxl from './elements/Hxl'

const SmallHeader = ({ page }) => {
  return (
    <header className="relative bg-gradient-to-r from-main to-secondary-light h-48 md:h-96 w-screen bottomBanner mb-24">
      <Hxl className="absolute bottom-12 md:bottom-24 right-1/4" bold color="main">
        {page}
      </Hxl>
    </header>
  )
}

export default SmallHeader
