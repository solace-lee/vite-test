import { useEffect, useState } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface Props {
  dom: HTMLElement | null
}

function Text(props: Props) {

  useEffect(() => {
    const dom = document.getElementById('text');
    if (dom) initCanvas(dom)
    console.log('text');
  }, [])

  function initCanvas(dom: Element) {
    const renderer = new THREE.WebGLRenderer() // 新建渲染器
    renderer.setSize(window.innerWidth, window.innerHeight)
    dom.appendChild(renderer.domElement)

    const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 3000)
    camera.position.set(1500, 0, 1500) // 相机位置
    camera.lookAt(0, 0, 0) // 中心焦点

    const scene = new THREE.Scene()
    const light = new THREE.AmbientLight(0x404040)
    const material = new THREE.LineBasicMaterial({ color: 0x405eff }) // 材质
    const cubematerial = new THREE.LineBasicMaterial({ color: 0x00ff00 }) // 材质

    scene.add(light)

    const axesHelper = new THREE.AxesHelper(1000)
    scene.add(axesHelper)
    // 对象加载器
    let cube: THREE.Group
    const loader = new GLTFLoader()
    loader.load('./public/a.gltf', function (gltf) {
      gltf.scene.children.forEach(mesh => scene.add(mesh))
      animate()
    })
    renderer.render(scene, camera)
    console.log(scene);
    
    function animate() { // 动画
      requestAnimationFrame(animate); // 渲染循环器
      // cube.rotation.x += 0.01; // 实体的X方向+0.01
      if (cube) cube.rotation.y += 0.01; // 实体的y方向+0.01
      // cube.rotation.z += 0.01; // 实体的y方向+0.01
      renderer.render(scene, camera); // 渲染使用摄像机位去渲染场景
    }

  }

  return <div id='text'>测试</div>
}

export default Text