import FrameOfReferenceSpecificAnnotationManager, {
  defaultFrameOfReferenceSpecificAnnotationManager,
} from './annotation/FrameOfReferenceSpecificAnnotationManager';
import * as annotationLocking from './annotation/annotationLocking';
import * as annotationSelection from './annotation/annotationSelection';

import {
  getAnnotations,
  addAnnotation,
  removeAnnotation,
  getDefaultAnnotationManager,
  getViewportSpecificAnnotationManager,
  getAnnotation,
} from './annotation/annotationState';

import {
  addSegmentationRepresentations,
  removeSegmentationsFromToolGroup,
} from './segmentation';

export {
  // annotations
  FrameOfReferenceSpecificAnnotationManager,
  defaultFrameOfReferenceSpecificAnnotationManager,
  annotationLocking,
  annotationSelection,
  getAnnotations,
  addAnnotation,
  removeAnnotation,
  getDefaultAnnotationManager,
  getViewportSpecificAnnotationManager,
  getAnnotation,
  // segmentations
  addSegmentationRepresentations,
  removeSegmentationsFromToolGroup,
};
