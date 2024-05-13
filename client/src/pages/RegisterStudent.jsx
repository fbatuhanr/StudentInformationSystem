import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverAddress } from '../settings'

import HumanImg4 from "../assets/human-4.png"

import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { setIsLoading } from '../redux/features/StatusSlice'

const RegisterStudent = () => {

  const dispatch = useDispatch();

  const [cities, setCities] = useState([])
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

    fetchData("city").then(data => setCities(data))
    fetchData("class").then(data => setClasses(data))
  }, [])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    if(!data) return

    dispatch(setIsLoading(true))

    const resultData = { ...data, photo: data.photo[0] }
    console.log(resultData)

    try {
      const headers = { 'Content-Type': 'multipart/form-data' };
      const response = await axios.post(`${serverAddress}/student`, resultData, { headers });
      console.log(response)
    }
    catch(error){
      console.log(error)
    }

    dispatch(setIsLoading(false))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="post" enctype="multipart/form-data">
      <div className="relative">
        <div className="px-12 py-8 font-outfit">
          <h2 className="text-2xl font-bold mt-2">Student Informations</h2>
          <div className="px-4 py-8">
            <div className="flex justify-between gap-x-2">
              <div className="basis-1/3">
                <h3 className="text-xl font-semibold ps-2 mb-1">Name</h3>
                <input type="text" placeholder="type here..." {...register("name", { required: true })}
                  className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl" />
              </div>
              <div className="basis-1/3">
                <h3 className="text-xl font-semibold ps-2 mb-1">Number</h3>
                <input type="text" placeholder="type here..." {...register("number", { required: true })}
                  className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl" />
              </div>
              <div className="basis-1/3">
                <h3 className="text-xl font-semibold ps-2 mb-1">Class</h3>
                <select {...register("classId", { required: true })}
                  className="min-w-48 bg-[#0D0D0D] text-[#A1A1A1] p-3 rounded-2xl">
                  <option value="">Select...</option>
                  {
                    classes && classes.map(cls => <option key={cls.ID} value={cls.ID}>{cls.Name}</option>)
                  }
                </select>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-y-1">
              <div className="w-full">
                <h3 className="text-xl font-semibold ps-2 mb-1">Address</h3>
                <input type="text" placeholder="type here..." {...register("address", { required: true })}
                  className="w-full bg-[#0D0D0D] text-[#A1A1A1] p-4 rounded-2xl" />
              </div>
              <div>
                <select {...register("cityId", { required: true })}
                  className="min-w-48 bg-[#0D0D0D] text-[#A1A1A1] p-3 rounded-2xl">
                  <option value="">City</option>
                  {
                    cities && cities.map(city => <option key={city.ID} value={city.ID}>{city.Name}</option>)
                  }
                </select>
              </div>
            </div>
            <div className="mt-6">
              <div className="w-full">
                <h3 className="text-xl font-semibold ps-2 mb-1">Photo</h3>
                <input type="file" {...register("photo", { required: true })}
                  className="w-11/12 bg-[#0D0D0D] text-[#A1A1A1] p-4 rounded-2xl" />
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
                <input type="text" placeholder="type here..." {...register("parentName", { required: true })}
                  className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl" />
              </div>
              <div className="basis-1/2">
                <h3 className="text-xl font-semibold ps-2 mb-1">Phone Number</h3>
                <input type="text" placeholder="type here..." {...register("parentPhoneNumber", { required: true })}
                  className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl" />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold ps-2 mb-1">Email</h3>
              <input type="text" placeholder="type here..." {...register("parentEmail", { required: true })}
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

        <div className="absolute top-[35%] -right-16">
          <img src={HumanImg4} className="w-42" />
        </div>
      </div>
    </form>
  )
}

export default RegisterStudent