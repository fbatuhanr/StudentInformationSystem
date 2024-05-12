import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverAddress } from '../settings'

const RegisterStudent = () => {

  const [cities, setCities] = useState([])

  useEffect(()=>{

    axios.get(`${serverAddress}/cities`)
          .then((response) => {
            console.log(response)

            setCities(response.data.map(i => i.NAME))
          })
          .catch((error) => {
            console.log(error)
          })
  }, [])

  return (
    <div>
      <div className="px-12 py-8 font-outfit">
        <h2 className="text-2xl font-bold mt-2">Student Informations</h2>
        <div className="px-4 py-8">
          <div className="flex justify-between gap-x-2">
            <div className="basis-1/3">
              <h3 className="text-xl font-semibold ps-2 mb-1">ID</h3>
              <input type="text" placeholder="type here..."
                className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl" />
            </div>
            <div className="basis-1/3">
              <h3 className="text-xl font-semibold ps-2 mb-1">Name</h3>
              <input type="text" placeholder="type here..."
                className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl" />
            </div>
            <div className="basis-1/3">
              <h3 className="text-xl font-semibold ps-2 mb-1">Class</h3>
              <input type="text" placeholder="type here..."
                className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl" />
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-y-1">
            <div className="w-full">
              <h3 className="text-xl font-semibold ps-2 mb-1">Address</h3>
              <input type="text" placeholder="type here..."
                className="w-full bg-[#0D0D0D] text-[#A1A1A1] p-4 rounded-2xl" />
            </div>
            <div>
              <select className="min-w-48 bg-[#0D0D0D] text-[#A1A1A1] p-3 rounded-2xl">
                <option value="">City</option>
                {
                  cities && cities.map(city => <option value={city}>{city}</option>)
                }
              </select>
            </div>
          </div>
          <div className="mt-6">
            <div className="w-full">
              <h3 className="text-xl font-semibold ps-2 mb-1">Photo</h3>
              <input type="file" className="w-full bg-[#0D0D0D] text-[#A1A1A1] p-4 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      <hr className="h-3 bg-[rgb(13,13,13)] border-0" />

      <div className="px-12 py-8 font-outfit">
        <h2 className="text-2xl font-bold mt-2">Parent Informations</h2>
        <div className="px-4 py-8">
          <div className="flex justify-between gap-x-12">
            <div className="basis-1/2">
              <h3 className="text-xl font-semibold ps-2 mb-1">Name</h3>
              <input type="text" placeholder="type here..."
                className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl" />
            </div>
            <div className="basis-1/2">
              <h3 className="text-xl font-semibold ps-2 mb-1">Phone Number</h3>
              <input type="text" placeholder="type here..."
                className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl" />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold ps-2 mb-1">Email</h3>
            <input type="text" placeholder="type here..."
              className="min-w-64 bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl" />
          </div>
        </div>

      </div>

      <hr className="h-3 bg-[rgb(13,13,13)] border-0" />

      <div className="flex justify-center py-8">
        <button type="submit" className="min-w-96 bg-[#DBBA12] rounded-2xl py-3 text-2xl [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-[#0D0D0D]">
          Submit
        </button>
      </div>
    </div>
  )
}

export default RegisterStudent