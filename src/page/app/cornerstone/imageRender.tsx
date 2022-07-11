import { useEffect, useRef, useState } from "react";
// import * as cornerstone from '@cornerstonejs/core'
// import { IStackViewport } from "@cornerstonejs/core/dist/esm/types";
import * as cornerstone from '../../../utils/core/src/index'
import { IStackViewport } from "../../../utils/core/src/types";
import { Button } from "antd";
import { Request } from "@/common";
import { initPVCore } from "../../../utils/cornerstonePV";
import { useAppSelector } from '../../../store';

interface Props {
  keyValue: String
}

function ImageRender(props: Props) {
  const { keyValue } = props
  const pvImageIds = useAppSelector(state => state.pvImage.pvImageIds)

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

    let arr = pvImageIds?.map(v => {
      return 'wadouri:' + v
    }) || []


    // const result = await cornerstonePV.imageLoader.loadAndCacheImages(arr);
    // Promise.all(result).then(res => {
    //   console.log(res, 'result');
    // });

    await (viewport as IStackViewport).setStack(arr, 3);


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
    <div id={`cornerstone3D-${keyValue}`}></div>
  </div>
}

export default ImageRender
