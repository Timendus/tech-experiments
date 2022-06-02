const marked = require('marked');

function renderFrontPage(page) {
  const { id, name, content, children, links, sticker, header, blurb } = page;
  return html`
    <main class="front-page">
      <nav>
        <h1><a href="#">EHBDoorverwijzen</a></h1>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Over EHBD</a></li>
          <li><a href="#">Artikelen</a></li>
        </ul>
        <form></form>
      </nav>
      <header>
        <h1>${header}</h1>
        ${renderMarkdown(blurb)}
        <form id="search">
          <input type="text" name="" value="" autocomplete="off" placeholder="Zoeken op onderwerp" />
          <button type="submit">Zoeken</button>
        </form>
      </header>
      <section class="content">
        ${renderChildren(page)}
        <h1 class="under-striped">${name}</h1>
        ${renderMarkdown(content)}
      </section>
      <footer></footer>
    </main>
  `
}

function renderPage(page) {
  const { id, name, content, children, links, sticker, url } = page;
  return html`
    <main class="article-page">
      <nav>
        <h1><a href="#">EHBDoorverwijzen</a></h1>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Over EHBD</a></li>
          <li><a href="#">Artikelen</a></li>
        </ul>
        <form id="search">
          <input type="text" name="" value="" autocomplete="off" placeholder="Zoeken op onderwerp" />
        </form>
      </nav>
      <section class="content">
        ${renderBreadcrumb(page)}
        <section class="two-column">
          <div class="column">
            <h1>${name}</h1>
            ${sticker !== undefined ? html`
              <p class=${`sticker ${sticker ? 'yes' : 'no'}`}>
                ${sticker
                  ? 'Je hebt de hulp van de huisarts nodig'
                  : 'De huisarts hoeft hier niet bij betrokken te worden'
                }
              </p>
            ` : ''}
            ${renderMarkdown(content)}
            <p class="share">
              <button id="share" data-title="${name}" data-url="${url}">Dit artikel delen</button>
            </p>
          </div>
          ${links && html`
            <div class="column">
              <section class="links">
                <h1>Meer lezen</h1>
                <ul>
                  ${links.map(({ name, url }) => html`
                    <li><a href=${url}>${name}</a></li>
                  `)}
                </ul>
              </section>
            </div>
          `}
        </section>
        ${children && html`<h2 class="articles">Artikelen</h2>`}
        ${renderChildren(page)}
      </section>
      <footer></footer>
    </main>
  `
}

function renderPageNotFound() {
  return html`
    <main class="article-page">
      <nav>
        <h1><a href="#">EHBDoorverwijzen</a></h1>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Over EHBD</a></li>
          <li><a href="#">Artikelen</a></li>
        </ul>
        <form id="search">
          <input id="js-search" type="text" name="" value="" placeholder="Zoeken op onderwerp" />
        </form>
      </nav>
      <section class="content">
        <ul class="breadcrumbs">
          <li><a href="#">Home</a></li>
          <li><a href="#">Pagina niet gevonden</a></li>
        </ul>
        <section class="two-column">
          <div class="column">
            <h1>Pagina niet gevonden</h1>
            <p>De link die je gevolgd hebt leidt naar een pagina die niet (meer) bestaat.</p>
            <p>Sorry! Hopelijk kom je eruit met de zoekfunctie hierboven?</p>
          </div>
        </section>
      </section>
      <footer></footer>
    </main>
  `
}

function renderSearchModal() {
  return html`
    <section class="search-modal">
      <form>
        <input type="text" autocomplete="off" placeholder="Zoeken op onderwerp"/>
        <button class="close">Close dialog</button>
      </form>
      <ul></ul>
    </section>
  `;
}

function renderSearchResults(results) {
  return html`
    ${results ? results.map(({ item, matches }) => {
      item = highlightMatches(item, matches);
      return html`
        <li>
          <a href="${item.url}">
            <h1>${new Html(item.name)}</h1>
            ${renderMarkdown(item.content ?? item.blurb)}
          </a>
        </li>
      `
    }) : html`
      <li class="not-found">No results found</li>
    `}
  `;
}

function *pairs(items) {
  for (let i = 1; i < items.length; i++) {
    yield [items[i - 1], items[i]];
  }
}

