'use strict';

(function() {

  const container = document.body.querySelector('main');
  const ids = Object.keys(entries[0]);

  function lessThanWhole(item) {
    return !!item;
  }

  function formatMeasurements(item) {
    var fraction = item.numerator + '/' + item.denominator;
    var units = lessThanWhole(item.numerator) ? fraction : item.quantity;

    return units + ' ' + item.units;
  }
  
  function buildIngredientList(ingredients, list, card) {
    var listItem = document.createElement('li');
    var item = document.createElement('span');
    var quantity = document.createElement('span');
    
    card.dataset.search += ingredients.name;
    item.textContent = ingredients.name;
    
    quantity.textContent =  formatMeasurements(ingredients);
    
    listItem.appendChild(item);
    listItem.appendChild(quantity); 
    
    list.appendChild(listItem);
    
    return list;
  }

  function loadRecipeIngredients(index, list, section, card) {
    
    measurements.forEach(function(item) {
      if (item.id === index) {

        var ingredient = buildIngredientList(item, list, card);

        section.appendChild(ingredient);
      }
    });

    return section;
  }

  function loadRecipeInstructions(item, section) {
    var container = document.createElement('p');
    
    container.textContent = item;
    section.appendChild(container);

    return section;
  }

  function loadUserComments(item, section) {
    var container = document.createElement('p');
    
    container.textContent = "***" + item + "***";
    section.appendChild(container);

    return section;
  }

  function loadRecipeDetails(index, section) {
    
    instructions.forEach(function(item, i) {

      if (item.BEGIN === index) {
        loadRecipeInstructions(item.PROCEDURE, section);
      
        if (!!item.COMMENTS.length) {
          loadUserComments(item.COMMENTS, section);
        }        
      }
      
    });

    return section;
  }

  function formatDate(date) {
    date = date.substr(0,4), date.substr(4,2) - 1, date.substr(6,2);
    date = new Date(date);
    
    return date = date.toDateString();
  }

  function buildCard(index) {
    var data = entries[0];
    var content = data[index];

    var card = document.createElement('article');
    card.setAttribute('hidden', true);
    
    var title = document.createElement('h2');
    var section = document.createElement('section');
    var subtitle = document.createElement('h3');
    var aside = document.createElement('aside');
    var list = document.createElement('ul');

    function findEntryByFieldName(key) {
      return !content.hasOwnProperty(key) ? '' : content[key];
    }

    var name = findEntryByFieldName("FIELD2");
    var type = findEntryByFieldName("FIELD3");
    var category = findEntryByFieldName("FIELD4");
    var time = findEntryByFieldName("FIELD5") + 'hr ' + findEntryByFieldName("FIELD6");
    var description = findEntryByFieldName("FIElD9");
    var servings = findEntryByFieldName("FIELD10");
    var credit = findEntryByFieldName("FIELD14");
    var date = findEntryByFieldName("FIELD16");
    var ing = [];
    
    date = formatDate(date);
  
    title.innherHTML = '<span>' + name + '</span><span>#' + index + '</span>';
    subtitle.textContent = type + ' - ' + category;
    aside.innerHTML = !!description.length ? description + '<br/>' : '';
    aside.innerHTML += credit + '<br/>' + date;

    section.appendChild(subtitle);
    section.appendChild(aside);

    var searchTerms = Object.entries({name, credit, category, date, type, ing});
    card.dataset.search = searchTerms;
    card.appendChild(title);    
    card.appendChild(section);

    loadRecipeIngredients(index, list, section, card);

    loadRecipeDetails(index, section);

    container.appendChild(card);
    
  }

  ids.forEach(buildCard);

})();
