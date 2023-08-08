import React, { useState } from "react";
import FileConfiguration from "../../components/Rates/FileConfiguration";


export default function Rates() {
  const [showModal, setShowModal] = useState(false);

  const navigateFileConfigScreen = () => {
    setShowModal(true);
  };

  return (
      <div>
      {showModal &&
        <FileConfiguration setShowModal={setShowModal} />
      }
        <div className=" flex-col items-center justify-start ml-6">
          <div className=" flex justify-start ">
            <button
              className="font-normal text-white rounded-3xl h-10 px-4  bg-[#6AB2DD]"
              onClick={navigateFileConfigScreen}
            >
              Upload Rate Sheet (excel)
            </button>
          </div>

          <div className="mr-14 leading-6 mt-10 h-full border border-[#E5E9EB] rounded-md border-solid">
            <table className=" w-full  ">
              <thead className="bg-[#EEEFF2] text-[#141516] h-10 font-bold text-left ">
                <tr className=" ">
                  <th className="  pl-4 pr-12 ">File Name </th>
                  <th className=" ">Schedule</th>
                  <th className="  pr-20 ">Devices</th>
                  <th className=" text-center pr-2 ">Actions </th>
                </tr>
              </thead>
              <tbody className="  ">
                <tr className="  h-20 text-left">
                  <td className="pl-4 text-[#388FCD] text-base leading-6 font-medium">
                    March 01, 2023_commit.xlsx
                  </td>
                  <td className="  text-[#141516] font-semibold text-base leading-6">
                    01 Mar 23 00:00:05 UTC
                  </td>
                  <td className="  text-[#141516]  font-semibold text-base leading-6">
                    With all tags:
                    <br /> MaxBR1, $150, Top-Up
                  </td>
                  <td className=" pr-2 mt-6 flex items-center justify-center">
                    <img src="/images/download.svg " alt="" />{" "}
                    <img className="ml-3" src="/images/delete.svg" alt="" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}
