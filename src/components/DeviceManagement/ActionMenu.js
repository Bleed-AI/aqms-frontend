import React from "react";

export default function ActionMenu({setAction}) {
  return (
    <div>
      <div className=" absolute bg-white text-sm font-bold flex-col items-center justify-start text-left z-10 h-[253px] ml-6  shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] w-[266px]">
        <div className="mt-7 pl-12 cursor-pointer" onClick={()=>setAction("Daily Max STP")}>
        Set Max STP Per Day
        </div>
        <div className="mt-4 pl-12 cursor-pointer" onClick={()=>setAction("Weekly Max STP")}>
        Set Max STP Per Week
        </div>
        <div className="mt-4 pl-5 flex cursor-pointer"
        onClick={()=>setAction("Yearly Budget")}>
          <img src="/images/yearlyBudget.svg" className="pr-2" alt="yearly-budget" /> Set
          Yearly Budget
        </div>
        <div className="mt-4 pl-5 flex cursor-pointer"
        onClick={()=>setAction("Monthly Budget")}>
          {" "}
          <img src="/images/monthlyBudget.svg" alt="monthly-budget" className="pr-2" />
          Set Monthly Budget
        </div>
        <div className="mt-4 pl-5 flex cursor-pointer"
        onClick={()=>setAction("Yearly Budget Start Date")}>
          {" "}
          <img src="/images/yearlyBudgetStart.svg" alt="yearly-budget-date" className="pr-2" />
          Set Yearly Budget Start Date
        </div>
        <div className="mt-4 pl-12 cursor-pointer"
        onClick={()=>setAction("Top Up Increaments in MB")} >
        Top-Up Increment in MB
        </div>
      </div>
    </div>
  );
}
