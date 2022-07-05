import { Button, Card, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { Request } from "../../common";
import { PatientDataModel } from "./patientDataModal";

function PatientList() {
  const [modelVisible, setModelVisible] = useState(false)
  const [currentDetail, setCrrentDetail] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    getData()
  }, [])

  function editToken() {
    setTitle('修改Token')
    setCrrentDetail(localStorage.getItem('token') || '')
    setModelVisible(true)
  }

  function comfirmModal() {
    const isToken = title === '修改Token'
    setTitle('')
    localStorage.setItem(isToken ? 'token' : 'patientID', currentDetail || '')
    setModelVisible(false)
  }

  function editID() {
    setTitle('修改患者ID')
    setCrrentDetail(localStorage.getItem('patientID') || '')
    setModelVisible(true)
  }


  async function getData() {
    const patientID = localStorage.getItem('patientID') || ''
    if (patientID) {

      const res = await Request.getInstance().get(`/api/main/patient/${patientID}/all`)
      if (res.data.code === 200) {
        const data = parseData(res.data.data as PatientDataModel)
        console.log(res.data.data, data, '患者数据');
      }
    }
  }

  function parseData(patientData:PatientDataModel) {
    const newData = {}
    patientData.cases.forEach()
    return newData
  }

  function extraDetail(): React.ReactNode {
    return <div>
      <Button onClick={getData}>加载患者数据</Button>
      <Button onClick={editID}>修改patientID</Button>
      <Button onClick={editToken}>修改token</Button>
    </div>
  }

  return <div>
    <Card title='患者信息' extra={extraDetail()}>
      患者列表
    </Card>
    <Modal
      visible={modelVisible}
      title={title}
      okText='确定'
      cancelText='取消'
      onCancel={() => setModelVisible(false)}
      onOk={comfirmModal}
    >
      <Input value={currentDetail} onChange={(e) => setCrrentDetail(e.target.value)} />
    </Modal>
  </div>
}

export default PatientList