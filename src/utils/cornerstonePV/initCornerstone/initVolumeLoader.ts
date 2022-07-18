import { imageLoader, volumeLoader } from '@cornerstonejs/core';
import {
  cornerstoneStreamingImageVolumeLoader,
  sharedArrayBufferImageLoader,
} from '@cornerstonejs/streaming-image-volume-loader';

export default function initVolumeLoader() {
  volumeLoader.registerUnknownVolumeLoader(
    cornerstoneStreamingImageVolumeLoader as any
  );
  volumeLoader.registerVolumeLoader(
    'cornerstoneStreamingImageVolume',
    cornerstoneStreamingImageVolumeLoader as any
  );

  imageLoader.registerImageLoader(
    'streaming-wadors',
    sharedArrayBufferImageLoader
  );
}
