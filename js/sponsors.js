const file = await fetch('/mock/sponsors_mock.xlsx').then(response => response.arrayBuffer());

const workbook = XLSX.read(file, {type: 'array'});
const sheet = workbook.Sheets['Oslovované firmy'];
const sheetJson = XLSX.utils.sheet_to_json(sheet);

console.log(sheetJson.filter(item => item.stav === 'domluveno'));