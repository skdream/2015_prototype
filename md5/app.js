var md5 = require('./md5.js').md5; 

var value1 = '123456'; 

var cryst = md5(value1); 
console.log(cryst)