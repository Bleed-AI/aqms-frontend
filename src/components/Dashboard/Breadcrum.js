import React from "react";
import BreadcrumBox from "../Common/BreadcrumBox";

export default function Breadcrum({ dataCounter, group }) {
  return (
   <div>
      <div className={`flex  items center justify-between px-6 ${group ?"md:w-full xl:w-[85%] 2xl:w-11/12":"md:w-[80%] xl:w-[65%] 2xl:w-[55%]"} `}>
        {dataCounter.map((item) => (
          <BreadcrumBox key={item.id} text={item.text} number={item.value} />
        ))}
      </div>
      <div className="bg-[#BFC8CC] h-0.5 ml-6 mr-12 mt-[71.49px]"></div>
    </div>
  );
}
