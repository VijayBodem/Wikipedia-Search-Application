let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults")
let spinnerEl = document.getElementById("spinner");

function createAndAppendResults(result) {
    let {
        title,
        link,
        description
    } = result;
    // 1.Div container -  result item 
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("resilt-item");
    searchResultsEl.appendChild(resultItemEl);

    // 2. anchor title -  result title 
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultItemEl.appendChild(resultTitleEl);
    // 3.title break
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);
    //4- anchor url - result url 
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.herf = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);
    //5. line break 
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    // paragraph description - line description
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

}

function displayResults(searchResult) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResult) {
        createAndAppendResults(result);
    }

}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none"); 
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);