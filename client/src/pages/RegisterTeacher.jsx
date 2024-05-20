import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverAddress } from '../settings'

import HumanImg2 from "../assets/human-2.png"

import Select from 'react-select'
import { Controller, useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { setIsLoading } from '../redux/features/StatusSlice'
import { useNavigate } from 'react-router-dom'

const RegisterTeacher = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    fetchData("class").then(data => setClasses(data))
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
      classes: data.classes.map(i => i.value)
    }
    console.log(resultData)

    try {
      const response = await axios.post(`${serverAddress}/teacher`, resultData);
      console.log(response)

      dispatch(setIsLoading(false))
      navigate("/dashboard/browse-teachers")
    }
    catch (error) {
      console.log(error)
    }

    dispatch(setIsLoading(false))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="py-10">
        <h2 className="text-[1.7rem] font-bold text-center">Register Teacher</h2>
        <div className="h-0.5 mt-1 bg-[#cccccc] w-64 mx-auto"></div>
      </div>
      <div className="relative">
        <div className="px-12 pb-8 font-outfit">
          <h2 className="text-2xl font-bold mt-2">Teacher Informations</h2>
          <div className="px-4 py-10">
            <div className="flex justify-center gap-x-2 px-12">
              <div className="basis-1/2">
                <h3 className="text-xl font-semibold ps-2 mb-1">Name</h3>
                <input type="text" placeholder="type here..." {...register("name", { required: true })}
                  className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl" />
              </div>
              <div className="basis-1/2">
                <h3 className="text-xl font-semibold ps-2 mb-1">Classes</h3>
                {
                  classes &&
                  <Controller
                    control={control}
                    name="classes"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isMulti
                        name="classes"
                        options={classes.map(i => { return { label: i.Name, value: i.ID } })}
                        onChange={onChange}
                        value={value ? value : []}
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
            </div>
          </div>
        </div>
      </div>

      <hr className="h-3 bg-[rgb(13,13,13)] border-0" />

      <div className="flex justify-center py-8">
        <button type="submit" className="min-w-96 bg-[#DBBA12] rounded-2xl py-3 text-2xl [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-[#0D0D0D]">
          Register Teacher
        </button>
      </div>

      <div className="absolute -bottom-5 -right-20">
        <img src={HumanImg2} className="w-56" />
      </div>
    </form>
  )
}

export default RegisterTeacher