import React from 'react'

const DashboardTitle = ({ title }) => {
    return (
        <div className="pt-8 pb-10">
            <h2 className="text-[1.7rem] font-bold text-center">{title}</h2>
            <div className="h-0.5 mt-1 bg-[#cccccc] w-64 mx-auto"></div>
        </div>
    )
}

export default DashboardTitle