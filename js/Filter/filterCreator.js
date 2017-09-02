let buttonFields = new ButtonFields();
buttonFields.create('Side','filter_side_tr','Left','Right','All');

let loc = document.querySelector('#filter_location_tr');
loc.innerHTML = `
    <td class="filterLineTitle">Location:</td>
    <td colspan=3  class=\"filterTd\"><input class="filterInput" type="text" name="filtro" id="filter_location"></td>
`;

let name = document.querySelector('#filter_name_tr');
name.innerHTML = `
    <td class="filterLineTitle">Name:</td>
    <td colspan=3 class=\"filterTd\"><input class="filterInput" type="text" name="filtro" id="filter_name"></td>
`;

buttonFields.create('Status', 'filter_status_tr', 'Printed','Not-Printed','All');


document.querySelector('#filter-table').addEventListener('click',function(event){
    let regex = event.target.id.split('_');
    if(regex.length == 3 && regex[2] == 'button'){
        buttonFields.switchState(regex[0],event.target);
    }
});

let side_all = document.getElementById('side_all_button');
let state_all = document.getElementById('status_all_button');

buttonFields.select('side',side_all);
buttonFields.select('status',state_all);

function resetFilter(){
    buttonFields.select('side',side_all);
    buttonFields.select('status',state_all);
    loc.querySelector('#filter_location').value = "";
    name.querySelector('#filter_name').value = "";
}

