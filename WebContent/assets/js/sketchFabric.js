$(document)
		.ready(
				function() {
					var canvas = new fabric.Canvas('artBoard', {
						backgroundColor : '#ffffff',
						selectionColor : 'rgba(56,147,232,0.1)',
						selectionBorderColor : 'rgba(12,53,188,0.8)',
						selectionLineWidth : 1,
					});

					canvas.setDimensions({
						width : 600,
						height : 500,
					});

					$('input[type=file]').bootstrapFileInput();
					$('#uploadUserImage').change(function handleImage(e) {
						var reader = new FileReader();
						reader.onload = function(event) {
							var imgObj = new Image();
							imgObj.src = event.target.result;
							imgObj.onload = function() {
								// start fabricJS stuff
								var image = new fabric.Image(imgObj);
								image.set({
									cornersize : 10,
								});
								// image.scale(getRandomNum(0.1,
								// 0.25)).setCoords();
								canvas.add(image);
							};
						};
						reader.readAsDataURL(e.target.files[0]);
					});

					var removeSelectedEl = document
							.getElementById('remove-selected');
					removeSelectedEl.onclick = function() {
						var activeObject = canvas.getActiveObject(), activeGroup = canvas
								.getActiveGroup();
						if (activeGroup) {
							var objectsInGroup = activeGroup.getObjects();
							canvas.discardActiveGroup();
							objectsInGroup.forEach(function(object) {
								canvas.remove(object);
							});
						} else if (activeObject) {
							canvas.remove(activeObject);
						}
					};

					if ($(".clear").click(function() {
						if (confirm('Are you sure?')) {
							canvas.clear();
						}
						;
					}))
						;

					document.getElementById('rasterize').onclick = function() {
						if (!fabric.Canvas.supports('toDataURL')) {
							alert('This browser doesn\'t provide means to serialize canvas to an image');
						} else {
							window.open(canvas.toDataURL('png'));
						}
					};
					document.getElementById('rasterize-svg').onclick = function() {
						window.open('data:image/svg+xml;utf8,'
								+ encodeURIComponent(canvas.toSVG()));
					};
					document.getElementById('rasterize-json').onclick = function() {
						alert(JSON.stringify(canvas));
					};

				});
