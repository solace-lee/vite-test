import { useEffect, useRef, useState } from "react";
// import * as cornerstone from '@cornerstonejs/core'
// import { IStackViewport } from "@cornerstonejs/core/dist/esm/types";
import * as cornerstone from '../../../utils/core/src/index'
import { IStackViewport } from "../../../utils/core/src/types";
import { Button } from "antd";
import { HTTP } from "@/common";
import { initPVCore } from "../../../utils/cornerstonePV";

interface Props {
  keyValue: String
}

function ImageRender(props: Props) {
  const { keyValue } = props
  console.log(props);

  const renderingEngineRef: any = useRef(null)

  async function renderImage(element: HTMLElement) {

    const cornerstonePV = await initPVCore({ originPath: window.location.origin })

    const renderingEngineId = `RenderingEngine${keyValue}`
    const viewportId = 'CT_AXIAL_STACK'
    const renderingEngine = new cornerstonePV.RenderingEngine(renderingEngineId)

    renderingEngineRef.current = renderingEngine

    const viewportInput = {
      viewportId,
      element: element as HTMLDivElement,
      align: 'center',
      type: cornerstonePV.Enums.ViewportType.STACK,
    }
    renderingEngine.enableElement(viewportInput)
    const viewport = renderingEngine.getViewport(viewportInput.viewportId)
    const arr = [
      'http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.392.200036.9116.2.6.1.16.1613459813.1574739488.992936&seriesUID=1.2.392.200036.9116.2.6.1.16.1613459813.1574758542.892335&objectUID=1.2.392.200036.9116.2.6.1.16.1613459813.1574758750.204108&type=application%2Fdicom&collectionId=c7a5c4df-1041-4946-b5ed-4f6dc961d57c&patientId=325617a4-ad33-4479-a6e1-3e41c75ddad5&contentType=dcm-jpeg',
      'http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5505&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=87',
      'http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5504&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=88',
      'http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5503&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=89',
      'http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5502&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=90',
      'http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5501&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=91',
      'http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5500&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=92',
      'http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5499&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=93',
      'http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5498&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=94',
      'http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940883.5497&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=95',
    ]

    await (viewport as IStackViewport).setStack(arr.map(v => {
      return 'wadouri:' + v
    }), 3);

    // debugger
    (window as any).cornerstone = cornerstonePV;
    (window as any).viewport = viewport;

    viewport.render()
  }

  function setNext(s: number) {
    const viewport = renderingEngineRef.current.getViewport('CT_AXIAL_STACK')
    viewport.scroll(s, true, true)
  }



  useEffect(() => {
    const request = new HTTP()
    console.log({ request });

    const content = document.getElementById(`cornerstone3D-${keyValue}`)
    if (content) {
      const element: HTMLDivElement = document.createElement('div')
      element.style.width = '500px'
      element.style.height = '500px'
      content.appendChild(element)
      renderImage(element)
    }

  }, [])

  return <div>
    <Button onClick={() => setNext(-1)}>上一张</Button>
    <Button onClick={() => setNext(1)}>下一张</Button>
    <div id={`cornerstone3D-${keyValue}`}></div>
  </div>
}

export default ImageRender
