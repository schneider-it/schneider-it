const options = {
    isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    includeMatches: false,
    findAllMatches: false,
    minMatchCharLength: 1,
    // location: 0,
    threshold: 0.3,
    // distance: 0,
    useExtendedSearch: true,
    ignoreLocation: true,
    ignoreFieldNorm: false,
    fieldNormWeight: 1,
    keys: [
      {
        name: 'title',
        weight: 0.9
      },
      {
        name: 'prettypath',
        weight: 0.1
      }
    ]
};

let fuse = null;
fetch('/tools/indexer/index.json').then(function (response) {
  // The API call was successful!
  return response.json()
}).then(function (data){
  fuse = new Fuse(data, options);
}).catch(function (err) {
  // There was an error
  alert('Error in loading json file.');
});

$("#search").on('keyup', function (e) {
  if((e.key !== "Tab" || e.keyCode !== 9) && (e.key !== "Shift" || e.keyCode !== 16) && (e.key !== "Enter" || e.keyCode !== 13)) {
    let search = document.getElementById('search_div');
    //search.scrollIntoViewIfNeeded(true);

    let pattern = document.getElementById('search').value;
    let ergebnisse = fuse.search(pattern);

    let container = document.getElementById('ergebnisse');
    container.innerHTML = ''; 

    console.log(JSON.stringify(ergebnisse,null,2));

    if(pattern != ""){
      document.querySelector('#search_div').setAttribute('data-after', 'Press Enter to open the first result!');
    }
    else {
      document.querySelector('#search_div').setAttribute('data-after', '');
    }


    for (let i = 0; i < ergebnisse.length; i++) {
      
      container.insertAdjacentHTML('beforeend', 
        '<div id="">' +
            '<a href=' + ergebnisse[i].item.location + '>' +
                '<h4>' + ergebnisse[i].item.title + '</h4>' +
                '<p>' + ergebnisse[i].item.prettypath + '</p>' +
            '</a>' +
        '</div>'
      );
    }
  }
});

document.onkeydown = function (e) {  
  if((e.key === "Tab" || e.keyCode === 9)){
    document.querySelector('#search_div').setAttribute('data-after', 'Press Enter to open the selected result!');

    let active_element = document.getElementById('active');
    if(active_element == null) {
      let container = document.getElementById('ergebnisse');
      let first_element = container.firstElementChild;
      if(first_element != null) {
        first_element.setAttribute('id', 'active');
      }
      return false;
    }
    let new_active_element;
    
    if(!e.shiftKey) {
      new_active_element = active_element.nextElementSibling;
    }
    else if(e.shiftKey) { 
      new_active_element = active_element.previousElementSibling;
    }

    if(new_active_element != null){ 
      active_element.setAttribute('id', '');
      new_active_element.setAttribute('id', 'active');
      new_active_element.scrollIntoViewIfNeeded(true);
    }
    else {
      active_element.setAttribute('id', '');
      let container = document.getElementById('ergebnisse');
      if(!e.shiftKey) {
        let first_element = container.firstElementChild;
        if(first_element != null) {
          first_element.setAttribute('id', 'active');
          first_element.scrollIntoViewIfNeeded(true);
        }
      }
      else if(e.shiftKey) { 
        let last_element = container.lastElementChild;
        if(last_element != null) {
          last_element.setAttribute('id', 'active');
          last_element.scrollIntoViewIfNeeded(true);
        }
      }
    }

    return false;
  }  

  if (e.key === 'Enter' || e.keyCode === 13) {
    let pattern = document.getElementById('search').value;
    let ergebnisse = fuse.search(pattern);
    let active_element = document.getElementById('active');
    if(active_element != null) {
      let link = active_element.firstElementChild.href;
      window.location.href = link;
    }
    else {
      window.location.href = ergebnisse[0].item.location;
    }
  }
}

$("#search_form").submit(function() {
    return false;
});