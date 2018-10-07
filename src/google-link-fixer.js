// @flow

const REMOVE_ATTRS = [
  'ping',
  'onmousedown',
  'oncontextmenu',
];

const replaceWithQuery =
    (element: HTMLElement, queries: Array<String>, paramName: string): boolean => {
      const queriesIn = queries.map(v => v.replace(/^\?/, ''));
      const param = queriesIn.find(v => v.indexOf(`${paramName}=`) === 0);

      if (param) {
        const url = param.substring(paramName.length + 1);
        element.setAttribute('href', url);
        return true;
      }

      return false;
    };

const replaceHref = (element: HTMLElement): void => {
  const dataHref = element.getAttribute('data-href');

  if (dataHref) {
    // eslint-disable-next-line no-param-reassign
    element.setAttribute('href', dataHref);
    return;
  }

  const search = element.search;

  if (search) {
    const queries = search.split('&');
    if (replaceWithQuery(element, queries, 'url')) {
      return;
    }

    replaceWithQuery(element, queries, 'q');
  }
};

const decodeHref = (element: HTMLElement): void => {
  const href = element.getAttribute('href');

  if (href) {
    const decodedHref = decodeURIComponent(href);
    element.setAttribute('href', decodedHref);
  }
};

const removeAttributes = (element: HTMLElement): void => {
  REMOVE_ATTRS.forEach(attrName => element.removeAttribute(attrName));
};

const removeClickEvents = (element: HTMLElement): void => {
  const clone = element.cloneNode(true);

  if (clone && element.parentNode) {
    element.parentNode.replaceChild(clone, element);
  }
};

type Entry = {
  query: string,
  processor: NodeList<HTMLElement> => void,
};

const QUERIES: Array<Entry> = [
  {
    query: 'div.r a',
    processor: (elements: NodeList<HTMLElement>) => {
      elements.forEach((element) => {
        replaceHref(element);
        decodeHref(element);
        removeAttributes(element);
        removeClickEvents(element);
      });
    },
  },
  {
    query: 'a.fl',
    processor: (elements: NodeList<HTMLElement>) => {
      elements.forEach((element) => {
        replaceHref(element);
        decodeHref(element);
        removeAttributes(element);
        removeClickEvents(element);
      });
    },
  },
  {
    query: 'div.xpd a',
    processor: (elements: NodeList<HTMLElement>) => {
      elements.forEach((element) => {
        removeAttributes(element);
        removeClickEvents(element);
      });
    },
  },
];

const main = () => {
  QUERIES.forEach((entry: Entry) => {
    const elements = document.querySelectorAll(entry.query);
    entry.processor(elements);
  });
};

main();
