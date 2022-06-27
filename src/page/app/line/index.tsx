import { useEffect, useState } from "react";
import * as THREE from 'three';

interface Props {
  dom: HTMLElement | null
}

function Line(props: Props) {

  useEffect(() => {
    const dom = document.getElementById('line');
    if (dom) initCanvas(dom)
    console.log('line');
  }, [])

  function initCanvas(dom: Element) {
    const renderer = new THREE.WebGLRenderer() // 新建渲染器
    renderer.setSize(window.innerWidth, window.innerHeight)
    dom.appendChild(renderer.domElement)

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
    camera.position.set(100, 0, 0) // 相机位置
    camera.lookAt(0, 0, 0) // 中心焦点

    const scene = new THREE.Scene()

    const material = new THREE.LineBasicMaterial({ color: 0x405eff }) // 材质
    const cubematerial = new THREE.LineBasicMaterial({ color: 0x00ff00 }) // 材质

    // 带顶点的几何体
    const points = []
    points.push(new THREE.Vector3(-10, 0, 0))
    points.push(new THREE.Vector3(0, 10, 0))
    points.push(new THREE.Vector3(10, 0, 0))
    points.push(new THREE.Vector3(-10, 0, 0))

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material)

    const boxpoints = []
    boxpoints.push(new THREE.Vector3(0, 0, 0))
    boxpoints.push(new THREE.Vector3(0, 10, 0))
    boxpoints.push(new THREE.Vector3(0, 0, -5))
    boxpoints.push(new THREE.Vector3(0, 0, 0))
    boxpoints.push(new THREE.Vector3(0, 0, 5))
    boxpoints.push(new THREE.Vector3(0, 10, 0))

    const geometryx = new THREE.BufferGeometry().setFromPoints(boxpoints);

    const cube = new THREE.Line(geometryx, cubematerial)

    scene.add(line)
    scene.add(cube)
    // renderer.render(scene, camera)

    function animate() { // 动画
      requestAnimationFrame(animate); // 渲染循环器
      // cube.rotation.x += 0.01; // 实体的X方向+0.01
      cube.rotation.y += 0.01; // 实体的y方向+0.01
      line.rotation.y += 0.01; // 实体的y方向+0.01
      // cube.rotation.z += 0.01; // 实体的y方向+0.01
      renderer.render(scene, camera); // 渲染使用摄像机位去渲染场景
    }
    animate()
  }

  return <div id='line'>测试</div>
}

export default Line