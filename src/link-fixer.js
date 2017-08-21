/* @flow */

const REMOVE_ATTRS = [
  'ping',
  'onmousedown',
  'oncontextmenu',
];

const querySearchResults = (): NodeList<HTMLElement> => document.querySelectorAll('h3.r a');

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

const decodeHref = (element: HTMLElement): HTMLElement => {
  const href = element.getAttribute('href');
  const decodedHref = decodeURIComponent(href);
  element.setAttribute('href', decodedHref);
};

const removeAttributes = (element: HTMLElement): void => {
  REMOVE_ATTRS.forEach(attrName => element.removeAttribute(attrName));
};

const linkResults = querySearchResults();

linkResults.forEach((element) => {
  replaceHref(element);
  decodeHref(element);
  removeAttributes(element);
});
