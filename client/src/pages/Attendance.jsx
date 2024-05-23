import React from 'react'
import QRCode from 'react-qr-code'
import { serverAddress } from '../settings'

const Attendance = () => {
  return (
    <>
      <div className="py-10">
        <h2 className="text-[1.7rem] font-bold text-center">Student Attendance</h2>
        <div className="h-0.5 mt-1 bg-[#cccccc] w-96 mx-auto"></div>
      </div>

      <div className="px-4 py-8">
        <div className="md:w-1/2 mx-auto mb-4">
          <QRCode value={`${serverAddress}/attendance`} />
        </div>

      </div>

      <div className="absolute top-32 -left-16">
        <img src={null} className="w-48" />
      </div>
    </>
  )
}

export default Attendance