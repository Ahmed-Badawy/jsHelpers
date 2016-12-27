let DEV = true;
if(!DEV){
 console.log = function(){}
 console.error = function(){}
}

let textFile;
let jsHelpers = {


  @@include('./array handlers.js')
  @@include('./custom.js')
  @@include('./time related.js')
  @@include('./searching & filtering.js')
  @@include('./keypress detection.js')
  @@include('./dom selectors.js')
  @@include('./device & browser detection.js')
  @@include('./dom selectors.js')
  @@include('./cookie related.js')





}








