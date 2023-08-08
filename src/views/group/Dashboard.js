import React, { useEffect, useState } from 'react'
import DevicesTable from '../../components/DeviceManagement/DevicesTable'
import Breadcrum from '../../components/Dashboard/Breadcrum'

export default function Dashboard({ group, data, loading }) {
    const [dataCounter, setDataCounter] = useState();
    const [value, setvalue] = useState("");
    const [ascendingSort, setAscendingSort] = useState(true);
    const [tempData, setTempData] = useState();

    useEffect(() => {
        let Online = 0;
        let Offline = 0;

        for (let i = 0; i < tempData?.length; i++) {
            if (tempData[i].status === "online") {
                Online += 1;
            } else {
                Offline += 1;
            }
        }

        setDataCounter([
            {
                id: 0,
                text: "Online",
                value: Online,
            },
            {
                id: 1,
                text: "Offline",
                value: Offline,
            },
            {
                id: 2,
                text: "Total",
                value: Online + Offline,
            },
            {
                id: 3,
                text: "Limits Reached",
                value: 9,
            },
            {
                id: 4,
                text: "Errors",
                value: 4,
            },
        ]);
    }, [tempData]);



    useEffect(() => {
        if (data) {
            setTempData(data);
        }
    }, [data]);

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
    return (
        <React.Fragment>
            <div>
                <div className="flex justify-start items-center ">
                    <p className=" font-bold text-sm ml-6 mt-2 ">{group && group.name}</p>
                </div>
                <div className="bg-[#BFC8CC] h-0.5 ml-6 mr-12"></div>
            </div>
            {loading ?
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FB9E00]"></div>
                </div> :
                <React.Fragment>
                    {dataCounter &&
                        <Breadcrum dataCounter={dataCounter} group={true} />}
                    {tempData &&
                        <DevicesTable
                            sortData={sortData}
                            tempData={tempData}
                            value={value}
                            filterData={filterData}
                            group={true} />
                    }
                </React.Fragment>
            }
        </React.Fragment>
    )
}
