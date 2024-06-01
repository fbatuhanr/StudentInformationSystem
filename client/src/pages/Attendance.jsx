import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { mysqlDate } from '../utils/format.js'

import QRCode from 'react-qr-code'

import { serverAddress } from '../settings'
import DashboardTitle from '../components/DashboardTitle.jsx'
import { MdOutlineDownloadDone, MdOutlineWarningAmber } from 'react-icons/md';
import { FaXmark } from 'react-icons/fa6';

import { Controller } from 'react-hook-form';
import Select from 'react-select'

const Attendance = () => {

  const [date, setDate] = useState(new Date());

  const [students, setStudents] = useState([])
  const [classes, setClasses] = useState([])
  const [attendances, setAttendances] = useState([])

  const [classStudents, setClassStudents] = useState([])

  const [selectedClasses, setSelectedClasses] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])

  const fetchData = async (param) => {

    try {
      const response = await axios.get(`${serverAddress}/${param}`)
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    fetchData("student").then(data => {
      setStudents(data)
      setClassStudents(data)
    })
    fetchData("class").then(data => setClasses(data))
    fetchData("attendance").then(data => setAttendances(data))

  }, [])

  const handleClassChange = async (value) => {

    console.log(value)
    setSelectedClasses(value)
    setSelectedStudents([])

    if (value.length == 0) {

      fetchData("student").then(data => {
        setStudents(data)
        setClassStudents(data)
      })
      return
    }


    const resultClassIds = value.map(i => i.value)
    try {
      const response = await axios.get(`${serverAddress}/class-student`, {
        params: {
          ids: resultClassIds
        }
      })
      console.log(response)

      setStudents(response.data)
      setClassStudents(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  const handleStudentChange = async (value) => {

    console.log(value)
    setSelectedStudents(value)

    setStudents(
      value.length
        ? classStudents.filter(i => value.map(i => i.value).indexOf(i.ID) !== -1)
        : classStudents
    )
  }

  const attendanceStatus = (stdId) => attendances.find(i => i.StudentID == stdId && i.Date == mysqlDate(date))?.Status
  const attendanceStatusLabel = (stdId) => {

    const isStudentAttendanceExist = attendanceStatus(stdId)

    if (isStudentAttendanceExist === 1)
      return <span className="text-green-400 flex items-center gap-x-1">Existent <MdOutlineDownloadDone className="text-xl" /></span>
    else if (isStudentAttendanceExist === 0)
      return <span className="text-red-500 flex items-center gap-x-1">Absent <FaXmark className="text-xl" /></span>
    else
      return <span className="text-yellow-400 flex items-center gap-x-1">No record <MdOutlineWarningAmber className="text-xl" /></span>
  }

  const handleSetAttendance = async (event, studentId) => {

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

      fetchData("attendance").then(data => setAttendances(data))
      // window.location.reload();

    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="pb-12">

      <DashboardTitle title="Student Attendance" />

      <div className="grid grid-cols-2 gap-x-4 px-12">
        <div className="flex flex-col justify-center gap-y-8">
          <div>
            <h2 className="text-xl font-bold mb-1 ps-3">Class / Classes</h2>
            {
              classes &&
              <Select
                isMulti
                name="classes"
                options={classes.map(i => { return { label: i.Name, value: i.ID } })}
                onChange={handleClassChange}
                value={selectedClasses}
                classNames={{
                  control: () => '!bg-[#0D0D0D] !border-none !rounded-xl !py-1.5',
                  menu: () => '!bg-[#0D0D0D] !border-none',
                  option: () => '!bg-[#29156C] hover:!bg-[#3c209a] !cursor-pointer',
                  multiValue: () => '!bg-[#4F22F2]',
                  multiValueLabel: () => '!bg-[#4F22F2] !text-[#ffffff] !pe-2',
                  multiValueRemove: () => '!bg-[#20183F] !text-[#ffffff]',
                }}
              />
            }
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1 ps-3">Student / Students</h2>
            {
              classStudents &&
              <Select
                isMulti
                name="students"
                options={classStudents.map(i => { return { label: i.Name, value: i.ID } })}
                onChange={handleStudentChange}
                value={selectedStudents}
                classNames={{
                  control: () => '!bg-[#0D0D0D] !border-none !rounded-xl !py-1.5',
                  menu: () => '!bg-[#0D0D0D] !border-none',
                  option: () => '!bg-[#29156C] hover:!bg-[#3c209a] !cursor-pointer',
                  multiValue: () => '!bg-[#4F22F2]',
                  multiValueLabel: () => '!bg-[#4F22F2] !text-[#ffffff] !pe-2',
                  multiValueRemove: () => '!bg-[#20183F] !text-[#ffffff]',
                }}
              />
            }
          </div>
        </div>
        <div className="min-h-64">
          <Calendar className="!w-auto rounded-xl text-black" value={date} onChange={(e) => setDate(e)} />
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-1 px-4 flex justify-between items-center text-xs italic text-slate-300">
          <p>{(!selectedClasses.length && !selectedStudents.length) ? "Dislaying all students..." : "Filter applied!"}</p>
          <p>{date && `Date: ${date.toDateString()}`}</p>
        </div>
        {
          students && attendances && students.length ?
            <>
              <div className="grid grid-cols-7 items-center mb-2 py-1.5 font-semibold bg-[#1D0E50] text-center text-lg">
                <h5>Photo</h5>
                <h5>Name</h5>
                <h5>Class</h5>
                <h5>Date</h5>
                <h5>Status</h5>
                <h5>QR</h5>
                <h5>Action</h5>
              </div>
              {
                students && attendances && students.map((student, index) =>
                  <div key={index} className="grid grid-cols-7 justify-items-center items-center my-1.5 py-2 pe-4 font-semibold bg-[#5726FC] text-center">
                    <span className="w-16 h-16 overflow-hidden rounded-full flex items-center justify-center">
                      <img src={`${serverAddress}/${student.Photo}`} />
                    </span>
                    <span>
                      {student.Name}
                    </span>
                    <span>
                      {classes && classes.find(i => i.ID == student.ClassID)?.Name}
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
                        <label className="cursor-pointer flex items-center gap-x-1">
                          <span>Is Attended</span>
                          <input checked={attendanceStatus(student.ID) === 1 ? true : false} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-xl cursor-pointer"
                            onChange={(e) => handleSetAttendance(e, student.ID)}
                          />
                        </label>
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
    </div>
  )
}

export default Attendance