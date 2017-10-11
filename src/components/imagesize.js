/*
	imagesize
	usage:
	the height is calculated to preserve the aspect ratio from a provided image or given value

	return:
	{w,h}
*/

function sizeFromImage (src, cb) {
	const img = new Image();
	const size = {};
	img.onload = function onload() {
		size.w = this.width;
		size.h = this.height;
		cb(this.height, this.width);
	};
	img.onerror = function onerror() {
		console.warn(`imagesize:sizeFromImage:onerror:can not use image:${src}`);
		cb();
	};
	img.src = src;
	return size;
};

export default sizeFromImage;
