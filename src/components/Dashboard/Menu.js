import React from "react";
import { useNavigate } from "react-router-dom";

export default function Menu({ organizations, setActive }) {
  const navigate = useNavigate()

  return (
    <div className="text-left ">
      <div className=" bg-[#0D0D0D] cursor-pointer border-[3px] border-[#585757] flex flex-col justify-evenly text-sm h-[270px] w-60 mr-12 text-white font-normal rounded-[10px] menu-shadow  ">
        {organizations.map((organization) => (
          <div key={organization.id} className=" h-12 py-3 hover:bg-[#464646] pl-4"
            onClick={() => { 
              setActive(organization.name.split(".")[1]) 
              navigate(`/dashboard/${organization.id}`)
              }}>
            {organization.name.split(".")[1]}
          </div>
        ))}
      </div>
    </div>
  );
}
