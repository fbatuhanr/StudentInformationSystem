import React from 'react'

const RegisterStudent = () => {
  return (
    <div className="px-8 py-4 font-outfit">
      <h2 className="text-2xl font-bold">Student Information</h2>
      <div className="p-4">
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
        
        <div className="mt-4 flex flex-col gap-y-1">
          <div className="w-full">
            <h3 className="text-xl font-semibold ps-2 mb-1">Address</h3>
            <input type="text" placeholder="type here..."
              className="w-full bg-[#0D0D0D] text-[#A1A1A1] p-4 rounded-2xl" />
          </div>
          <div>
            <select className="min-w-48 bg-[#0D0D0D] text-[#A1A1A1] p-3 rounded-2xl">
              <option value="">City</option>
            </select>
          </div>
        </div>

        <div>
          
        </div>

      </div>
    </div>
  )
}

export default RegisterStudent