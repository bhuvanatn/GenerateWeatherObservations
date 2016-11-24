Array.prototype.max = function() {
  return Math.max.apply(null, this);
};
Array.prototype.min = function() {
  return Math.min.apply(null, this);
};
var randRange = function(min, max){ // return a random integer between min and max
  var range = max - min;
  return Math.floor( min + (Math.random() * range) );
};
var randElem = function(array) { // return a random element from the given array
  return array[ randRange(0, array.length) ];
}
var generateInvalidLine = function(){
  // console.log("I am in generateInvalidLine function   ");
  switch  (randRange(0, 9)) {
      case 0:
           return  trimmed + '|' + locationX + ',' + locationY + '|' + temperature + '|' + 'AA' + '\n';
      case 1:
            return  trimmed + '|' + locationX + ',' + locationY + '|' + '00' + '|' + unit + '\n';
      case 2:
            return  '2016-07-00' + '|' + locationX + ',' + locationY + '|' + temperature + '|' + unit + '\n';
      case 3:
            return  trimmed + '|' + locationX + ',' + locationY + '|' + '00' + '|' + unit + '\n';
      case 4:
            return  trimmed + '|' + '0000' + ',' + '0000' + '|' + temperature + '|' + unit + '\n';
      case 5:
              return  '2016-07-00' + '|' + locationX + ',' + locationY + '|' + temperature + '|' + unit + '\n';
      case  6:
              return  '0000-07-50' + '|' + locationX + ',' + locationY + '|' + temperature + '|' + unit + '\n';
      case  7:
              return  trimmed + '|' + '0000' + ',' + '0000' + '|' + temperature + '|' + unit + '\n';
      case  8:
              return  trimmed + '|' + '0000' + ',' + '0000' + '|' + temperature + '|' + 'ZZ' + '\n';
      case  9:
              return  trimmed + '|' + locationX + ',' + locationY + '|' + temperature + '|' + 'KK' + '\n';
  }
}

var displayResult = function(){
  var observatory = randElem( observatories );
  if(observatory==='AU'){
         console.log("Observatory is AU");
        console.log("Temperature  in celsius: ", tempInCelsiusArr);
        console.log("Temperature in Celsius "+ "Max:"+ tempInCelsiusArr.max() + ' \xB0C'+" Min: "+ tempInCelsiusArr.min() + ' \xB0C');
      }else if (observatory === 'US') {
        console.log("Observatory is US");
         console.log("celsiusToFahrenheit After Conversion: ",tempCelsiusToFahArrC);
         console.log("Max and Min values:(celsiusToFahrenheit)", tempCelsiusToFahArrC.max() + '\xB0F' +" & "+ tempCelsiusToFahArrC.min() + '\xB0F');
      }else if (observatory === 'FR') {
          console.log("Observatory is FR");
       console.log("celsiusToKelvin After Conversion",tempCelsiusToKelvinC);
       console.log("Max and Min values:(celsiusToKelvin)",tempCelsiusToKelvinC.max() + ' K'+ " & " + tempCelsiusToKelvinC.min() +' K');
         }
}
// var observatories = ['AF', 'AU', 'BD', 'BE', 'CA', 'CR', 'EG', 'FR', 'DE', 'IN', 'ID', 'IQ', 'JP', 'MY', 'MT', 'MX', 'NP', 'PK', 'PE'];
var observatories = ['FR','AU', 'US'];
var  timestamp = new Date("2016-07-20T23:00:00.000Z");
var outputLines = 10;
// Part 1
var fs = require('fs');
var wstream = fs.createWriteStream('./test-output.txt');

for (var i = 0; i < outputLines; i++) {
  var locationX = randRange(1, 1000);
  var locationY = randRange(1, 1000);
  var temperature = randRange(10, 100);
  var unit = randElem( observatories ); // choose a random observatory
  timestamp.setSeconds( timestamp.getSeconds() + 65 ); // add 65 seconds to the starting time
  var trimmed = timestamp.toISOString();
  trimmed = trimmed.slice(0, trimmed.lastIndexOf(':'));
  if (i % 3 === 0)
  {
    var  line = generateInvalidLine();
    // console.log("i value:" + i + " bad line  : " +line);
      wstream.write(line);
  }
  else
  {
  var line = trimmed + '|' + locationX + ',' + locationY + '|' + temperature + '|' + unit + '\n';
  // console.log("good line", line);
    wstream.write(line);
  }
}
wstream.end();

//Part 2

//Start of Temperature Conversion Functions
var tempCelsiusToFahArrC = [];
var celsiusToFahrenheit = function(temp){
  var cTemp = temp;
  var cToFahr = cTemp * 9 / 5 + 32;
  tempCelsiusToFahArrC.push(cToFahr);
}
var tempCelsiusToKelvinC =[];
var celsiusToKelvin = function(temp){
var cTemp =temp;
var cToKelvin = cTemp + 273.15;
tempCelsiusToKelvinC.push(cToKelvin);
}

// End of Temperature Conversion Functions
var timestampArr =[];
var locationArr = [];
var temperatureArr =[];
var observatoryArr = [];
var tempInCelsiusArr = [];
var lineCount = 0;
var inputFile = fs.createReadStream('test-output.txt');
var lineReader = require('readline').createInterface({
  input: inputFile,
  terminal: false
});
lineReader.on('line', function(line){
  lineCount++;
  var fields = line.split('|');

  if(fields.length === 4){
    var timestamp =fields[0];
    timestampArr.push(timestamp);
    var location = fields[1];
    locationArr.push(location);
    var observatory = fields[3];
    observatoryArr.push(observatory);
    var temperature = parseInt(fields[2]); //Assuming temp in celsius

      tempInCelsiusArr.push(temperature);
      celsiusToKelvin(temperature);
      celsiusToFahrenheit(temperature);
  }else {

  }
});

lineReader.on('close', function(err){
  displayResult();
  console.log("========================");
;
});