function highlightIndices(text, indices) {
  if (indices.length === 0) {
    return text;
  }
  const header = text.slice(0, indices[0][0]);
  return [
    header,
    ...[...pairs([...indices, [text.length, null]])]
      .map(([a, b]) => {
        const [startA, endA] = a;
        const [startB, _endB] = b;
        return `<mark>${text.slice(startA, endA + 1)}</mark>${text.slice(endA + 1, startB)}`;
      })
  ].join('');
}

function filterWholeWordIndices(text, indices) {
  const isAlphanumeric = c => /\w/.test(c);
  return indices.filter(([start, end]) =>
    // Beginning of word
    !isAlphanumeric(text[start - 1]) && isAlphanumeric(text[start]) &&
    // Ending of word
    !isAlphanumeric(text[end + 1]) && isAlphanumeric(text[end])
  );
}

function highlightMatches(item, matches) {
  return matches.reduce((item, match) => {
    const text = match.value;
    const indices = filterWholeWordIndices(text, match.indices);
    return {
      ...item,
      [match.key]: highlightIndices(text, indices)
    }
  }, item);
}

function renderShareModal({ title, url, fullURL }) {
  const escapedURL = encodeURIComponent(fullURL);
  return html`
    <section class="share-modal">
      <button class="close">Close dialog</button>
      <h1>Delen</h1>
      <ul>
        <li><a class="twitter" href='https://twitter.com/share?text=Aambeien&url=${escapedURL}'>Twitter</a></li>
        <li><a class="facebook" href='https://www.facebook.com/sharer.php?u=${escapedURL}'>Facebook</a></li>
        <li><a class="whatsapp" href='https://web.whatsapp.com/send?text=${title}%20${escapedURL}'>WhatsApp</a></li>
        <li><a class="e-mail" href='mailto:?subject=${title}&body=${title}${encodeURIComponent("\n\n")}${escapedURL}'>E-mail</a></li>
      </ul>
      <p>Link kopiëren</p>
      <div class="share-url">
        <span>${fullURL}</span>
        <button>Copy to clipboard</button>
      </div>
    </section>
  `;
}

function renderMarkdown(markdown) {
  return new Html(markdown ? marked.parse(markdown) : '');
}

function encodeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

class Html {
  constructor(content) {
    this.content = content;
  }
}

function html(strings, ...variables) {
  let result = '';
  for (let i = 0; i < Math.max(strings.length, variables.length); i++) {
    if (i in strings) {
      result += strings[i];
    }
    if (i in variables) {
      const value = variables[i];
      const htmlValue = /=$/.test(strings[i])
        // HTML attribute support.
        ? JSON.stringify(value)
        // HTML content
        : stringifyHtml(value);
      result += htmlValue;
    }
  }
  return new Html(result);
}

function stringifyHtml(value) {
  return value instanceof Array
  ? value.map(stringifyHtml).join('\n')
  : value instanceof Html
  ? value.content
  : encodeHtml(stringifyValue(value));
}

function stringifyValue(value) {
  if (value === undefined || value === null) {
    return '';
  } else if (value instanceof Array) {
    return value.join('\n');
  } else {
    return value.toString();
  }
}

function renderBreadcrumb(page) {
  const parentItems = parents(page)
    .map(page => html`
      <li>
        <a href=${page.url}>${page.breadcrumb || page.name}</a>
      </li>
    `);

  return html`
    <ul class="breadcrumbs">
      ${parentItems}
    </ul>
  `
}

function parents(node) {
  return node.parent
    ? [...parents(node.parent), node]
    : [];
}

function renderChildren(page) {
  if ( !page.children ) return '';
  return html`
    <ul class="child-articles">
      ${page.children.map(({ id, name, blurb, url, children }) => html`
        <li>
          <a href="${url}">
            ${children && children.length > 0 && html`
              <span class="tag">${numArticles(children)} artikelen</span>
            `}
            <h1>${name}</h1>
            <div>${renderMarkdown(blurb)}</div>
            <span class="button">Lees meer</span>
          </a>
        </li>
      `)}
    </ul>
  `
}

function numArticles(children) {
  return children
    ? children.length +
      children.reduce((a, p) => a + numArticles(p.children), 0)
    : 0;
}

module.exports = {
  renderPage,
  renderFrontPage,
  renderPageNotFound,
  renderSearchModal,
  renderSearchResults,
  renderShareModal,
  stringifyHtml
};
