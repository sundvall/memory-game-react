/*
	aspectheight

	usage:

	the height is calculated to preserve the aspect ratio from a provided image or given value

	return:
	height
*/
function heightFromAspectRatio(w, refH = 1, refW = 1) {
	return Math.round((refH / refW) * w);
};
export default heightFromAspectRatio;
