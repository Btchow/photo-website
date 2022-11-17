import React from 'react'


function Picture({data}) {
  return (
    <div className='picture'>
      <p>{data.photographer}</p>
      <div className="imageContainer">
                  <img src={data.src.medium} alt="" />
            </div>
            <p>Download Image:  <a target="_blank" href={data.src.large}>CLICK HERE</a></p>
    </div>
  )
}

export default Picture