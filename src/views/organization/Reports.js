import React, { useEffect, useState } from "react";
import ReportsTable from "../../components/Reports/ReportsTable";

export default function Reports({ reportsData, loading }) {
  const [ascendingSort, setAscendingSort] = useState(true);
  const [value, setvalue] = useState("");
  const [tempData, setTempData] = useState("");

  const filterData = (e) => {
    if (e.target.value !== "") {
      setvalue(e.target.value);
      const filterTable = reportsData.filter((item) => {
        return item.name.toLowerCase().includes(
          e.target.value.toLowerCase()
        );
      });
      setTempData([...filterTable]);
    } else {
      setvalue(e.target.value);
      setTempData(reportsData);
    }
  };

  useEffect(() => {
    setTempData(reportsData);
  }, [reportsData]);

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

  return (
    <React.Fragment>
      {loading ?

        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FB9E00]"></div>
        </div> :
        <div className="flex flex-col justify-between ">
          {tempData && (
            <ReportsTable
              sortData={sortData}
              reportsData={tempData}
              value={value}
              filterData={filterData}
              reportsPage={true}
            />
          )}
        </div>

      }
    </React.Fragment>
  );
}
