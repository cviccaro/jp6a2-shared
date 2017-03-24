export interface ZoomLensPanPixelsRawEvent {
	left: number;
	top: number;
}
export interface ZoomLensPanPixelsEvent extends ZoomLensPanPixelsRawEvent {
	left: number;
	top: number;
	containerWidth: number;
	containerHeight: number;
}
export interface ZoomLensPanPercentagesEvent {
	left: number;
	top: number;
}
