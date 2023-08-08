import React, { useEffect, useState } from "react";
import DevicesTable from "../../components/DeviceManagement/DevicesTable";
import Breadcrum from "../../components/Dashboard/Breadcrum";

export default function DeviceManagementView({ data, loading }) {

  const [dataCounter, setDataCounter] = useState();
  const [value, setvalue] = useState("");
  const [ascendingSort, setAscendingSort] = useState(true);
  const [tempData, setTempData] = useState();


  useEffect(() => {
    let AutoTopUpOn = 0;
    let AutoTopUpOff = 0;

    for (let i = 0; i < data?.length; i++) {
      if (data[i].monthly_budget > 0.1) {
        AutoTopUpOn += 1;
      } else {
        AutoTopUpOff += 1;
      }
    }

    setDataCounter([
      {
        id: 0,
        text: "Auto Top-Up ON",
        value: AutoTopUpOn,
      },
      {
        id: 1,
        text: "Auto Top-Up OFF",
        value: AutoTopUpOff,
      },
      {
        id: 2,
        text: "Total",
        value: AutoTopUpOn + AutoTopUpOff,
      },
    ]);
  }, [tempData]);

  const sortData = (attr) => {
    if (ascendingSort) {
      const sortedData = tempData.sort((a, b) => {
        return a[attr] > b[attr] ? 1 : -1;
      });
      setTempData([...sortedData]);
    } else {
      const sortedData = tempData.sort((a, b) => {
        return a[attr] < b[attr] ? 1 : -1;
      });
      setTempData([...sortedData]);
    }
    setAscendingSort(!ascendingSort);
  };

  const filterData = (e) => {
    if (e.target.value !== "") {
      setvalue(e.target.value);
      const filterTable = data.filter((item) => {
        return item.name.toLowerCase().includes(
          e.target.value.toLowerCase()
        );
      });
      
      setTempData([...filterTable]);
    } else {
      setvalue(e.target.value);
      setTempData(data);
    }
  };

  useEffect(() => {
    setTempData(data);
  }, [data]);

  return (
    <React.Fragment>
      <div>
        <div className="flex justify-start items-center ">
          <p className=" font-bold text-sm ml-6 mt-2 ">
            Device Management Summary
          </p>
        </div>
        <div className="bg-[#BFC8CC] h-0.5 ml-6 mr-12"></div>
      </div>
      {loading ?
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FB9E00]"></div>
        </div> :
        <React.Fragment>
          {dataCounter && <Breadcrum dataCounter={dataCounter} />}
          {tempData && (
            <DevicesTable
              sortData={sortData}
              tempData={tempData}
              value={value}
              filterData={filterData}
            />
          )}
        </React.Fragment>
      }

    </React.Fragment>
  );
}
