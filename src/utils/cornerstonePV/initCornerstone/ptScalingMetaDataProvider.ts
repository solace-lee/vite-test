import { utilities as csUtils } from '@cornerstonejs/core';

const scalingPerImageId:{[key:string]: object} = {};

function addInstance(imageId: string, scalingMetaData: object): void {
  const imageURI = csUtils.imageIdToURI(imageId);
  scalingPerImageId[imageURI] = scalingMetaData;
}

function get(type: string, imageId: string): object | undefined {
  if (type === 'scalingModule') {
    const imageURI = csUtils.imageIdToURI(imageId);
    return scalingPerImageId[imageURI];
  }
}

export default { addInstance, get };
