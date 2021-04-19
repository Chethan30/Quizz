var XLSX = require('xlsx');
module.exports= function(filename){
var wb = XLSX.readFile("uploads/"+filename);
const first_worksheet = wb.Sheets[wb.SheetNames[0]];
var range1 = XLSX.utils.decode_range(first_worksheet['!ref']);
range1.s.c = 2; 
range1.e.c = 8; 
range1.s.r = 1;
var new_range1 = XLSX.utils.encode_range(range1);
const data1 = XLSX.utils.sheet_to_json(first_worksheet, { raw: true,  range: new_range1, blankrows: false });
return data1;

}




