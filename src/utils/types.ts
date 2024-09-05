export type HtmlCssContent = {
  html: string;
  css: string;
};

export const defaultHtmlCssContent: HtmlCssContent = {
  html: '',
  css: '',
};

export const exampleHtmlCssContent: HtmlCssContent = {
  html: '<h1>Cualquier HTML aqui</h1>',
  css: 'h1 { color: blue; }',
};
