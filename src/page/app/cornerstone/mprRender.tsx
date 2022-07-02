import { useEffect, useRef, useState } from "react";
// import * as cornerstone from '@cornerstonejs/core'
// import { IStackViewport } from "@cornerstonejs/core/dist/esm/types";
// import * as cornerstone from '../../../utils/core/src/index'
// import { IStackViewport, VolumeLoaderFn } from "../../../utils/core/src/types";
import { Button } from "antd";
// import { HTTP } from "@/common";
import { initPVCore } from "../../../utils/cornerstonePV";
import { ORIENTATION } from "../../../utils/core/src/constants";
import wadoLoader from "../../../utils/cornerstonePV/imageLoader";
// import { ORIENTATION } from "@cornerstonejs/core/dist/esm/constants";
import { cornerstoneStreamingImageVolumeLoader } from "../../../utils/streaming-image-volume-loader/src/index";
// import { cornerstoneStreamingImageVolumeLoader } from "@cornerstonejs/streaming-image-volume-loader";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";

function MprRender() {

  const renderImage = async (element: Array<HTMLElement>) => {
    const [elementA, elementB, elementC] = element
    const cornerstonePV = await initPVCore({ originPath: window.location.origin })

    const renderingEngineId = 'myRenderingEngineMPR'
    // const volumeId = 'cornerstoneStreamingImageVolume:CT_VOLUME_ID'
    const volumeId = 'cornerstoneStreamingImageVolume:CT_VOLUME_ID'
    const renderingEngine = new cornerstonePV.RenderingEngine(renderingEngineId)

    let arr = [
      // 'http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.392.200036.9116.2.6.1.16.1613459813.1574739488.992936&seriesUID=1.2.392.200036.9116.2.6.1.16.1613459813.1574758542.892335&objectUID=1.2.392.200036.9116.2.6.1.16.1613459813.1574758750.204108&type=application%2Fdicom&collectionId=c7a5c4df-1041-4946-b5ed-4f6dc961d57c&patientId=325617a4-ad33-4479-a6e1-3e41c75ddad5&contentType=dcm-jpeg',
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

    arr = arr.map(v => {
      return 'wadouri:' + v
    });


    cornerstonePV.volumeLoader.registerUnknownVolumeLoader(cornerstoneStreamingImageVolumeLoader)
    cornerstonePV.volumeLoader.registerVolumeLoader('cornerstoneStreamingImageVolume', cornerstoneStreamingImageVolumeLoader)

    const result = await cornerstonePV.imageLoader.loadAndCacheImages(arr);
    Promise.all(result).then(async res => {
      // console.log(cornerstoneWADOImageLoader);
      
      res.forEach((instanceMetaData, index) => {
        cornerstoneWADOImageLoader.wadors.metaDataManager.add(
          arr[index],
          instanceMetaData
        );
      })
      

      const volume = await cornerstonePV.volumeLoader.createAndCacheVolume(volumeId, { imageIds: arr })
      const viewportId1 = 'CT_AXIAL';
      const viewportId2 = 'CT_SAGITTAL';

      const viewportInput = [
        {
          viewportId: viewportId1,
          element: elementA as HTMLDivElement,
          type: cornerstonePV.Enums.ViewportType.ORTHOGRAPHIC,
          defaultOptions: {
            orientation: ORIENTATION.AXIAL,
          },
        },
        {
          viewportId: viewportId2,
          element: elementB as HTMLDivElement,
          type: cornerstonePV.Enums.ViewportType.ORTHOGRAPHIC,
          defaultOptions: {
            orientation: ORIENTATION.SAGITTAL,
          },
        },
      ];

      renderingEngine.setViewports(viewportInput)



      await volume.load((e: any) => {
        console.log(e, 'e');
      });

      cornerstonePV.setVolumesForViewports(
        renderingEngine,
        [{ volumeId }],
        [viewportId1, viewportId2]
      );

      renderingEngine.renderViewports([viewportId1, viewportId2]);
    });





  }

  function setNext(s: number) {
    // const viewport = renderingEngineRef.current.getViewport('CT_AXIAL_STACK')
    // viewport.scroll(s, true, true)
  }



  useEffect(() => {
    // const request = new HTTP()
    // console.log({ request });

    const content = document.getElementById('cornerstoneMPR-1_1')
    if (content) {
      content.style.display = 'flex';

      const elementA: HTMLDivElement = document.createElement('div')
      const elementB: HTMLDivElement = document.createElement('div')
      const elementC: HTMLDivElement = document.createElement('div')
      elementA.style.width = '500px'
      elementA.style.height = '500px'
      elementB.style.width = '500px'
      elementB.style.height = '500px'
      elementC.style.width = '500px'
      elementC.style.height = '500px'
      content.appendChild(elementA)
      content.appendChild(elementB)
      wadoLoader({ originPath: window.location.origin })
      renderImage([elementA, elementB, elementC])
    }

  }, [])

  return <div>
    <Button onClick={() => setNext(-1)}>上一张</Button>
    <Button onClick={() => setNext(1)}>下一张</Button>
    <div id='cornerstoneMPR-1_1'></div>
  </div>
}

export default MprRender
