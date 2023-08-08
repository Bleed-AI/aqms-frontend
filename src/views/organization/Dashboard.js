import React, { useEffect, useState } from "react";
import Breadcrum from "../../components/Dashboard/Breadcrum";
import Table from "../../components/Dashboard/Table";
import { useParams } from "react-router-dom";



export default function Dashboard({data, loading}) {
  const { org_id } = useParams();
  const [dataCounter, setDataCounter] = useState(null);
  const [tempData, setTempData] = useState();
  const [value, setvalue] = useState("");
  const [isReady, setIsReady] = useState(false);


  const filterData = (e) => {
    if (e.target.value !== "") {
      setvalue(e.target.value);
      const filterTable = data.filter((item) => {
        return item.name.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setTempData([...filterTable]);
    } else {
      setvalue(e.target.value);
      setTempData(data);
    }
  };

  useEffect(() => {
    if(!tempData) return;

    let online_devices = 0;
    let offline_devices = 0;

    for (let i = 0; i < tempData.length; i++) {
      online_devices += tempData[i].online_device_count;
      offline_devices += tempData[i].offline_device_count;
    }

    setDataCounter([
      {
        id: 0,
        text: "Online",
        value: online_devices,
      },
      {
        id: 1,
        text: "Offline",
        value: offline_devices,
      },
      {
        id: 2,
        text: "Total",
        value: online_devices + offline_devices,
      },
    ]);

    setIsReady(true);
  }, [tempData]);

  useEffect(() => {
    
    setTempData(data);
  }, [data]);




  return (
    <React.Fragment>
      <div>
        <div className="flex justify-start items-center ">
          <p className=" font-bold text-sm ml-6 mt-2 ">Organization Summary</p>
        </div>
        <div className="bg-[#BFC8CC] h-0.5 ml-6 mr-12"></div>
      </div>
      {loading ?
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FB9E00]"></div>
        </div>:
        isReady &&
        <>          
          {dataCounter && <Breadcrum dataCounter={dataCounter} />}
          <Table org_id={org_id} data={tempData} value={value} filterData={filterData} />
        </>
      }
    </React.Fragment>
  );
}
