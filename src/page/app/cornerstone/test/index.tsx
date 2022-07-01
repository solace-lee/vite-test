import { useEffect, useRef, useState } from "react";

import { Button } from "antd";
import {
  RenderingEngine,
  Types,
  Enums,
  volumeLoader,
  CONSTANTS,
} from '../../../../utils/core';
import {
  initDemo,
  createImageIdsAndCacheMetaData,
  setTitleAndDescription,
  setCtTransferFunctionForVolumeActor,
} from './helpers/index';

const { ViewportType } = Enums;
const { ORIENTATION } = CONSTANTS;


function MprRender() {

  async function renderImage(element: HTMLDivElement[]) {
    await initDemo();

    const imageIds = await createImageIdsAndCacheMetaData({
      StudyInstanceUID:
        '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
      SeriesInstanceUID:
        '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
      wadoRsRoot: 'https://d1qmxk7r72ysft.cloudfront.net/dicomweb',
      type: 'VOLUME',
    });
    console.log(imageIds, 'imageIds');
    

    const renderingEngineId = 'myRenderingEngine';
    const renderingEngine = new RenderingEngine(renderingEngineId);

    // Create a stack viewport
    const viewportId = 'CT_SAGITTAL_STACK';
    const viewportInput = {
      viewportId,
      type: ViewportType.ORTHOGRAPHIC,
      element: element[0],
      defaultOptions: {
        orientation: ORIENTATION.SAGITTAL,
        background: [0.2, 0, 0.2],
      }
    };

    renderingEngine.enableElement(viewportInput as Types.PublicViewportInput);

    const viewport = (
      renderingEngine.getViewport(viewportId)
    );

    const volumeName = 'CT_VOLUME_ID'; // Id of the volume less loader prefix
    const volumeLoaderScheme = 'cornerstoneStreamingImageVolume'; // Loader id which defines which volume loader to use
    const volumeId = `${volumeLoaderScheme}:${volumeName}`; // VolumeId with loader id + volume id

    const volume = await volumeLoader.createAndCacheVolume(volumeId, {
      imageIds,
    });

    volume.load();

    (viewport as Types.IVolumeViewport).setVolumes([
      { volumeId, callback: setCtTransferFunctionForVolumeActor },
    ]);

    viewport.render();
  }

  function setNext(s: number) {
    // const viewport = renderingEngineRef.current.getViewport('CT_AXIAL_STACK')
    // viewport.scroll(s, true, true)
  }



  useEffect(() => {
    // const request = new HTTP()
    // console.log({request});

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
      setTimeout(() => {
        renderImage([elementA, elementB, elementC])

      }, 5000);
    }

  }, [])

  return <div>
    <div>测试页面</div>
    <Button onClick={() => setNext(-1)}>上一张</Button>
    <Button onClick={() => setNext(1)}>下一张</Button>
    <div id='cornerstoneMPR-1_1'></div>
  </div>
}

export default MprRender
