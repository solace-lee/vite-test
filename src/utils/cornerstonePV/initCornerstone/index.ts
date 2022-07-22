import initProviders from "./initProviders";
import initCornerstoneWADOImageLoader from "./initCornerstoneWADOImageLoader";
import initVolumeLoader from "./initVolumeLoader";
import { init as csRenderInit, RenderingEngine } from "@cornerstonejs/core";
import { init as csToolsInit, addTool } from "@cornerstonejs/tools";
import {
  BaseTool,
  AnnotationTool,
  PanTool,
  TrackballRotateTool,
  DragProbeTool,
  WindowLevelTool,
  ZoomTool,
  StackScrollTool,
  StackScrollMouseWheelTool,
  VolumeRotateMouseWheelTool,
  MIPJumpToClickTool,
  LengthTool,
  ProbeTool,
  RectangleROITool,
  EllipticalROITool,
  BidirectionalTool,
  PlanarFreehandROITool,
  ArrowAnnotateTool,
  CrosshairsTool,
  RectangleScissorsTool,
  CircleScissorsTool,
  SphereScissorsTool,
  RectangleROIThresholdTool,
  RectangleROIStartEndThresholdTool,
  SegmentationDisplayTool,
  BrushTool,
  AngleTool,
  MagnifyTool,
} from "@cornerstonejs/tools";

export default async function initPVstone() {
  initProviders();
  initCornerstoneWADOImageLoader({
    originPath: window.location.origin,
    authFunc: () => localStorage.getItem("token"),
  });
  initVolumeLoader();
  await csRenderInit();
  await csToolsInit();

  // 初始化工具
  addTool(ZoomTool);
  addTool(WindowLevelTool);
  addTool(BidirectionalTool);

  // 初始化renderingEngine
  const renderingEngineId = "renderingEnginePV";
  new RenderingEngine(renderingEngineId);
}
