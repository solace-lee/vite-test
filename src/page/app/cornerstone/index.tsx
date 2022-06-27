import { Button } from "antd";
import { useEffect, useState } from "react";
import * as core from '@cornerstonejs/core'

interface Props {
  dom: HTMLElement | null
}

function CornerstonePage(params: Props) {

  async function renderImage(element: HTMLElement) {
    const c3d = await core.init()
    const renderingEngineId = 'myRenderingEngine'
    const viewportId = 'CT_AXIAL_STACK'
    const renderingEngine = new core.RenderingEngine(renderingEngineId)
    const viewportInput = {
      viewportId,
      element,
      align: 'center',
      type: core.Enums.ViewportType.STACK,
    }
    renderingEngine.enableElement(viewportInput)
    const viewport = renderingEngine.getViewport(viewportInput.viewportId)

    // viewport.setStack(imageIds, 60)

    viewport.render()
  }



  useEffect(() => {
    const content = document.getElementById('cornerstone3D-1-1')
    if (content) {
      let element = document.createElement('div')
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
