
function searchDrugs(){
    console.warn('search', text);
    return allDrugs.filter(drug => {
        console.info(drug.drugName);
        return drug.drugName == text;
    });
}

const search = document.getElementById('search');
search.addEventListener("input", e => {
    const text = e.target.value;
    

    const filtrate = searchDrugs(text);

    insertDrugs(filtrate);
})

function searchDrugs(text) {
    text = text.toLowerCase();
    console.warn("search", text);
    return allDrugs.filter(drug => {
          console.info(drug.drugName);
        return drug.drugName.toLowerCase().indexOf(text) > -1 || 
          drug.category.toLowerCase().indexOf(text) > -1;
    });
  }

  function saveDrug() {
    const drugName = document.querySelector("input[name=drugName]").value;
    const category = document.querySelector("input[name=category]").value;
    const drugInfo = document.querySelector("input[name=expirationDay]").value;
    const link = document.querySelector("input[name=link]").value;
    const amount = document.querySelector("input[name=amount]").value;
}
  