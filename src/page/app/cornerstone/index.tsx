// import IStackViewport from "@cornerstonejs/core/dist/esm/types/IStackViewport";
import { useEffect, useState } from "react";
import * as cornerstone from '@cornerstonejs/core'
// import * as cornerstone from '../../../utils/core'
import dicomParser from 'dicom-parser';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import { IStackViewport } from "@cornerstonejs/core/dist/esm/types";

interface Props {
  dom: HTMLElement | null
}

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneWADOImageLoader.configure({
  useWebWorkers: true,
  decodeConfig: {
    convertFloatPixelDataToInt: false,
  },
  beforeSend: (xhr: any) => {
    xhr.setRequestHeader('pv-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJzZXNzOjRiM2YwNmY3LTRjMDQtNDI2My1hNzZhLWNiMmMyNzVkZTlmNyIsImlhdCI6MTY1NjA2NDc5NX0.QAFy29r0QR3jH_-v-ZkKUiWlxMXA9pzMd1EakOabctI')
  }
});

function CornerstonePage(params: Props) {

  async function renderImage(element: HTMLElement) {
    await cornerstone.init()

    const config = {
      webWorkerTaskPaths: [
        "http://localhost:3001/WADOImageLoader/610.bundle.min.worker.js",
        "http://localhost:3001/WADOImageLoader/888.bundle.min.worker.js"
      ],
      maxWebWorkers: navigator.hardwareConcurrency || 1,
      startWebWorkersOnDemand: false,
      taskConfiguration: {
        decodeTask: {
          initializeCodecsOnStartup: false,
          strict: false,
        },
        sleepTask: {
          sleepTime: 3000,
        },
      },
    };

    cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
    (window as any).cornerstone = cornerstone


    const renderingEngineId = 'myRenderingEngine'
    const viewportId = 'CT_AXIAL_STACK'
    const renderingEngine = new cornerstone.RenderingEngine(renderingEngineId)
    const viewportInput = {
      viewportId,
      element: element as HTMLDivElement,
      align: 'center',
      type: cornerstone.Enums.ViewportType.STACK,
    }
    renderingEngine.enableElement(viewportInput)
    const viewport = renderingEngine.getViewport(viewportInput.viewportId)
    const arr = [
      'http://192.168.18.225:16600/api/main/wado?requestType=WADO&studyUID=1.2.392.200036.9116.2.6.1.16.1613459813.1574739488.992936&seriesUID=1.2.392.200036.9116.2.6.1.16.1613459813.1574758542.892335&objectUID=1.2.392.200036.9116.2.6.1.16.1613459813.1574758750.204108&type=application%2Fdicom&collectionId=c7a5c4df-1041-4946-b5ed-4f6dc961d57c&patientId=325617a4-ad33-4479-a6e1-3e41c75ddad5&contentType=dcm-jpeg',
      'http://192.168.18.225:16600/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5505&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=87',
      'http://192.168.18.225:16600/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5504&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=88',
      'http://192.168.18.225:16600/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5503&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=89',
      'http://192.168.18.225:16600/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5502&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=90',
      'http://192.168.18.225:16600/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5501&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=91',
      'http://192.168.18.225:16600/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5500&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=92',
      'http://192.168.18.225:16600/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5499&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=93',
      'http://192.168.18.225:16600/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5498&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=94',
      'http://192.168.18.225:16600/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940883.5497&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=95',
    ]

    await (viewport as IStackViewport).setStack(arr.map(v => {
      return 'wadouri:' + v
    }), 2)

    viewport.render()
  }



  useEffect(() => {
    const content = document.getElementById('cornerstone3D-1-1')
    if (content) {
      const element: HTMLDivElement = document.createElement('div')
      element.style.width = '500px'
      element.style.height = '500px'
      content.appendChild(element)
      renderImage(element)
    }

  }, [])

  return <div>
    <div>CornerstonePageTest</div>
    <div id='cornerstone3D-1-1'></div>
  </div>
}

export default CornerstonePage
