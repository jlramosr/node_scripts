'use strict';

if (process.argv.length <= 2) {
  throw("It's necessary a input json file: node clear_json.js <input_json> [output_json, spaces]");
}
let input = process.argv[2];
let output = process.argv[3] || 'clear_json_output.json';
let spaces = process.argv[4] || 0;
if (process.argv.length > 5) {
  throw("Too many arguments: node clear_json.js <input_json> [output_json spaces]");
}

let fs = require('fs');

let response = [];
fs.readFile(input, 'utf8', (err, _data)  => {
  if (err) throw err;
  let data = JSON.parse(_data);
  //data = JSON.stringify(data);
  data.forEach(obj => {
    Object.keys(obj).forEach(key => {
      let value = obj[key];
      if (value === "" || value === null){
          delete obj[key];
      }
    });
    response.push(obj);
  });
  fs.writeFile(output, JSON.stringify(response,null,parseInt(spaces)), (err, _data) => {
    if (err) throw err;
  })
});
