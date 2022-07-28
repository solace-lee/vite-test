import { useEffect } from "react";
import { Button } from "antd";
// import { HTTP } from "@/common";
// import { initPVCore } from "@src/utils/cornerstonePV";
import { CONSTANTS, RenderingEngine, volumeLoader, imageLoader, Enums, setVolumesForViewports, getRenderingEngine } from "@cornerstonejs/core";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import { useAppSelector } from '@src/store';
import { BidirectionalTool, ToolGroupManager, Enums as csToolsEnums, SegmentationDisplayTool, BrushTool, segmentation } from "@cornerstonejs/tools";
// import type { Types } from "@cornerstonejs/core";

const { ORIENTATION } = CONSTANTS
function MprRender() {
  const pvImageIds = useAppSelector(state => state.pvImage.pvImageIds)
  const coreIsInit = useAppSelector(state => state.pvCore.init)
  const toolGroupId = `myToolGroupMPR`
  const renderingEngineId = 'myRenderingEngineMPR'
  // const renderingEngineId = 'renderingEnginePV'
  const segmentationId = 'MY_SEGMENTATION_ID';

  const renderImage = async (element: Array<HTMLElement>) => {
    const [elementA, elementB, elementC] = element
    // const cornerstonePV = await initPVCore({ originPath: window.location.origin })

    // const volumeId = 'cornerstoneStreamingImageVolume:CT_VOLUME_ID'
    const volumeId = 'cornerstoneStreamingImageVolume:CT_VOLUME_ID'
    const renderingEngine = new RenderingEngine(renderingEngineId)
    // const renderingEngine = getRenderingEngine(renderingEngineId)
    if (!renderingEngine) return


    console.log(pvImageIds, 'pvImageIds');


    let arr = pvImageIds || [
      'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5505&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=87',
      'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5504&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=88',
      'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5503&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=89',
      'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5502&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=90',
      'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5501&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=91',
      'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5500&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=92',
      'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5499&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=93',
      'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5498&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=94',
      'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940883.5497&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=95',
    ];


    // volumeLoader.registerUnknownVolumeLoader(cornerstoneStreamingImageVolumeLoader as any)
    // volumeLoader.registerVolumeLoader('cornerstoneStreamingImageVolume', cornerstoneStreamingImageVolumeLoader as any)

    const result = await imageLoader.loadAndCacheImages(arr);
    Promise.all(result).then(async res => {
      res.forEach((instanceMetaData, index) => {
        cornerstoneWADOImageLoader.wadors.metaDataManager.add(
          arr[index],
          instanceMetaData
        );
      })


      const volume = await volumeLoader.createAndCacheVolume(volumeId, {
        imageIds: arr
      })

      await volumeLoader.createAndCacheDerivedVolume(volumeId, {
        volumeId: segmentationId
      })

      segmentation.addSegmentations([
        {
          segmentationId,
          representation: {
            // The type of segmentation
            type: csToolsEnums.SegmentationRepresentations.Labelmap,
            // The actual segmentation data, in the case of labelmap this is a
            // reference to the source volume of the segmentation.
            data: {
              volumeId: segmentationId,
            },
          },
        },
      ]);

      const viewportId1 = 'CT_AXIAL';
      const viewportId2 = 'CT_SAGITTAL';
      const viewportId3 = 'CT_CORONAL';

      const viewportInput = [
        {
          viewportId: viewportId1,
          element: elementA as HTMLDivElement,
          type: Enums.ViewportType.ORTHOGRAPHIC,
          defaultOptions: {
            orientation: ORIENTATION.AXIAL,
          },
        },
        {
          viewportId: viewportId2,
          element: elementB as HTMLDivElement,
          type: Enums.ViewportType.ORTHOGRAPHIC,
          defaultOptions: {
            orientation: ORIENTATION.SAGITTAL,
          },
        },
        {
          viewportId: viewportId3,
          element: elementC as HTMLDivElement,
          type: Enums.ViewportType.ORTHOGRAPHIC,
          defaultOptions: {
            orientation: ORIENTATION.CORONAL,
          },
        },
      ];

      renderingEngine.setViewports(viewportInput)



      await volume.load((e: any) => {
        console.log(e, 'volume.load');
      });

      setVolumesForViewports(
        renderingEngine,
        [
          {
            volumeId,
            callback: ({ volumeActor }) => {
              // set the windowLevel after the volumeActor is created
              volumeActor
                .getProperty()
                .getRGBTransferFunction(0)
                .setMappingRange(-180, 220);
            },
          },
        ],
        [viewportId1, viewportId2, viewportId3]
      );

      

      renderingEngine.renderViewports([viewportId1, viewportId2, viewportId3]);
    });





  }

  function initToolGroup() {
    let toolGroup = ToolGroupManager.getToolGroup(toolGroupId)
    if (!toolGroup) {
      toolGroup = ToolGroupManager.createToolGroup(toolGroupId)

      toolGroup?.addTool(BidirectionalTool.toolName)
      toolGroup?.addTool(SegmentationDisplayTool.toolName)
      toolGroup?.addTool(BrushTool.toolName)
      toolGroup?.addViewport('CT_AXIAL', renderingEngineId);
      toolGroup?.addViewport('CT_SAGITTAL', renderingEngineId);
    }
    return toolGroup
  }

  async function setNext(s: number) {
    const toolGroup = initToolGroup()
    toolGroup?.setToolEnabled(SegmentationDisplayTool.toolName);

    await segmentation.addSegmentationRepresentations(toolGroupId, [
      {
        segmentationId,
        type: csToolsEnums.SegmentationRepresentations.Labelmap,
      },
    ]);

    toolGroup?.setToolActive(BrushTool.toolName, {
      bindings: [{ mouseButton: csToolsEnums.MouseBindings.Primary }],
    });

    // toolGroup?.setToolActive(SegmentationDisplayTool.toolName, {
    //   bindings: [
    //     {
    //       mouseButton: csToolsEnums.MouseBindings.Primary, // Left Click
    //     },
    //   ],
    // });
    // toolGroup?.setToolActive(BrushTool.toolName, {
    //   bindings: [
    //     {
    //       mouseButton: csToolsEnums.MouseBindings.Auxiliary, // Left Click
    //     },
    //   ],
    // });
  }



  useEffect(() => {
    // const request = new HTTP()
    // console.log({ request });

    if (!coreIsInit) return
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
      content.appendChild(elementC)
      renderImage([elementA, elementB, elementC])
    }

  }, [coreIsInit])

  return <div>
    <Button onClick={() => setNext(-1)}>上一张</Button>
    <Button onClick={() => setNext(1)}>下一张</Button>
    <div id='cornerstoneMPR-1_1'></div>
  </div>
}

export default MprRender
