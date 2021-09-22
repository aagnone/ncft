import React from 'react'
import Hxl from './elements/Hxl'
import TextMarker from './TextMarker'

const TextCard = () => {
  return (
    <div className="lg:mb-0 mb-8 bg-transparent">
      <TextMarker>our news</TextMarker>
      <div>
        <Hxl>What we have going on</Hxl>
      </div>
    </div>
  )
}

export default TextCard
