import { Annotation } from "./types";

export const calculateRectangle = (
  rectangle: Annotation,
  canvasDimensions: {
    width: number;
    height: number;
  },
  videoNativeDimensions: {
    width: number;
    height: number;
  },
) => {
  const [x, y, width, height] = rectangle;
  const { width: canvasWidth, height: canvasHeight } = canvasDimensions;
  const { width: videoNativeWidth, height: videoNativeHeight } =
    videoNativeDimensions;
  // x and y represent coordinates for the centre of the rectangle
  // so need to calculate top left coordinates for canvas drawing.
  // Need to multiply the coordinates by how much the respective
  // canvas dimension is a proportion of the video's original
  // dimension (so-called 'factor').
  const widthFactor = canvasWidth / videoNativeWidth;
  const heightFactor = canvasHeight / videoNativeHeight;
  const topLeftX = (x - width / 2) * widthFactor;
  const topLeftY = (y - height / 2) * heightFactor;
  const scaledWidth = width * widthFactor;
  const scaledHeight = height * heightFactor;

  return [topLeftX, topLeftY, scaledWidth, scaledHeight];
};
