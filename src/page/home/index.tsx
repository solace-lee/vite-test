import { Button } from "antd";
import { useEffect, useState } from "react";
// import { HTTP } from "@/common";
import { Outlet } from "react-router-dom";

function PatientList() {

  useEffect(() => {
    getList()
  }, [])

  function getList() {
    // console.log((new HTTP()) === (new HTTP()), (new HTTP())());
    // console.log((new HTTP()), '哈哈', HTTP());
    
    // const http = new HTTP().get('/all')
  }

  return <div>
    <div style={{ display: 'flex' }}>
      <Button type="primary">患者列表</Button>
      <Button type="default">勾画</Button>
      <Button>MPR</Button>
      <Button>融合</Button>
    </div>
    <Outlet />
  </div>
}

export default PatientList