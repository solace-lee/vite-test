import { type } from 'os';
import { useEffect } from 'react';

interface Canvas extends HTMLElement {
  height: number,
  width: number,
  clientWidth: number,
  clientHeight: number,
  getContext: Function
}

export default function WebglTest(params: any) {

  useEffect(() => {
    init('canvasId');
  }, [])

  function init(id: string) {
    const canvas: Canvas = document.getElementById(id) as Canvas;
    let gl: WebGLRenderingContext;
    if (canvas) {
      canvas.width = Math.floor(canvas.clientWidth * window.devicePixelRatio);
      canvas.height = Math.floor(canvas.clientHeight * window.devicePixelRatio);

      let names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
      let context = null;
      for (let i = 0; i < names.length; ++i) {
        try {
          context = canvas.getContext(names[i]);
        } catch (e) { }
        if (context) {
          break;
        }
      }
      gl = context;
      gl.viewport(0, 0, canvas.width, canvas.height)
      console.log(gl);

    }
  }



  return <div>
    webgl测试页
    <canvas id='canvasId' />
  </div>
}