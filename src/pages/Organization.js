import React, { useEffect, useState } from 'react'
import BaseLayout from '../components/Common/BaseLayout'
import Dashboard from '../views/organization/Dashboard'
import OrganizationSettings from '../views/organization/OrganizationSettings'
import Reports from '../views/organization/Reports'
import DeviceManagementView from '../views/organization/DeviceManagement'
import { useUser } from '../utils/user'
import { useParams } from 'react-router-dom'
import { useDevices, useGroups } from '../utils/organization'



export default function Organization() {
  const { org_id, view } = useParams();
  const users = useUser();
  const [activeView, setActiveView] = useState("Dashboard")
  const [groupData, loading] = useGroups(org_id);
  const [deviceData, deviceLoading] = useDevices(org_id);


  useEffect(() => {
    if (view) {
      setActiveView(view)
    }
  }, [view])



  return (
      <BaseLayout activeView={activeView} setActiveView={setActiveView}>
        {activeView === "Dashboard" && <Dashboard data={groupData} loading={loading} />}
        {activeView === "Reports" && <Reports reportsData={deviceData} loading={deviceLoading} />}
        {activeView === "Device Management" && <DeviceManagementView data={deviceData} loading={deviceLoading} />}
        {activeView === "Organizational Settings" && users && <OrganizationSettings users={users} org_id={org_id} />}
      </BaseLayout>
  )
}
