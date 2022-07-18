import * as cornerstone from "@cornerstonejs/core";
import WADORSHeaderProvider from "./WADORSHeaderProvider";
import ptScalingMetaDataProvider from "./ptScalingMetaDataProvider";

const { calibratedPixelSpacingMetadataProvider } = cornerstone.utilities;

export default function initProviders() {
  cornerstone.metaData.addProvider(
    WADORSHeaderProvider.get.bind(WADORSHeaderProvider) as any,
    9999
  );
  cornerstone.metaData.addProvider(
    ptScalingMetaDataProvider.get.bind(ptScalingMetaDataProvider) as any,
    10000
  );
  cornerstone.metaData.addProvider(
    calibratedPixelSpacingMetadataProvider.get.bind(
      calibratedPixelSpacingMetadataProvider
    ) as any,
    11000
  );
}
