const API = {
    CREATE: {
        URL:"create.json",
        METHOD: "GET"
    },
    READ:{
        URL:"store.json",
        METHOD: "GET"
    },
    UPDATE:{
        URL:"",
        METHOD: "PUT"
    },
    DELETE:{
        URL:"",
        METHOD: "DELETE"
    }
};

API.READ.URL

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
    const drugCategory = document.querySelector("input[name=drugCategory]").value;
    const drugExpirationDay = document.querySelector("input[name=date-input]").value;
    const drugLink = document.querySelector("input[name=drugInfo]").value;
    const drugAmount = document.querySelector("input[name=amount]").value;

    const drug = {
        drugName,
        drugCategory,
        drugExpirationDay,
        drugLink,
        drugAmount
    };
    console.info('saving...', drug, JSON.stringify(drug));

    fetch(API.CREATE.URL, {
        method:API.CREATE.METHOD,
        body: API.CREATE.METHOD === 'GET' ? null : JSON.stringify(drug)
    })
        .then(res => res.json())
        .then(r => {
            console.warn(r);
            if (r.succes) {
                setTimeout(() => {
                    console.info('refresh list');
                    loadList();
                }, 30000)
               
            }
        });
}

const saveBtn = document.querySelector('#addDrug');
saveBtn.addEventListener("click", e => {
    saveDrug();
});
  