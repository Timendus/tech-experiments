import Fuse from 'fuse.js'
import { findSearchKeysRecurse } from './helper.js';
import { marked } from 'marked'

let database;
let fuse;
run();

function preprocessNode({ path, node, parent }) {
  node.path = path;
  node.url = urlFromPath(path);
  node.parent = parent;
  if (node.children) {
    for (const child of node.children) {
      preprocessNode({
        path: [...path, child.id],
        node: child,
        parent: node
      });
    }
  }
  return node;
}

function flattenNode(node) {
  return [
    node,
    ...(
      node.children
        ? node.children.flatMap(flattenNode)
        : []
    )
  ]
}

async function run() {
  database = await fetch('./database.json').then(response => response.json());

  database = preprocessNode({
    path: [],
    node: database,
    parent: null
  });

  fuse = new Fuse(flattenNode(database), {
    includeMatches: true,
    keys: ['name', 'content']
  });

  window.addEventListener('hashchange', () => {
    updatePage();
  }, true);
  updatePage();
}

function updatePage() {
  const path = document.location.hash
    .replace(/^[#\/]*/g, '')
    .split('/')
    .filter(segment => segment !== '');

  const page = path
    .reduce((page, segment) => page?.children?.find(child => child.id?.toString() === segment), database);

  document.body.innerHTML = stringifyHtml(
    page
    ? page.path.length < 1 ? renderFrontPage(page) : renderPage(page)
    : renderPageNotFound()
  );

  document.getElementById('js-search').oninput = (event) => {
    let result = fuse.search(event.target.value)
    console.log('result: ', result)
  }

  window.scrollTo(0,0);
}

function urlFromPath(path) {
  return `#/${path.join('/')}`;
}

function renderFrontPage(page) {
  const { id, name, content, children, links, sticker, header, blurb } = page;
  return html`
    <main class="front-page">
      <header>
        <h1>${header}</h1>
        <p>${renderMarkdown(blurb)}</p>
        <form id="search">
          <input id="js-search" type="text" name="" value="" placeholder="Wat is uw behoefte?" />
          <button type="submit">Zoek</button>
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
  const { id, name, content, children, links, sticker } = page;
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
        ${renderChildren(page)}
      </section>
      <aside class="sidebar">
        <section class="share">
          <p><button>Deel dit!</button></p>
        </section>
      </aside>
      <footer></footer>
    </main>
  `
}

function renderPageNotFound() {
  return html`
    Not found
  `
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
    <h2>Artikelen</h2>
    <ul class="child-articles">
      ${page.children.map(({ id, name, blurb, url, children }) => html`
        <li>
          <a href="${url}">
            ${children && children.length > 0 && html`
              <span class="tag">${numArticles(children)} artikelen</span>
            `}
            <h1>${name}</h1>
            <p>${renderMarkdown(blurb)}</p>
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
