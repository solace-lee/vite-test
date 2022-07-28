import { Button, Card, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { Request } from "@src/common";
import { CasesModel, SeriesModel } from "@src/types/patientDataModal";
import { useAppDispatch, useAppSelector } from '@src/store';
import { updatePatientInfo, updatePatientCases } from '@src/store/patientReducer';
import { updatePvImageIds } from '@src/store/pvImageReducer';

function PatientList() {
  const [modelVisible, setModelVisible] = useState(false)
  const [currentDetail, setCrrentDetail] = useState('')
  const [title, setTitle] = useState('')
  const storeDispatch = useAppDispatch()
  const patientCases = useAppSelector(state => state.patient.cases)
  const patientInfo = useAppSelector(state => state.patient.info)

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
      if (res.data.code === 200 && res.data.data) {
        storeDispatch(updatePatientCases(res.data.data.cases as CasesModel[] || null))
        const { patient_name, modality, image_count, patient_sex, patient_id, id, fk_collection_id } = res.data.data
        storeDispatch(updatePatientInfo({
          patientName: patient_name,
          modality,
          imageCount: image_count,
          patientSex: patient_sex,
          patientId: patient_id,
          id,
          fkCollectionId: fk_collection_id
        }))
        console.log(res.data.data, '患者数据');
      } else {
        storeDispatch(updatePatientCases(null))
        storeDispatch(updatePatientInfo(null))
      }
    }
  }

  function extraDetail(): React.ReactNode {
    return <div>
      <Button onClick={getData}>加载患者数据</Button>
      <Button onClick={editID}>修改patientID</Button>
      <Button onClick={editToken}>修改token</Button>
    </div>
  }

  function selectSeries(seriesItem: SeriesModel, studyUID: string): void {
    const baseUrl = 'http://cleanown.cn:20009/api/main/wado?requestType=WADO&'
    const { sop_instance_list, series_instance_uid, fk_collection_id } = seriesItem

    const ids: string[] = []
    Object.values(sop_instance_list).forEach(v => {
      const url = `wadouri:${baseUrl}studyUID=${studyUID}&seriesUID=${series_instance_uid}&objectUID=${v.sop_UID}&type=application%2Fdicom&collectionId=${fk_collection_id}&patientId=${patientInfo?.id}&contentType=dcm-jpeg`
      ids.push(url)
    })
    storeDispatch(updatePvImageIds(ids.length ? ids : null))
    message.success('图像列表创建成功')
  }

  function renderSeries(seriesItem: SeriesModel, index: number, studyUID: string): React.ReactNode {
    return <div key={index} style={{ padding: '0 20px', margin: '6px', display: 'flex', alignItems: 'center', border: '1px solid #405eff', justifyContent: 'space-between' }}>
      <div style={{ padding: '12px' }}>
        <span>序列：{seriesItem.series_number},{seriesItem.series_description} | </span>
        <span>分辨率：{seriesItem.columns}/{seriesItem.rows} | </span>
        <span>窗宽窗位: {seriesItem.window_width}/{seriesItem.window_center} | </span>
        <span>层数: {seriesItem.num_of_instances} | </span>
        <span>结构集数量: {seriesItem.structureSequences.length} | </span>
        <span>dose数量: {seriesItem.dose.length} | </span>
        <span>plan数量: {seriesItem.plan.length} | </span>
      </div>
      <Button type='primary' onClick={() => selectSeries(seriesItem, studyUID)}>选它</Button>
    </div>
  }

  function renderCases(casesItem: CasesModel, index: number): React.ReactNode {
    return <div key={index}>
      <div>
        <span>cases日期：{casesItem.study_dateTime} | </span>
        <span>studyInstanceUid： {casesItem.study_instance_uid}</span>
        {casesItem.series && casesItem.series.map((v, i) => renderSeries(v, i, casesItem.study_instance_uid))}
      </div>
    </div>
  }

  return <div>
    <Card title='患者信息' extra={extraDetail()}>
      <div>
        <span>患者姓名：{patientInfo?.patientName} | </span>
        <span>图像类型：{patientInfo?.modality} | </span>
        <span>图像数量：{patientInfo?.imageCount} </span>
      </div>
      {patientCases && patientCases.map(renderCases)}
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