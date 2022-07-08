import { Button } from "antd";
import { useEffect, useState } from "react";
// import { use } from "react-router";
// import { HTTP } from "@/common";
import { Outlet } from "react-router-dom";

function PatientList() {

  useEffect(() => {
    getList()
  }, [])

  function getList() {

  }

  return <div>
    <div style={{ display: 'flex', justifyContent: 'end' }}>
      <Button type="primary">患者列表</Button>
      <Button type="default">勾画</Button>
      <Button>MPR</Button>
      <Button>融合</Button>
    </div>
    <Outlet />
  </div>
}

export default PatientList