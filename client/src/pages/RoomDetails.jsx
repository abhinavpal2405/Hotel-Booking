import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import StarRating from '../components/StarRating'

const RoomDetails = () => {
  const { id } = useParams()
  const [room, setRoom] = useState(null)
  const [mainImage, setMainImage] = useState(null)

  useEffect(() => {
    const room = roomsDummyData.find(room => room._id === id)
    if (room) {
      setRoom(room)
      setMainImage(room.images[0])
    }
  }, [id])

  return room && (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      {/* Room Details */}
      <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
        <h1 className='text-3xl md:text-4xl font-playfair'>
          {room.hotel.name}
          <span className='font-inter text-sm ml-2'>({room.roomType})</span>
        </h1>
        <p className='text-sm font-inter py-1.5 px-3 text-white bg-orange-500 rounded'>
          20% OFF
        </p>
      </div>

      {/* Room Rating */}
      <div className='flex items-center gap-1 mt-2'>
        <StarRating />
        <p className='ml-2'>200+ reviews</p>
      </div>

      {/* Room Address */}
      <div className='flex items-center gap-1 text-gray-500 mt-2'>
        <img src={assets.locationIcon} alt="location-icon" />
        <span>{room.hotel.address}</span>
      </div>

      {/* Image Section */}
      <div className='flex flex-col lg:flex-row gap-4 mt-6 h-[400px]'>
        {/* Main Image */}
        <div className='lg:w-2/3 w-full h-full'>
          <img
            src={mainImage}
            alt="Room"
            className='w-full h-full rounded-xl shadow-lg object-cover'
          />
        </div>

        {/* Thumbnail Grid (2x2) */}
        <div className='lg:w-1/3 w-full grid grid-cols-2 gap-4 h-full'>
          {room?.images.slice(0, 4).map((image, index) => (
            <div key={index} className='w-full h-full'>
              <img
                src={image}
                alt={`Room thumbnail ${index + 1}`}
                onClick={() => setMainImage(image)}
                className={`w-full h-full rounded-xl object-cover cursor-pointer border-2 transition-all duration-200 ${
                  mainImage === image ? 'border-orange-500' : 'border-transparent'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Room Highlight*/}
      <div className=' flex flex-col md:;flex-row md:justify-between mt-10'>

        <div className='flex flex-col'>
            <h1 className='text-3xl md:text-4xl font-playfair'>Experince Luxury Like Never Before</h1>
            <div className='flex flex-wrap items-center mt-3 mb-6 gap-4' >
                {room.amenities.map((item,index)=>
                <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                    <img src={facilityIcons[item]} alt={item}className='w-5 h-5' />
                    <p className='text-xs'>{item}</p>

                </div>
                    )}
            </div>
        </div>
        {/* Room Price*/}
        <p></p>

      </div>
    </div>
  )
}

export default RoomDetails
