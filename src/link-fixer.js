/* @flow */

const querySearchResults = (): NodeList<HTMLElement> => document.querySelectorAll('h3.r a');

const replaceHref = (element: HTMLElement): void => {
  const dataHref = element.getAttribute('data-href');

  if (dataHref) {
    // eslint-disable-next-line no-param-reassign
    element.setAttribute('href', dataHref);
  }
};

const removeOnMouseDown = (element: HTMLElement): void => element.removeAttribute('onmousedown');

const linkResults = querySearchResults();

linkResults.forEach((element) => {
  replaceHref(element);
  removeOnMouseDown(element);
});
