// import IStackViewport from "@cornerstonejs/core/dist/esm/types/IStackViewport";
import { useEffect, useState } from "react";
import * as cornerstone from '@cornerstonejs/core'
// import * as cornerstone from '../../../utils/core'
import dicomParser from 'dicom-parser';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

interface Props {
  dom: HTMLElement | null
}

function CornerstonePage(params: Props) {

  async function renderImage(element: HTMLElement) {
    await cornerstone.init()

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

    const config = {
      maxWebWorkers: navigator.hardwareConcurrency || 1,
      startWebWorkersOnDemand: false,
      taskConfiguration: {
        decodeTask: {
          initializeCodecsOnStartup: true,
          strict: false
        },
      },
    };

    // cornerstoneWADOImageLoader.webWorkerManager.initialize(config);


    const renderingEngineId = 'myRenderingEngine'
    const viewportId = 'CT_AXIAL_STACK'
    const renderingEngine = new cornerstone.RenderingEngine(renderingEngineId)
    const viewportInput = {
      viewportId,
      element,
      align: 'center',
      type: cornerstone.Enums.ViewportType.STACK,
    }
    renderingEngine.enableElement(viewportInput)
    const viewport = renderingEngine.getViewport(viewportInput.viewportId)
    const arr = [
      'http://192.168.18.225:16600/api/main/wado?requestType=WADO&studyUID=1.2.392.200036.9116.2.6.1.16.1613459813.1574739488.992936&seriesUID=1.2.392.200036.9116.2.6.1.16.1613459813.1574758542.892335&objectUID=1.2.392.200036.9116.2.6.1.16.1613459813.1574758750.204108&type=application%2Fdicom&collectionId=c7a5c4df-1041-4946-b5ed-4f6dc961d57c&patientId=325617a4-ad33-4479-a6e1-3e41c75ddad5&contentType=dcm-jpeg'
    ]

    await viewport.setStack(arr.map(v => {
      // return 'wadouri:' + v + '&pv-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJzZXNzOjRiM2YwNmY3LTRjMDQtNDI2My1hNzZhLWNiMmMyNzVkZTlmNyIsImlhdCI6MTY1NjA2NDc5NX0.QAFy29r0QR3jH_-v-ZkKUiWlxMXA9pzMd1EakOabctI'
      return 'wadouri:' + v
    }), 0)

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
