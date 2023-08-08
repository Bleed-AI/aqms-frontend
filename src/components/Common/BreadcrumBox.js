import React from "react";

export default function BreadcrumBox({text, number}) {
  return (
    <div className=" mt-5 rounded-[10px] border border-solid border-black h-[134px] md:w-[200px] 2xl:mr-5 2xl:w-[268px] ">
      <div className="flex items-center justify-end">
        <span className=" text-[#788188] leading-6 text-base font-semibold pr-2.5 pt-3.5 ">
          {text}
        </span>
      </div>
      <div className=" h-[1.22px] bg-[#BFC8CC]"></div>
      <div className=" mt-5 flex justify-end pr-2.5">
        <span className="leading-6 font-bold text-4xl text-end">
          {number}
        </span>
      </div>
    </div>
  );
}
