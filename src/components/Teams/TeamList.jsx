import React from 'react'
import { useState, useEffect } from 'react';

const TeamList = ({ teams }) => {
    return (
        <div className="mt-55 overflow-auto flex justify-center flex-row flex-wrap gap-15 md:mr-10 pb-15">

            {/* Display of all NFL teams */}
            {teams.map(team => (
                <div key={team.team_id} className="h-45 w-45 md:h-55 md:w-55 lg:h-70 lg:w-70 items-center justify-center flex flex-col gap-2 font-semibold bg-gray-700 rounded-full border-4 border-amber-400 hover:cursor-pointer">

                    {/* Team Name */}
                    <p className="text-[11px] md:text-[14px] lg:text-[18px]">{team.name}</p>

                    {/* Team Logo */}
                    <img 
                        src={team.logoUrl}
                        alt={`${team.name} Logo`}
                        className="h-18 w-18 md:h-22 md:w-22 lg:h-30 lg:w-30 rounded-4xl border-3 border-amber-400"
                    />

                    {/* Team Record */}
                    <p className="text-[11px] md:text-[14px] lg:text-[18px]">{team.wins}-{team.losses}-{team.ties}</p>

                </div>
            ))}

        </div>
    )
}

export default TeamList
