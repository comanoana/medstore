import { API } from './search.js';
import { deleteDrugs } from './edit-delete.js';
import {populateCurrentDrug} from './edit-delete.js';


export let allDrugs = []; 

export function insertDrugs(drugs) {
    const tbody = document.querySelector('#table-list tbody');
    tbody.innerHTML= getDrugsHTML(drugs);
}

export function loadList(){
    fetch(API.READ.URL)
    .then(res => res.json())
    .then(data =>{
    allDrugs = data;
    insertDrugs(data);
    verifyIfDrugIsExpired(allDrugs);
    });
};

function getDrugsHTML(drugs){
    return drugs.map(getDrugHTML).join("");
}

function getDrugHTML(drug) {
        
        return `<tr>
        <td>${drug.drugName}</td>
        <td>${drug.category}</td>
        <td>${drug.expirationDay}</td>
        <td><a target="_blanck" href="${drug.link}">Prospectus</a></td>
        <td>${drug.amount}</td>
        <td>
            <a href="#" class="delete-row" data-id="${drug.id}">&#10006;</a>
            <a href="#" class="edit-row" data-id="${drug.id}">&#9998;</a>
        </td>`
}

function getExpiredDrugHTML(){
    let expiredDrugs = allDrugs.filter(drug => drug.isExpired == true)
    insertDrugs(expiredDrugs)
}

function getUnexpiredDrugHTML() {
    let unexpiredDrugs = allDrugs.filter(drug => drug.isExpired == false)
    insertDrugs(unexpiredDrugs)
}

function addEventListeners() {
    const expiredBtn = document.getElementById("expiredBtn")
    expiredBtn.addEventListener("click", (e) => {
        getExpiredDrugHTML()   
    })

    const unexpiredBtn = document.getElementById("unexpiredBtn")
    unexpiredBtn.addEventListener("click", (e) => {
        getUnexpiredDrugHTML()   
    })

    const allBtn = document.getElementById("allBtn")
    allBtn.addEventListener("click", (e) => {
        insertDrugs(allDrugs)   
    })

    const table = document.querySelector("#table-list tbody");
     table.addEventListener("click", (e) => {
        const target = e.target;
       if(target.matches("a.delete-row")){
           const id = target.getAttribute("data-id");
           deleteDrugs(id);
       } else if (target.matches("a.edit-row")){
           const id = target.getAttribute("data-id");
           populateCurrentDrug(id);
      }
    });
}

function verifyIfDrugIsExpired(allDrugs) {
    let currentTime = new Date();
    currentTime.getTime();
    allDrugs.forEach(element => {
        var expDate = new Date(element.expirationDay);
        var curentDate = new Date();
        if (expDate.getTime() < curentDate.getTime()){
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

