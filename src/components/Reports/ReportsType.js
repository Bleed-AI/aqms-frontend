import React, { useEffect, useState } from "react";
import RadioButton from "../Common/RadioButton";

export default function ReportsType({ downloadFile }) {
  const [radioActive, setRadioActive] = useState(1);
  const [rangeActive, setRangeActive] = useState(1);


  return (
    <div className=" ml-9 mt-3 mr-12 ">
      <div className=" mt-4 px-8 flex justify-start lg:text-sm xl:text-base 2xl:text-xl w-full items-center h-[60px] bg-[#E5E9EB] border border-[#0F0E0E]">
        <h6 className=" font-bold leading-6 ">Reports</h6>
      </div>
      <div className="px-8 flex items-center justify-start border lg:text-sm xl:text-base 2xl:text-xlleading-6 border-[#0F0E0E] border-t-0 h-[76px]">
        <span className="w-24 text-left font-semibold ">Type:</span>
        <div className=" mr-10 flex  items-center">
          <RadioButton
            radioActive={radioActive}
            setRadioActive={setRadioActive}
            number={1}
          />
          <span className=" ml-[14px] ">All</span>
        </div>
        <div className="flex items-center ">
          <RadioButton
            radioActive={radioActive}
            setRadioActive={setRadioActive}
            number={2}
          />
          <span className="ml-[14px]">Errors</span>
        </div>
      </div>
      <div className="pl-8 pr-4 flex justify-between w-full lg:text-sm xl:text-base 2xl:text-xl items-center border border-[#0F0E0E] border-t-0 h-[76px]">
        <div className="flex items-center">
        <div className=" w-fit text-left font-semibold text-xl leading-6">
          Range:
        </div>
        <div className="flex justify-evenly ml-7  flex-row w-fit ">
          <div className=" mr-[29px] flex  items-center">
            <RadioButton
              radioActive={rangeActive}
              setRadioActive={setRangeActive}
              number={1}
            />
            <span className=" ml-[14px] ">All</span>
          </div>
          <div className="  flex ml-3  items-center">
            <RadioButton
              radioActive={rangeActive}
              setRadioActive={setRangeActive}
              number={2}
            />
            <span className=" ml-[14px] ">Yesterday</span>
          </div>
          <div className=" ml-10 flex  items-center">
            <RadioButton
              radioActive={rangeActive}
              setRadioActive={setRangeActive}
              number={3}
            />
            <span className=" ml-[14px] ">Past 7-Days</span>
          </div>
          <div className=" ml-10 flex  items-center">
            <RadioButton
              radioActive={rangeActive}
              setRadioActive={setRangeActive}
              number={4}
            />
            <span className=" ml-[14px] ">This Month</span>
          </div>
          <div className=" ml-10 flex  items-center">
            <RadioButton
              radioActive={rangeActive}
              setRadioActive={setRangeActive}
              number={5}
            />
            <span className=" ml-[14px] ">Customs Date</span>
          </div>
        </div>
        </div>
        <div className=" w-fit flex justify-end">
          
              <button className="bg-[#6AB2DD] cursor-pointer rounded-3xl text-sm xl:text-base  text-white h-8 w-32 xl:w-40"
              onClick={downloadFile}>
                Export to Excel
              </button>
          
        </div>
      </div>
    </div>
  );
}
