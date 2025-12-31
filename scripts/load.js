window.onload = function(e) {
  const main = document.querySelector('main');
  const cardID = window.location.hash.replace('#', '');

  if (!!cardID.length) {
    const elements = Array.from(main.children);
    const card = elements.find(function (item) {
      const match = item.tagName === 'ARTICLE' && item.id === cardID;
      return match ? item : 0;
    });

    card.removeAttribute('hidden');
    visible.push(card);
  }
}
