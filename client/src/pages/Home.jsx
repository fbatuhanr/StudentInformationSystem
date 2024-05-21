import React from 'react'
import Typewriter from 'typewriter-effect';

import ellipse from "../assets/ellipse.png"
import { Link } from 'react-router-dom';

import HeroImg from "../assets/hero.png"
import CalendarImg from "../assets/calendar.png"

import HumanImg1 from "../assets/human-1.png"
import HumanImg2 from "../assets/human-2.png"
import StatsImg from "../assets/stats.png"
import PhoneImg from "../assets/phone.png"
import MessageImg from "../assets/message.png"

const Home = () => {

  return (
    <>
      <section className="pt-8 px-6 md:pt-0 md:px-12 md:bg-none bg-hero bg-no-repeat bg-[top_right] bg-[length:256px] max-w-6xl mx-auto flex flex-col md:flex-row">
        <div className="basis-full md:basis-1/2 flex flex-col justify-center md:ps-6">
          <h3 className="text-2xl font-thin">
            <Typewriter
              onInit={(typewriter) => {
                typewriter.pauseFor(2500).typeString('Manage and Track').start();
              }}
            />
          </h3>
          <h1 className="text-4xl md:text-5xl font-semibold mt-4 mb-10">
            <span className="text-[#F2D541] text-4xl md:text-5xl">Transforming School </span>
            Through Technology
          </h1>
          <h2 className="text-xl font-light leading-6">
            Your partner in creating a productive school environment with innovative tracking and management solutions
          </h2>
          <Link to="/dashboard/overview" className="[text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-[#0d0d0db6] w-full md:w-[210px] py-2 text-center mt-8 md:mt-12 border border-[#000000] bg-[#6841F2] rounded-3xl text-2xl font-semibold">
            Start Now
          </Link>
        </div>
        <div className="hidden md:block md:basis-1/2 p-8">
          <img src={HeroImg} width="100%" height="auto" />
        </div>
      </section>

      <section className="mt-28 md:mt-44">
        <div className="bg-gradient-to-r from-[#472DA6] to-[#6841F2]">
          <div className="max-w-6xl px-4 md:px-12 py-12 md:py-12 mx-auto flex relative md:static">
            <div className="basis-20 md:basis-2/5 md:relative">
              <img src={CalendarImg} className="absolute w-36 -top-6 left-0" />
            </div>
            <div className="md:basis-3/5 flex flex-col">
              <h2 className="text-2xl md:text-3xl font-bold ps-24 md:ps-12">
                Innovative School Management
              </h2>
              <p className="text-xl md:text-xl font-light pt-4 pb-2 pe-12">
                Simplifying administrative tasks and enhancing student monitoring for effective school leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 md:mt-36 px-12 md:px-24 max-w-6xl mx-auto min-h-96 flex flex-col-reverse md:flex-row bg-blur-ellipse bg-no-repeat bg-contain">
        <div className="basis-full md:basis-1/2 flex flex-col justify-center">
          <h2 className="text-3xl md:text-5xl font-medium">Optimize Your School Operations</h2>
          <p className="mt-8 mb-3 text-2xl font-light leading-6">Innovative Solutions for School Management</p>
          <p className="text-2xl font-light text-[#F2D541]"><u>Partnering for Success:</u> Your Trusted Resource in School Governance</p>
        </div>
        <div className="basis-full md:basis-1/2 md:p-8">
          <img src={StatsImg} width="100%" height="auto" />
        </div>
      </section>
    </>
  )
}

export default Home