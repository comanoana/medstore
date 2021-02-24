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
            console.log(allDrugs)
            verifyIfDrugIsExpired(allDrugs);
            insertDrugs(allDrugs);
        });
};

function getDrugsHTML(drugs) {
    return drugs.map(getDrugHTML).join("");
}

function getDrugHTML(drug) {
    var isExpired;
    if (getDrugIsExpired(drug)) {
        isExpired = '';
    } else {
        isExpired = 'none'
    // var isExpired = getDrugIsExpired(drug) ? '' : 'none';
    }
    return `<tr>
        <td><span id="warn" style='font-size:20px;display:${isExpired}'>&#9888;</span></td>
        <td>${drug.drugName}</td>
        <td>${drug.category}</td>
        <td>${drug.expirationDay}</td>
        <td><a target="_blank" href="${drug.link}">Prospectus</a></td>
        <td>${drug.amount}</td>
        <td>
            <a href="#" class="delete-row" data-id="${drug.id}">&#10006;</a>
            <a href="#" class="edit-row" data-id="${drug.id}">&#9998;</a>
        </td>
    </tr>`
}

function getDrugIsExpired(drug) {
    const currentTime = new Date();
    const time = currentTime.getTime();
    const expirationDateTime = new Date(drug.expirationDay)
            console.log('time', time);
        
    return expirationDateTime.getTime() < time;
}

function getExpiredDrugHTML() {
    let expiredDrugs = allDrugs.filter(drug => drug.isExpired == true)
    insertDrugs(expiredDrugs)
}

function getNotExpiredDrugHTML() {
    let notExpiredDrugs = allDrugs.filter(drug => !drug.isExpired)
    insertDrugs(notExpiredDrugs)
}

function addEventListeners() {
    const expiredBtn = document.getElementById("expiredBtn")
    expiredBtn.addEventListener("click", (e) => {
        getExpiredDrugHTML()
    })

    const notExpiredBtn = document.getElementById("notExpiredBtn")
    notExpiredBtn.addEventListener("click", (e) => {
        getNotExpiredDrugHTML()
    })

    const allBtn = document.getElementById("allBtn")
    allBtn.addEventListener("click", (e) => {
        insertDrugs(allDrugs)
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

function verifyIfDrugIsExpired(allDrugs) {
    const currentTime = new Date();
    const time = currentTime.getTime();
    allDrugs.forEach(element => {
        var expDate = new Date(element.expirationDay);
        if (expDate.getTime() < time) {
            element.isExpired = true
        }
    });
}

function setCurrentDayAsMinForDateInput() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("dateInput")[0].setAttribute('min', today);
}

loadList();
addEventListeners();
setCurrentDayAsMinForDateInput();

