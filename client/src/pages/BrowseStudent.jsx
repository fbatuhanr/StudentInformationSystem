import React from 'react'
import { FaEdit, FaUser } from 'react-icons/fa'

const BrowseStudent = () => {
  return (
    <div className="py-8">

      <div className="grid grid-cols-6 mb-2 py-1 font-semibold bg-[#1D0E50] text-center text-lg">
        <h5>Photo</h5>
        <h5>ID</h5>
        <h5>Name</h5>
        <h5>Parent</h5>
        <h5>Class</h5>
        <h5>#</h5>
      </div>

      <div className="grid grid-cols-6 my-2 py-2 font-semibold bg-[#5726FC] text-center">
        <span><FaUser className="mx-auto"/></span>
        <span>999</span>
        <span>Ali</span>
        <span>Veli</span>
        <span>9-A</span>
        <span><FaEdit className="mx-auto"/></span>
      </div>
    </div>
  )
}

export default BrowseStudent