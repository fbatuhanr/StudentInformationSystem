import React, { useEffect, useState } from 'react'
import { serverAddress } from '../settings'
import DashboardTitle from '../components/DashboardTitle.jsx'
import axios from 'axios'
import Select from 'react-select'
import Calendar from 'react-calendar';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { mysqlDate } from '../utils/format.js'
import { MdFileDownloadDone, MdOutlineDownloadDone, MdOutlineWarningAmber, MdQuestionMark } from 'react-icons/md'
import { FaRegCalendarCheck, FaXmark } from 'react-icons/fa6'
import { IoFastFoodSharp } from 'react-icons/io5'
const MySwal = withReactContent(Swal)

const Overview = () => {

  const [date, setDate] = useState(new Date());

  const [students, setStudents] = useState([])
  const [classes, setClasses] = useState([])
  const [classStudents, setClassStudents] = useState([])

  const [selectedClasses, setSelectedClasses] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])

  const [canteenStudents, setCanteenStudents] = useState([])
  const [selectedCanteenStudents, setSelectedCanteenStudents] = useState([])

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
      console.log(data)
      setStudents(data)
      setClassStudents(data)
      setCanteenStudents(data)
    })
    fetchData("class").then(data => setClasses(data))

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

  function getDatesBetween(startDate, endDate) {
    let dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  }

  const handleAttendanceReport = async () => {

    console.log(date)
    console.log(students)

    if (!Array.isArray(date)) {
      Swal.fire({ icon: "error", title: "Please select a date range!" })
      return
    }

    const response = await axios.get(`${serverAddress}/student-attendance`, {
      params: {
        ids: students.map(i => i.ID),
        startDate: mysqlDate(date[0]),
        endDate: mysqlDate(date[1])
      }
    })
    console.log(response)

    const reportDates = getDatesBetween(date[0], date[1])
    const attendanceTable =
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-2 min-w-52">
                Student Name & Class
              </th>
              {
                reportDates.map((date, index) =>
                  <th key={index} scope="col" className="px-4 py-2 min-w-36 text-center">
                    <span className="text-[0.6rem] capitalize">{date.toLocaleDateString('en-us', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    <br />
                    <span>{mysqlDate(date)}</span>
                  </th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              students.map((student, index) =>
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {student.Name} ({classes.find(i => i.ClassID == student.ClassID)?.ClassName})
                  </th>
                  {
                    reportDates.map((date, index) => {

                      const attendanceStatus = response.data
                        .filter(i => i.StudentID == student.ID)
                        .find(i => i.Date == mysqlDate(date))?.Status

                      let attendanceLabel;
                      if (attendanceStatus === 1)
                        attendanceLabel = <MdFileDownloadDone className="mx-auto" />
                      else if (attendanceStatus === 0)
                        attendanceLabel = <FaXmark className="mx-auto" />
                      else
                        attendanceLabel = <MdQuestionMark className="mx-auto" />

                      return (
                        <td key={index} className="px-4 py-2 text-xl">
                          {attendanceLabel}
                        </td>
                      )
                    })
                  }
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

    MySwal.fire({
      title: "<strong>Student Attendance Report</strong>",
      html: attendanceTable,
      width: "95%",
      confirmButtonText: "Download Report!",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Coming soon!", "", "info");
      }
    });
  }

  const handleCanteenReport = async () => {

    console.log(selectedCanteenStudents)

    const response = await axios.get(`${serverAddress}/student-canteen-buy`, {
      params: {
        ids: selectedCanteenStudents.length ? selectedCanteenStudents.map(i => i.value) : null
      }
    })

    const studentList =
      selectedCanteenStudents.length ?
        selectedCanteenStudents.map(i => { return { Name: i.label, ID: i.value } }) :
        canteenStudents;

    const canteenTable =
      <div>
        {
          studentList.map((student, index) =>
            <div key={index} className="my-2 bg-[#cccccc] border border-[#ffffff] text-left py-8 px-12 rounded-xl">
              <div className="font-bold ps-8 mb-4 text-2xl">
                <h3>{student.Name}</h3>
              </div>
              {
                response.data.find(i => i.StudentID == student.ID)
                  ?
                  <>
                    <div className="grid grid-cols-3 grid-rows-1 mb-2 font-bold border-b border-[#0D0D0D]">
                      <div>Product Name</div>
                      <div>Product Price</div>
                      <div>Purchase Date</div>
                    </div>
                    <div className="grid grid-cols-3">
                      {
                        response.data.filter(i => i.StudentID == student.ID).map(i =>
                          <>
                            <div>{i.ProductName}</div>
                            <div>{i.ProductPrice}</div>
                            <div>{i.BuyDate}</div>
                          </>
                        )
                      }
                    </div>
                  </>
                  :
                  <p className="text-sm italic">No items purchased by the student were found!</p>
              }
            </div>
          )
        }
      </div >

    MySwal.fire({
      title: "<strong>Student Canteen Product Buy Report</strong>",
      html: canteenTable,
      width: "95%",
      confirmButtonText: "Download Report!",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Coming soon!", "", "info");
      }
    });
  }

  return (
    <div className="pb-12">

      <DashboardTitle title="Statistics" />

      <div className="px-12 pt-2 pb-12">
        <h2 className="font-bold text-2xl ps-8 mb-6">Attendance Report</h2>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 px-12 items-center">
          <div>
            <h2 className="text-xl font-bold mb-1 ps-3">Class / Classes</h2>
            {
              classes &&
              <Select
                isMulti
                name="classes"
                options={classes.map(i => { return { label: i.ClassName, value: i.ClassID } })}
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
          <div>
            <h2 className="text-xl font-bold mb-1 ps-3">Start & End Date</h2>
            <DateRangePicker className="w-full h-12 rounded-xl" value={date} onChange={(e) => setDate(e)} />
          </div>
          <button type="button" onClick={handleAttendanceReport} className="flex justify-center items-center gap-x-1.5 h-12 mt-8 bg-[#DBBA12] rounded-xl text-xl font-semibold border border-[#0D0D0D] [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-[#29156c]">
            <span>Generate Report</span>
            <span><FaRegCalendarCheck className="text-lg" /></span>
          </button>
        </div>
      </div>

      <hr className="h-1 mx-28 rounded-xl bg-[#0D0D0D] border-0" />


      <div className="px-12 py-12">
        <h2 className="font-bold text-2xl ps-8 mb-6">Canteen Report</h2>
        <div className="grid grid-cols-2 gap-4 px-12 items-center">
          <div>
            <h2 className="text-xl font-bold mb-1 ps-3">Student / Students</h2>
            {
              canteenStudents &&
              <Select
                isMulti
                placeholder="Do not select to view all students!"
                options={canteenStudents.map(i => { return { label: i.Name, value: i.ID } })}
                onChange={setSelectedCanteenStudents}
                value={selectedCanteenStudents}
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
          <button type="button" onClick={handleCanteenReport} className="flex justify-center items-center gap-x-1.5 h-12 mt-8 bg-[#DBBA12] rounded-xl text-xl font-semibold border border-[#0D0D0D] [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-[#29156c]">
            <span>Generate Report</span>
            <span><IoFastFoodSharp className="text-lg" /></span>
          </button>
        </div>
      </div>

    </div>
  )
}

export default Overview