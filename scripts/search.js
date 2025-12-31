'use strict';

var visible = [];

(function() {
  const search = document.querySelector('#search');

  function displayCard(results, string) {
    var highlighted = '<mark>' + string + '</mark>';

    return results.forEach(function(item) {
      item.removeAttribute('hidden');
      item.innerHTML = item.innerHTML.replace(string, highlighted);

      visible.push(item);
    });
  }

  function resetCards() {
    visible.forEach(function(item) {
      item.setAttribute('hidden', true);
      item.querySelectorAll('mark').forEach(function(marked) {
        marked.parentElement.innerHTML = marked.parentElement.textContent.replace('<mark>', '').replace('</mark>', '');
        return marked;
      });
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

    results = displayCard(results, string);

    return results;
  }

  search.addEventListener('change', searchRecipes);
  search.focus();
})();
