import React from 'react'
import Image from 'next/image' 

const CustomImage = (src, height, width, alt) => {
  const externaImageLoader = ({ src }) =>
  `https://static2.taglivros.com/${src}`;

  return (<Image alt={alt} src={externaImageLoader(src)} height={height} width={width} />)
}

export default CustomImage
