document$.subscribe(function () {
  const treeContainer = document.querySelector('#nav-tree-container');
  if (!treeContainer) return;

  const content = document.querySelector('.md-content');
  if (!content) return;

  const oldList = document.querySelector('.doc-index');
  if (oldList) oldList.remove();

  fetch('search/search_index.json')
    .then(res => res.json())
    .then(data => {
      const pages = data.docs.filter(p =>
        !p.location.includes('#') &&
        !p.location.includes('/index.html')
      );

      const categories = {};

      for (const page of pages) {
        const parts = page.location.split('/');
        if (parts.length < 2 || parts[0] !== 'pages') continue;

        const category = parts[1];
        if (!categories[category]) categories[category] = [];

        const description = page.text?.trim()
          ? page.text.slice(0, 150) + '...'
          : 'Описание отсутствует';

        categories[category].push({
          title: page.title,
          location: page.location,
          description: description
        });
      }

      // Создаём обёртку со списком
      const listWrapper = document.createElement('div');
      listWrapper.className = 'doc-index';

      const h2 = document.createElement('h2');
      h2.innerText = "Документация";
      listWrapper.appendChild(h2);

      for (const category in categories) {
        const catTitle = document.createElement('h3');
        catTitle.innerText = decodeURIComponent(category);
        listWrapper.appendChild(catTitle);

        const categoryWrapper = document.createElement('div');
        categoryWrapper.className = 'category-wrapper';

        categories[category].forEach(item => {
          const tile = document.createElement('div');
          tile.className = 'tile';

          const a = document.createElement('a');
          a.href = item.location;
          a.innerHTML = `
            <h4>${item.title}</h4>
            <p>${item.description}</p>
          `;
          tile.appendChild(a);
          categoryWrapper.appendChild(tile);
        });

        listWrapper.appendChild(categoryWrapper);
      }

      treeContainer.innerHTML = '';
      treeContainer.appendChild(listWrapper);
    });
});
