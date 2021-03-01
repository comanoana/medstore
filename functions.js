import { API } from './search-save.js';
import { deleteDrugs } from './edit-delete.js';
import { populateCurrentDrug } from './edit-delete.js';

export let allDrugs = [];

export function insertDrugs(drugs) {
    const tbody = document.querySelector('#table-list tbody');
    tbody.innerHTML = getDrugsHTML(drugs);
}

export function loadList() {
    fetch(API.READ.URL)
        .then(res => res.json())
        .then(data => {
            allDrugs = data;
            insertDrugs(allDrugs);
        });
};

export function loadExpiredList() {
    fetch(API.EXPIRED.URL)
    .then(res => res.json())
    .then(data => {
        allDrugs = data;
        insertDrugs(allDrugs);
    });
}

export function loadUnexpiredList() {
    fetch(API.UNEXPIRED.URL)
    .then(res => res.json())
    .then(data => {
        allDrugs = data;
        insertDrugs(allDrugs);
    });
}

function getDrugsHTML(drugs) {
    return drugs.map(getDrugHTML).join("");
}

function getDrugHTML(drug) {
    const date = setCurrentDay(drug.expirationDay);
    const currentDate = new Date().toISOString().split('T')[0];
    let isExpired = 'none';
    
    if(currentDate >= date){
        isExpired = '';
    }
    
    return `<tr>
        <td><span id="warn" style='font-size:20px;display:${isExpired}'>&#9888;</span></td>
        <td>${drug.drugName}</td>
        <td>${drug.category}</td>
        <td>${date}</td>
        <td><a target="_blank" href="${drug.link}">Prospectus</a></td>
        <td>${drug.amount}</td>
        <td>
            <a href="#" class="delete-row" data-id="${drug.id}">&#10006;</a>
            <a href="#" class="edit-row" data-id="${drug.id}">&#9998;</a>
        </td>
    </tr>`
}

function addEventListeners() {
    const expiredBtn = document.getElementById("expiredBtn")
    expiredBtn.addEventListener("click", (e) => {
        loadExpiredList();
    })

    const notExpiredBtn = document.getElementById("notExpiredBtn")
    notExpiredBtn.addEventListener("click", (e) => {
        loadUnexpiredList();
    })

    const allBtn = document.getElementById("allBtn")
    allBtn.addEventListener("click", (e) => {
        loadList();
    })

    const table = document.querySelector("#table-list tbody");
    table.addEventListener("click", (e) => {
        const target = e.target;
        if (target.matches("a.delete-row")) {
            const id = target.getAttribute("data-id");
            deleteDrugs(id);
        } else if (target.matches("a.edit-row")) {
            const id = target.getAttribute("data-id");
            populateCurrentDrug(id);
        }
    });
}

function setCurrentDayAsMinForDateInput() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("dateInput")[0].setAttribute('min', today);
}

function setCurrentDay(date) {
    return date.split('T')[0];
}

loadList();
addEventListeners();
setCurrentDayAsMinForDateInput();

