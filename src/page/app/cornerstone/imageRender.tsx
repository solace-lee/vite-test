import { useEffect, useRef, useState } from "react";
import { eventTarget, Enums } from '@cornerstonejs/core'
import { IStackViewport } from "@cornerstonejs/core/dist/esm/types";
// import * as cornerstone from '../../../utils/core/src/index'
// import { IStackViewport } from "../../../utils/core/src/types";
import { Button } from "antd";
import { Request } from "@/common";
import { initPVCore } from "../../../utils/cornerstonePV";
import { useAppSelector } from '../../../store';
import { ToolGroupManager, Enums as csToolsEnums } from "@cornerstonejs/tools/index";
import { ZoomTool, WindowLevelTool, addTool } from "@cornerstonejs/tools/index";

interface Props {
  keyValue: String
}

function ImageRender(props: Props) {
  const { keyValue } = props
  const pvImageIds = useAppSelector(state => state.pvImage.pvImageIds)

  const c3dRef: any = useRef({})

  async function renderImage(element: HTMLElement) {

    const cornerstonePV = await initPVCore({ originPath: window.location.origin })

    const renderingEngineId = `RenderingEngine${keyValue}`
    const viewportId = 'CT_AXIAL_STACK'
    const renderingEngine = new cornerstonePV.RenderingEngine(renderingEngineId)

    c3dRef.current = { renderingEngine, viewportId, renderingEngineId }

    const viewportInput = {
      viewportId,
      element: element as HTMLDivElement,
      align: 'center',
      type: cornerstonePV.Enums.ViewportType.STACK,
    }
    renderingEngine.enableElement(viewportInput)
    const viewport = renderingEngine.getViewport(viewportInput.viewportId)

    let arr = pvImageIds?.map(v => {
      return 'wadouri:' + v
    }) || [
        // 'http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.392.200036.9116.2.6.1.16.1613459813.1574739488.992936&seriesUID=1.2.392.200036.9116.2.6.1.16.1613459813.1574758542.892335&objectUID=1.2.392.200036.9116.2.6.1.16.1613459813.1574758750.204108&type=application%2Fdicom&collectionId=c7a5c4df-1041-4946-b5ed-4f6dc961d57c&patientId=325617a4-ad33-4479-a6e1-3e41c75ddad5&contentType=dcm-jpeg',
        'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5505&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=87',
        'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5504&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=88',
        'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5503&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=89',
        'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5502&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=90',
        'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5501&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=91',
        'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5500&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=92',
        'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5499&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=93',
        'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940884.5498&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=94',
        'wadouri:http://cleanown.cn:20009/api/main/wado?requestType=WADO&studyUID=1.2.840.113704.1.111.10216.1633940392.41&seriesUID=1.2.840.113704.1.111.10208.1633940850.8&objectUID=1.2.840.113704.1.111.8964.1633940883.5497&type=application%2Fdicom&collectionId=6e1a6eb5-e19d-4a1f-8a8d-48a50c15e822&patientId=3c2c1f6f-0031-4d5a-be98-4101d6f0371f&contentType=dcm-jpeg&index=95',
      ]

    await (viewport as IStackViewport).setStack(arr, 3);


    // debugger
    (window as any).cornerstone = cornerstonePV;
    (window as any).viewport = viewport;

    viewport.render()

    addTools(viewportId, renderingEngineId) // 添加工具
  }

  console.log(eventTarget, 'eventTarget');
  function _addCornerstoneEventListeners(): void {
    // Clear any listeners that may already be set

    eventTarget.addEventListener(
      // TOOLS_EVENTS.ANNOTATION_MODIFIED,
      
    );
  }


  // 添加工具
  function addTools(viewportId: string, renderingEngineId: string) {
    console.log(ToolGroupManager, 'ToolGroupManager');

    addTool(ZoomTool)
    addTool(WindowLevelTool)
    const toolGroupId = `myToolGroup${keyValue}`
    const toolGroup = ToolGroupManager.createToolGroup(toolGroupId)
    c3dRef.current.toolGroupId = toolGroupId
    console.log(toolGroup, `myToolGroup${keyValue} 添加工具`);

    toolGroup?.addTool(ZoomTool.toolName)
    toolGroup?.addTool(WindowLevelTool.toolName)

    toolGroup?.addViewport(viewportId, renderingEngineId)
  }

  function setNext(s: number) {
    const viewport = c3dRef.current.renderingEngine.getViewport('CT_AXIAL_STACK')
    viewport.scroll(s, true, true)
  }

  function zoomTool() {
    const toolGroup = ToolGroupManager.getToolGroup(c3dRef.current.toolGroupId)

    toolGroup?.setToolActive(ZoomTool.toolName, {
      bindings: [
        {
          mouseButton: csToolsEnums.MouseBindings.Auxiliary
        }
      ]
    })
    console.log(toolGroup);

  }

  function wwc() {
    const toolGroup = ToolGroupManager.getToolGroup(c3dRef.current.toolGroupId)
    if (!toolGroup) {
      console.log('未知');

      return
    }
    toolGroup.setToolActive(WindowLevelTool.toolName, {
      bindings: [
        {
          mouseButton: csToolsEnums.MouseBindings.Primary
        }
      ]
    })
    console.log(toolGroup);
  }



  useEffect(() => {
    // const request = new Request()
    // console.log({ request });

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
    <Button onClick={zoomTool}>缩放工具</Button>
    <Button onClick={wwc}>窗宽窗位工具</Button>
    <div id={`cornerstone3D-${keyValue}`} onMouseDown={(e) => { e.stopPropagation(); e.preventDefault() }}></div>
  </div>
}

export default ImageRender
