const file = await fetch('/mock/sponsors_mock.xlsx').then(response => response.arrayBuffer());

const workbook = XLSX.read(file, {type: 'array'});
const sheet = workbook.Sheets['Oslovované firmy'];
const sheetJson = XLSX.utils.sheet_to_json(sheet);

const arrangedSponsorships = sheetJson.filter(item => item.stav === 'domluveno');
const sponsors = arrangedSponsorships.map(item => item['jméno společnosti ']);

const sponsorsContainer = document.querySelector('#sponsors');
sponsors.forEach(sponsor => {
    sponsorsContainer.insertAdjacentHTML('beforeend', `<p class="minorSponsor">${sponsor}</p>`);
});
