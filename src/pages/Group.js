import React, { useEffect, useState } from "react";
import BaseLayout from "../components/Common/BaseLayout";
import { useParams } from "react-router-dom";
import { useGroup, useGroupDevices } from "../utils/group";
import Dashboard from "../views/group/Dashboard";
import Reports from "../views/organization/Reports";
import Rates from "../views/group/Rates";
import DeviceManagementView from "../views/organization/DeviceManagement";

export default function Group() {
  const { org_id, group_id,view } = useParams();
  const [activeView, setActiveView] = useState("Dashboard");
  const [group] = useGroup(org_id, group_id);
  const [data, loading] = useGroupDevices(org_id, group_id);


  useEffect(() => {
    if (view) {
        setActiveView(view)
    }
}, [view])

  return (
    <BaseLayout activeView={activeView} setActiveView={setActiveView} group={group}>
        {activeView === "Dashboard" && data && <Dashboard data={data} loading={loading} group={group} />}
        {activeView === "Reports" && <Reports reportsData={data} loading={loading}/>}
        {activeView === "Rates" && <Rates />}
        {activeView === "Device Management" && <DeviceManagementView data={data} loading={loading}/>}
    </BaseLayout>
  )
}
