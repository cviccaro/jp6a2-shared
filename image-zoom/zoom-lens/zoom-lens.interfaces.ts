export interface ZoomLensPanPixelsRawEvent {
	left: number;
	top: number;
	event: MouseEvent;
}
export interface ZoomLensPanPixelsEvent {
	left: number;
	top: number;
	containerWidth: number;
	containerHeight: number;
}
export interface ZoomLensPanPercentagesEvent {
	left: number;
	top: number;
}
