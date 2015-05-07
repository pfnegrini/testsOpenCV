var cv = require('/usr/local/lib/node_modules/opencv');
var lowThresh = 0;
var highThresh = 100;
var nIters = 2;
var maxArea = 2500;

var GREEN = [0, 255, 0]; // B, G, R
var WHITE = [255, 255, 255]; // B, G, R

var RED   = [0, 0, 255]; // B, G, R

try {
  var vid = new cv.VideoCapture(0);
       
  vid.read(function(err, im){
    if (err) throw err;
    if (im.size()[0] > 0 && im.size()[1] > 0){
      var width = im.width();
      var height = im.height();
      var big = new cv.Matrix(height, width);
      var transform = new cv.Matrix(height, width);
      console.log(width + ' ' + height); 
      //cv.cvtranspose(im,big);
      //im.flip(270);
      im.resize(im, transform, big.size, 0.5, 0.5, 2);
      transform.save('./tmp/transform.png');
    
      //im.convertGrayscale();
      
      im_canny = im.copy();

      im_canny.canny(lowThresh, highThresh);
      im_canny.dilate(nIters);

  contours = im_canny.findContours();

  for(i = 0; i < contours.size(); i++) {
    if(contours.area(i) > maxArea) {
      var moments = contours.moments(i);
      var cgx = Math.round(moments.m10 / moments.m00);
      var cgy = Math.round(moments.m01 / moments.m00);
      big.drawContour(contours, i, GREEN);
      big.line([cgx - 5, cgy], [cgx + 5, cgy], RED);
      big.line([cgx, cgy - 5], [cgx, cgy + 5], RED);
    }
  }
      
           
      big.save('./tmp/flip.png');
      
       im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
        if (err) throw err;
        if (!faces.length) return console.log("No Faces");

        var face = faces[0];
        var ims = im.size();
        var im2 = im.roi(face.x, face.y, face.width, face.height)
	
        /*
        im.adjustROI(
             -face.y
           , (face.y + face.height) - ims[0]
           , -face.x
           , (face.x + face.width) - ims[1])
           */
        im2.save('./examples/tmp/take-face-pics.jpg')
        console.log('Image saved to ./tmp/take-face-pics.jpg');
      })
    } else {
      console.log("Camera didn't return image")
    }
  });
} catch (e){
  console.log("Couldn't start camera", e)
}
