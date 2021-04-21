var XLSX = require('xlsx');
module.exports={
    
Round1conversion: function(filename){
var wb = XLSX.readFile("uploads/"+filename);
const first_worksheet = wb.Sheets[wb.SheetNames[0]];
var range1 = XLSX.utils.decode_range(first_worksheet['!ref']);
range1.s.c = 2; 
range1.e.c = 8; 
range1.s.r = 1;
var new_range1 = XLSX.utils.encode_range(range1);
const data1 = XLSX.utils.sheet_to_json(first_worksheet, { raw: true,  range: new_range1, blankrows: false });
return data1;

},



Round2conversion: function(filename){
    var wb = XLSX.readFile("uploads/"+filename);
    const second_worksheet = wb.Sheets[wb.SheetNames[1]];
    var range = XLSX.utils.decode_range(second_worksheet['!ref']);
    range.s.c = 2; 
    range.e.c = 4; 
    range.s.r = 1;
    var new_range = XLSX.utils.encode_range(range);
    const data2 = XLSX.utils.sheet_to_json(second_worksheet, { raw: true,  range: new_range, blankrows: false });
    return data2;
},



Round3conversion: function(filename){
    var wb = XLSX.readFile("uploads/"+filename);
    const third_worksheet = wb.Sheets[wb.SheetNames[2]];
    var range = XLSX.utils.decode_range(third_worksheet['!ref']);
    range.s.c = 3; 
    range.e.c = 5; 
    range.s.r = 2;
    var new_range = XLSX.utils.encode_range(range);
    const data3 = XLSX.utils.sheet_to_json(third_worksheet, { raw: true,  range: new_range, blankrows: false });
    return data3;
},


}