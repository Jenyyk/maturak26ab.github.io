const file = await fetch('/mock/sponsors_mock.xlsx').then(response => response.arrayBuffer());

const workbook = XLSX.read(file, {type: 'array'});
const sheet = workbook.Sheets['Oslovované firmy'];
const sheetJson = XLSX.utils.sheet_to_json(sheet);

const arrangedSponsorships = sheetJson.filter(item => item.stav === 'domluveno');
const sponsors = arrangedSponsorships.map(item => new Object({ companyName: item['jméno společnosti '], webUrl: item['web url'] }) );

const sponsorsContainer = document.querySelector('#otherSponsorsGrid');
sponsors.forEach(sponsor => {
    sponsorsContainer.insertAdjacentHTML('beforeend', `<a class="minorSponsor" ${!!sponsor.webUrl ? 'href="' + sponsor.webUrl + '" target="_blank"' : ''}>${sponsor.companyName}</p>`);
});
