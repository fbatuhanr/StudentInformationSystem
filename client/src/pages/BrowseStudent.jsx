import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaUser } from 'react-icons/fa'
import { serverAddress } from '../settings'

const BrowseStudent = () => {

  const [students, setStudents] = useState([])

  const [parents, setParents] = useState([])
  const [classes, setClasses] = useState([])

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
    fetchData("parent").then(data => setParents(data))
    fetchData("class").then(data => setClasses(data))

  }, [])

  return (
    <div className="py-8">

      <div className="grid grid-cols-6 mb-2 py-1 font-semibold bg-[#1D0E50] text-center text-lg">
        <h5>Photo</h5>
        <h5>Number</h5>
        <h5>Name</h5>
        <h5>Parent</h5>
        <h5>Class</h5>
        <h5>#</h5>
      </div>

      {
        students && students.map(student =>
          <div className="grid grid-cols-6 justify-items-center items-center my-2 py-2 font-semibold bg-[#5726FC] text-center">
            <span className="w-14 h-14 overflow-hidden rounded-full flex items-center justify-center">
              <img src={`${serverAddress}/${student.Photo}`} />
            </span>
            <span>
              {student.Number}
            </span>
            <span>
              {student.Name}
            </span>
            <span>
              {
                parents && parents.find(i => i.ID == student.ParentID)?.Name
              }
            </span>
            <span>
              {
                classes && classes.find(i => i.ID == student.ClassID)?.Name
              }
            </span>
            <span><FaEdit className="mx-auto" /></span>
          </div>
        )
      }
    </div>
  )
}

export default BrowseStudent