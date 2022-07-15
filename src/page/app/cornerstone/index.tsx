import { useEffect, useRef, useState } from "react";
import ImageRender from "./imageRender";
import * as cornerstone from '@src/utils/core/src/index'
import MprRender from "./mprRender";
// import TestRender from "./test/index";

declare global {
  interface Window {
    cornerstonePV: typeof cornerstone
  }
}
interface Props {
  dom: HTMLElement | null
}


function CornerstonePage(params: Props) {



  useEffect(() => {
  }, [])


  return <div>
    <div>CornerstonePageTest</div>
    <div style={{ display: 'flex' }}>
      <ImageRender keyValue='1_1' />
      {/* <ImageRender keyValue='1_2' /> */}
    </div>
    <MprRender />
    {/* <TestRender /> */}

  </div>
}

export default CornerstonePage
