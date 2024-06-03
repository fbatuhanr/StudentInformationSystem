import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { serverAddress } from '../settings'

import HumanImg5 from "../assets/human-5.png"
import { FaEraser, FaPlus } from 'react-icons/fa'
import { FiRefreshCw } from 'react-icons/fi'
import Swal from 'sweetalert2'

import DashboardTitle from '../components/DashboardTitle.jsx'

const Classes = () => {

  /* FETCHING EXIST CLASSES FROM DB */
  const [classes, setClasses] = useState([])
  const classesRefs = useRef([]);
  useEffect(() => {

    axios.get(`${serverAddress}/class`)
      .then((response) => {
        console.log(response)

        setClasses(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  /* HANDLING NEW CLASS ADD TO DB */
  const [newClass, setNewClass] = useState("")
  const handleAddNewClass = () => {
    if (newClass.trim().length === 0) return

    axios.post(`${serverAddress}/class`, { name: newClass })
      .then((response) => {
        console.log(response)
        window.location.reload();
      })
      .catch(error => console.error(error))
  }

  /* HANDLING UPDATE CLASS */
  const handleUpdateButton = async (id, refIndex) => {

    const swalResult = await Swal.fire({
      title: "Do you want to update it?",
      showCancelButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#29156C"
    })
    if (!swalResult.isConfirmed) return

    axios.put(`${serverAddress}/class/${id}`, {
      name: classesRefs.current[refIndex].value
    })
      .then((response) => {
        console.log(response)
        window.location.reload();
      })
      .catch(error => console.error(error));
  }

  /* HANDLING REMOVE CLASS */
  const handleRemoveButton = async (id) => {

    const swalResult = await Swal.fire({
      title: "Do you want to delete it?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#F52525"
    })
    if (!swalResult.isConfirmed) return

    axios.delete(`${serverAddress}/class/${id}`)
      .then((response) => {

        console.log(response)

        if (response.data.error) {
          Swal.fire({ title: "Error", text: response.data.error, icon: "error" })
          return
        }
        window.location.reload();
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      <DashboardTitle title="Manage Classes" />
      
      <div className="px-4 pb-8">
        <div className="md:w-1/2 mx-auto mb-4">
          {
            classes.length > 0 &&
            <>
              <h3 className="text-xl font-semibold ps-2 mb-3">Class List</h3>
              <div className="flex justify-between text-sm font-medium px-3">
                <h4>Name</h4>
                <h4>Action</h4>
              </div>
              {
                classes.map((cls, index) =>
                  <div key={index} className="flex items-center gap-x-5 my-1">
                    <input type="text" placeholder="type here..." className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl"
                      defaultValue={cls.ClassName}
                      ref={(e) => classesRefs.current[index] = e}
                    />
                    <button type="button" onClick={() => handleRemoveButton(cls.ClassID)}>
                      <FaEraser className="text-2xl" />
                    </button>
                    <button type="button" onClick={() => handleUpdateButton(cls.ClassID, index)}>
                      <FiRefreshCw className="text-2xl" />
                    </button>
                  </div>
                )
              }
            </>
          }
        </div>

        <div className="md:w-3/5 mx-auto my-8">
          <h3 className="text-xl font-semibold ps-2 mb-1">Add New Class</h3>
          <div className="flex items-center gap-x-5">
            <input type="text" placeholder="type here..." value={newClass} onChange={(e) => setNewClass(e.target.value)}
              className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl" />
            <button type="button" onClick={handleAddNewClass}>
              <FaPlus className="text-3xl" />
            </button>
          </div>
        </div>

      </div>
      <div className="absolute -bottom-8 -left-10">
        <img src={HumanImg5} className="w-40" />
      </div>
    </>
  )
}

export default Classes