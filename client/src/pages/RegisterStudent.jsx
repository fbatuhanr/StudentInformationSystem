import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverAddress } from '../settings'

import HumanImg1 from "../assets/human-1.png"

import Select from 'react-select'
import { Controller, useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { setIsLoading } from '../redux/features/StatusSlice'
import { useNavigate } from 'react-router-dom'

const RegisterStudent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cities, setCities] = useState([])
  const [classes, setClasses] = useState([])
  const [canteenProducts, setCanteenProducts] = useState([])

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
    fetchData("canteen").then(data => setCanteenProducts(data))
  }, [])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    if (!data) return

    dispatch(setIsLoading(true))

    const resultData = {
      ...data,
      photo: data.photo[0],
      restrictedProducts: data.restrictedProducts.map(i => i.value)
    }
    console.log(resultData)

    try {
      const headers = { 'Content-Type': 'multipart/form-data' };
      const response = await axios.post(`${serverAddress}/student`, resultData, { headers });
      console.log(response)

      dispatch(setIsLoading(false))
      navigate("/dashboard/browse-students")
    }
    catch (error) {
      console.log(error)
    }

    dispatch(setIsLoading(false))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="post" enctype="multipart/form-data">
      <div className="py-10">
        <h2 className="text-[1.7rem] font-bold text-center">Register Student</h2>
        <div className="h-0.5 mt-1 bg-[#cccccc] w-64 mx-auto"></div>
      </div>

      <div className="px-4">
        <div className="px-12 pb-8 font-outfit">
          <h2 className="text-2xl font-semibold mt-2">Student Informations</h2>
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
                  className="w-full bg-[#0D0D0D] text-[#A1A1A1] p-3 rounded-2xl">
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
                  className="w-1/2 bg-[#0D0D0D] text-[#A1A1A1] p-4 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>

        <hr className="h-1 mx-24 rounded-xl bg-[rgb(13,13,13)] border-0" />

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

        <hr className="h-1 mx-24 rounded-xl bg-[rgb(13,13,13)] border-0" />

        <div className="px-12 py-8 font-outfit">
          <h2 className="text-2xl font-bold mt-2">Canteen Informations</h2>
          <div className="px-4 py-8">
            <div className="flex justify-between gap-x-12">
              <div className="basis-1/2">
                <h3 className="text-xl font-semibold ps-2 mb-1">Restricted Products</h3>
                {
                  canteenProducts &&
                  <Controller
                    control={control}
                    name="restrictedProducts"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isMulti
                        name="colors"
                        options={canteenProducts.map(i => { return { label: i.Name, value: i.ID } })}
                        value={value ? value : []}
                        onChange={onChange}
                        classNames={{
                          control: () => '!bg-[#0D0D0D] !border-none !rounded-xl !py-1.5',
                          menu: () => '!bg-[#0D0D0D] !border-none',
                          option: () => '!bg-[#29156C] hover:!bg-[#3c209a] !cursor-pointer',
                          multiValue: () => '!bg-[#4F22F2]',
                          multiValueLabel: () => '!bg-[#4F22F2] !text-[#ffffff] !pe-2',
                          multiValueRemove: () => '!bg-[#20183F] !text-[#ffffff]',
                        }}
                      />
                    )}
                  />
                }
              </div>
              <div className="basis-1/2">
                <h3 className="text-xl font-semibold ps-2 mb-1">Balance</h3>
                <input type="text" placeholder="type here..." {...register("balance", { required: true })}
                  className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl" />
              </div>
            </div>
          </div>

        </div>

        <hr className="h-1 mx-24 rounded-xl bg-[rgb(13,13,13)] border-0" />

        <div className="flex justify-center py-8">
          <button type="submit" className="min-w-96 bg-[#DBBA12] rounded-2xl py-3 text-2xl [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-[#0D0D0D]">
            Submit
          </button>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-12">
        <img src={HumanImg1} className="w-32" />
      </div>
    </form>
  )
}

export default RegisterStudent