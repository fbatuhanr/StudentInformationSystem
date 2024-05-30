import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { mysqlDate } from '../utils/format.js'

import QRCode from 'react-qr-code'

import { serverAddress } from '../settings'
import DashboardTitle from '../components/DashboardTitle.jsx'
import { MdDone, MdOutlineDownloadDone, MdOutlineWarningAmber } from 'react-icons/md';
import { FaXmark } from 'react-icons/fa6';

const Attendance = () => {

  const [date, setDate] = useState(new Date());

  const [students, setStudents] = useState([])
  const [attendances, setAttendances] = useState([])

  useEffect(() => {

    const fetchData = async (param) => {

      try {
        const response = await axios.get(`${serverAddress}/${param}`)
        console.log(response)
        return response.data
      } catch (error) {
        console.log(error)
      }
    }
    fetchData("student").then(data => setStudents(data))
    fetchData("attendance").then(data => { console.log(data); setAttendances(data) })

  }, [])


  const handleMark = async (event, studentId) => {

    console.log(event.target.checked)
    console.log(studentId)
    console.log(mysqlDate(date))

    try {

      const response = await axios.post(`${serverAddress}/attendance`, null, {
        params: {
          studentId,
          date: mysqlDate(date),
          status: event.target.checked
        }
      })
      console.log(response)
      window.location.reload();

    }
    catch (error) {
      console.log(error)
    }
  }

  const attendanceStatus = (stdId) => attendances.find(a => a.StudentID == stdId && a.Date == mysqlDate(date))?.Status
  const attendanceStatusLabel = (stdId) => {

    const isStudentAttendanceExist = attendanceStatus(stdId)

    if (isStudentAttendanceExist === 1)
      return <span className="text-green-400 flex items-center gap-x-1">Existent <MdOutlineDownloadDone className="text-xl" /></span>
    else if (isStudentAttendanceExist === 0)
      return <span className="text-red-500 flex items-center gap-x-1">Absent <FaXmark className="text-xl" /></span>
    else
      return <span className="text-yellow-400 flex items-center gap-x-1">No record <MdOutlineWarningAmber className="text-xl" /></span>
  }

  return (
    <div className="pb-12">

      <DashboardTitle title="Student Attendance" />

      <div>
        <h2 className="text-xl text-center font-bold">Choose a Date</h2>
        <Calendar className="text-black mx-auto mb-4" value={date} onChange={(e) => setDate(e)} />
      </div>

      {
        students && attendances && students.length ?
          <>
            <div className="grid grid-cols-6 items-center mb-2 py-1.5 font-semibold bg-[#1D0E50] text-center text-lg">
              <h5>Photo</h5>
              <h5>Name</h5>
              <h5>Date</h5>
              <h5>Status</h5>
              <h5>QR</h5>
              <h5>Action</h5>
            </div>
            {
              students && attendances && students.map((student, index) =>
                <div key={index} className="grid grid-cols-6 justify-items-center items-center my-1.5 py-2 pe-4 font-semibold bg-[#5726FC] text-center">
                  <span className="w-16 h-16 overflow-hidden rounded-full flex items-center justify-center">
                    <img src={`${serverAddress}/${student.Photo}`} />
                  </span>
                  <span>
                    {student.Name}
                  </span>
                  <span>
                    {mysqlDate(date)}
                  </span>
                  <div>
                    {attendanceStatusLabel(student.ID)}
                  </div>
                  <span>
                    <QRCode
                      size={92}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      value={`${serverAddress}/attendance/studentId=${student.ID}&date=${mysqlDate(date)}&status=1`}
                      viewBox={`0 0 92 92`}
                    />
                  </span>
                  <div>
                    <div className="flex justify-center items-center cursor-pointer px-2 py-1 rounded bg-[#6841f2] hover:bg-[#4725bc]">
                      <label htmlFor="mark-as-exist" className="me-1 cursor-pointer">Attendance</label>
                      <input checked={attendanceStatus(student.ID) === 1 ? true : false} id="mark-as-exist" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-xl cursor-pointer"
                        onChange={(e) => handleMark(e, student.ID)}
                      />
                    </div>

                    <div className="mt-1">
                      <button type="button" className="w-full px-2 py-1 text-white bg-[#6841f2] hover:bg-[#4725bc] rounded">Send QR to Parent</button>
                    </div>
                  </div>
                </div>
              )
            }
          </>
          :
          <h2 className="text-center text-lg mt-10">Students not found!</h2>
      }
    </div>
  )
}

export default Attendance