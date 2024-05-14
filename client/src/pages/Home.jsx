import React from 'react'
import Typewriter from 'typewriter-effect';

import ellipse from "../assets/ellipse.png"

const Home = () => {
  return (
    <div>
      <p className="relative z-10 text-center pt-40 text-3xl font-semibold text-slate-300">
        <Typewriter
          options={{ delay: 50, loop: true }}
          onInit={(typewriter) => {
            typewriter
              .typeString('Easy')
              .deleteAll()
              .typeString('Simple')
              .deleteAll()
              .typeString('Useful')
              .deleteAll()
              .typeString('Welcome to the <span className="text-white">Student Information System</span>')
              .pauseFor(5000)
              .callFunction(() => {
                console.log('All strings were deleted');
              })
              .start();
          }}
        />
      </p>
      <img src={ellipse} className="w-96 absolute top-32 left-0 right-0 bottom-0 mx-auto" />
    </div>
  )
}

export default Home