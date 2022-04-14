import { useEffect, useState } from "react";
import * as three from "three";

interface Props {
  dom: HTMLElement | null
}

function ThreeD(props: Props) {

  useEffect(() => {
    const dom = document.getElementById('test');
    if (dom) initCanvas(dom)
    console.log('xxx');
  }, [])

  function initCanvas(dom: Element) {
    const scene = new three.Scene(); // 场景
    const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // 摄像机

    const geometry = new three.BoxGeometry(); // 立方体
    const material = new three.MeshBasicMaterial({ color: 0xfe9002 }); // 材质
    const cube = new three.Mesh(geometry, material); // 构建一个实体

    scene.add(cube); // 添加到场景中
    camera.position.z = 5; // 机位调整

    const renderer = new three.WebGLRenderer(); // 渲染器
    renderer.setSize(window.innerWidth, window.innerHeight, false); // 设置渲染尺寸
    dom.appendChild(renderer.domElement);

    function animate() { // 动画
      requestAnimationFrame(animate); // 渲染循环器
      cube.rotation.x += 0.01; // 实体的X方向+0.01
      cube.rotation.y += 0.01; // 实体的y方向+0.01
      cube.rotation.z += 0.01; // 实体的y方向+0.01
      renderer.render(scene, camera); // 渲染使用摄像机位去渲染场景
    }
    animate()
  }

  return <div id='test'>测试</div>
}

export default ThreeD