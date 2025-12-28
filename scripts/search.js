'use strict';

(function() {
  const search = document.querySelector('#search');
  var visible = [];

  function displayCard(results) {
    return results.forEach(function(item) {
      item.removeAttribute('hidden');

      visible.push(item);
    });
  }

  function resetCards() {
    visible.forEach(function(item) {
      item.setAttribute('hidden', true);
    });

    visible.length = 0;
  }

  function filter(string) {
    var selector = 'article[data-search*="' + string + '" i]'
    var results = document.body.querySelectorAll(selector);

    resetCards();

    return results;
  }

  function searchRecipes(e) {
    e.preventDefault();

    var string = e.target.value;
    var results = filter(string);

    results = displayCard(results);

    return results;
  }

  search.addEventListener('change', searchRecipes);

}
)();
