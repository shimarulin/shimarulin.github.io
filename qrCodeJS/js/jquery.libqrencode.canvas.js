/**
 * @author Вячеслав Шимарулин
 */

/**
 * @param {String}
 *            text : Input string
 * @returns {Array} qrCode2dArray : 2d boolean array which represent QR Code
 *          line by line; Input string
 */


/**
 * 
 * @param {Array}
 *            qrCode : Input 2d boolean array which represent QR Code line by
 *            line
 * @param pointSize :
 *            QR code point size
 * @param id :
 *            The ID attribute of an HTML element "canvas"
 * @param foreground :
 *            The foreground color
 * @param background :
 *            The background color
 */

!function ($) {
	
	function qrEncode(text) {
	var qrCode2dArray = new Array();
	qrCode2dArray = qrencode.encodeString(
			text,
			0,
			qrencode.QR_ECLEVEL_L,
			qrencode.QR_MODE_8,
			true);
	return qrCode2dArray;
	};
	
	function canvasRender(qrCode, pointSize, id, foreground, background) {
	
	var qrWidth = qrCode.length;
	var qrHeight = qrWidth;
	var canvas = document.getElementById(id);
	var canvasWidth = qrWidth * pointSize;
	var canvasHeight = qrHeight * pointSize;
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	canvas.getContext('2d').fillStyle = background;
	canvas.getContext('2d').fillRect(0, 0, canvasWidth, canvasHeight);
	
	function addPoint(xPosition, yPosition, boolean_value) {
		
		var x = xPosition * pointSize;
		var y = yPosition * pointSize;
		
		if (boolean_value == true) {
			var context = canvas.getContext('2d');
			context.fillStyle = foreground;
			context.fillRect(x, y, pointSize, pointSize);
		}
	}
	
	//the coordinates array elements
	var i;
	var j;
	
	for (j = 0; j < qrHeight; j++) {
		for (i = 0; i < qrWidth; i++) {
			addPoint(i, j, qrCode[i][j]);
		}
	}
};

	$(function() {
		$("#genButton").popover({trigger: 'focus'});
		
		$("#genButton").click(function() {
			var message = qrEncode($("#qrText").val());
			canvasRender(message, 5, 'qrCodeCanvas', '#000000', '#ffffff');
		});
		
	});

}(window.jQuery)
