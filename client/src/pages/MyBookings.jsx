import React, { useState } from "react";
import Title from "../components/Title";
import { userBookingsDummyData, assets } from "../assets/assets";

const MyBookings = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData);

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Booking"
        subtitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks."
        align="left"
      />

      <div className="max-w-6xl mt-8 w-full text-gray-800">
        <div className="hidden md:grid md:grid-cols-[3fr_3fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div>Hotels</div>
          <div>Date & Timing</div>
          <div>Payment</div>
        </div>

        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6"
          >
            {/* Hotel Details */}
            <div className="flex gap-4">
              <img
                src={booking.room.images[0]}
                alt="hotel"
                className="w-32 h-28 rounded shadow object-cover"
              />
              <div className="flex flex-col gap-1 text-sm text-gray-600">
                <p className="text-xl font-semibold text-black">
                  {booking.hotel.name}
                  <span className="ml-2 text-sm text-gray-500">
                    ({booking.room.roomType})
                  </span>
                </p>

                <div className="flex items-center gap-1">
                  <img src={assets.locationIcon} alt="location" />
                  <span>{booking.hotel.address}</span>
                </div>

                <div className="flex items-center gap-1">
                  <img src={assets.guestIcon} alt="guests" />
                  <span>Guests: {booking.guests}</span>
                </div>

                <p className="text-base text-black font-medium">
                  Total: ${booking.totalPrice}
                </p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
              <div>
                <p className="font-medium">Check-In</p>
                <p className="text-gray-500 text-sm">
                  {new Date(booking.checkInDate).toDateString()}
                </p>
              </div>
              <div>
                <p className="font-medium">Check-Out</p>
                <p className="text-gray-500 text-sm">
                  {new Date(booking.checkOutDate).toDateString()}
                </p>
              </div>
            </div>

            {/* Payment */}
            <div className="flex flex-col items-start justify-center pt-3">
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    booking.isPaid ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <p
                  className={`text-sm font-medium ${
                    booking.isPaid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {booking.isPaid ? "Paid" : "Unpaid"}
                </p>
              </div>

              {!booking.isPaid && (
                <button className=" rounded-full mt-2 border border-gray-400 px-3 py-1 rounded text-sm hover:bg-gray-100">
                  Pay now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
