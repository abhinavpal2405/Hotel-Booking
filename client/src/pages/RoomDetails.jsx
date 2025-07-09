import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets'
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
                    <p className=' flex justify-end text-2xl font-medium'>${room.pricePerNight}/night</p>
            </div>
            
        </div>
 
      </div>

      <form className='flex flex-col md:flex-row items-start md:items-center justify-between
      bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl
       mx-auto mt-16 max-w-6xl'>


        <div className='flex flex-col md:flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
          <div className='flex flex-col'>
            <label htmlFor="CheckInDate" className='font-medium'>
              Check-In
            </label>
            <input type="date" id='CheckInDate' placeholder='Check-In' className='w-full
            rounded border border-gray-300 px-3 py-2 mt-1.5 outline=none' required />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="CheckOutDate" className='font-medium'>
              Check-out
            </label>
            <input type="date" id='CheckOutDate' placeholder='Check-Out' className='w-full
            rounded border border-gray-300 px-3 py-2 mt-1.5 outline=none' required />
          </div>
          <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
          <div className='flex flex-col'>
            <label htmlFor="Guest" className='font-medium'>
              Guest
            </label>
            <input type="number" id='Guest' placeholder='0' className='max-w-20 rounded
            border border-gray-300 px-3 py-2
             mt-1.5 outline-none' required />
          </div>

        </div>
        <button type='submit' className=' bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3
        md:py-4 text-base cursor-pointer'>
         Check Availability
        </button>
        {/*Common Specifictaion*/}
       



       </form>
        <div className='pt-10 space-y-5'>
             {roomCommonData.map((spec, index) => (
               <div key={index} className='flex items-start gap-2'>
                  <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' />
                <div>
                   <p className='text-base'>{spec.title}</p>
                   <p className='text-gray-500'>{spec.description}</p>
                </div>
                 </div>
               ))}
           </div>
           <div>
            <p className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'
             >Guests will bd alloacted on the ground floor accoring to Availability.
              You get a comfortable Two bedroom apartment has a true city feeling.The
              price quoted is for two guest, at the guest slot please mark the number of guests to get the
              exaact price for groups. The Guests will be alloacted ground floor according to Availability. You get the comfortable
              two bedroom apartment that has a true city feeling.
            </p>
           </div>
           <div className='flex flex-col items-start gap-4'>
  <div className='flex gap-4'>
    <img
      src="data:image/png;base64,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"
      alt="host"
      className='h-14 w-14 md:h-18 md:w-18 rounded-full'
    />
    <div>
      <p className='text-lg md:text-xl'>Hosted By Abhinav Pal</p>
      <div className='flex items-center mt-1'>
        <StarRating />
        <p className='ml-2'>200+ reviews</p>
      </div>
    </div>
  </div>
  <button className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'>
    Contact Now
  </button>
</div>


    </div>
  )
}

export default RoomDetails
