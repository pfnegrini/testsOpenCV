var cv = require('/usr/local/lib/node_modules/opencv');
cv.readImage("./files/mona.png", function(err, im) {
  salt(im, 100);
  im.save("./tmp/salt.png");
  console.log('Image saved to ./tmp/salt.png');
});

function salt(img, n) {
  var channels;
  if ((channels = img.channels()) != 3) return console.log('Image has only %s Channel. It\'s not possible to salt this image.', channels)

  var width = img.width();
  var height = img.height();
  for(var i = 0; i < n; i ++) {
    x = Math.random() * width;
    y = Math.random() * height;
    img.set(y, x, 255);
	img.putText("OpenCV forever!", 50, height-50, "HERSEY_SIMPLEX", 0.5, 2);
  }
}
