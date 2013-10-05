/**
 * @author Вячеслав Шимарулин
 */

(function($) {
	$.fn.qrcode = function(options) {
		// if options is string,
		if ( typeof options === 'string') {
			options = {
				text : options
			};
		}

		// set default values
		options = $.extend({}, {
			render : "canvas",
			pointSize : 5,
			foreground : "#000000",
			background : "#ffffff",
		}, options);
		var canvasRender = function() {
			// create new QRcode
			var code = new Array();
			code = qrencode.encodeString(options.text, 0, qrencode.QR_ECLEVEL_L, qrencode.QR_MODE_8, true);

			var width = code.length;
			var height = width;
			var pointSize = options.pointSize;
			var canvas = document.getElementById('qrCodeCanvas');
//			var canvas = document.createElement('canvas');
			canvas.width = width * pointSize;
			canvas.height = height * pointSize;

			function addPoint(xPosition, yPosition, boolean_value) {

				var x = xPosition * pointSize;
				var y = yPosition * pointSize;

				if (boolean_value == true) {
					var context = canvas.getContext('2d');
					context.fillStyle = options.foreground;
					context.fillRect(x, y, pointSize, pointSize);
				} else {
					var context = canvas.getContext('2d');
					context.fillStyle = options.background;
					context.fillRect(x, y, pointSize, pointSize);
				}
			}
			
			var i;
			var j;

			for ( j = 0; j < height; j++) {
				for ( i = 0; i < width; i++) {
					addPoint(i, j, code[i][j]);
				};
			};

			// return just built canvas
			return canvas;
		};

		if ($(this.children('canvas'))) {
			alert(ok);
		} else {

			return this.each(function() {
				var element = canvasRender();
				$(element).appendTo(this);
			});

		};

	};
})(jQuery);

/*
 var makeCode = function() {

 var text = $("#qrText").val();

 var code = new Array();
 code = qrencode.encodeString(text, 0, qrencode.QR_ECLEVEL_L, qrencode.QR_MODE_8, true);

 var width = code.length;
 var height = width;
 var pointSize = 4;
 var canvas = document.createElement('canvas');
 canvas.width = width * pointSize;
 canvas.height = height * pointSize;
 function addPoint(xPosition, yPosition, boolean_value) {

 var x = xPosition * pointSize;
 var y = yPosition * pointSize;

 if (boolean_value == true) {
 var context = canvas.getContext('2d');
 context.fillStyle = options.foreground;
 context.fillRect(x, y, pointSize, pointSize);
 } else {
 var context = canvas.getContext('2d');
 context.fillStyle = options.background;
 context.fillRect(x, y, pointSize, pointSize);
 }
 }

 for ( j = 0; j < height; j++) {
 for ( i = 0; i < width; i++) {
 addPoint(i, j, code[i][j]);
 };
 };

 };
 */
$(function() {
	$("#genButton").click(function() {
		jQuery('#qrcode').qrcode({
			text : $("#qrText").val(),
		});
	});
});

