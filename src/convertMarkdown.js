import marked from 'marked';

const renderer = new marked.Renderer();

renderer.heading = (text, level) =>
  `<h${level} class="subtitle is-${level}">${text}</h${level}>`;

renderer.table = (header, body) => `<table class="table">${header}${body}</table>`;

renderer.list = body => body;

renderer.listitem = text => `<p>&bull; ${text}</p>`;

const convertMarkdown = markdown => marked(markdown, {
  renderer,
});

export default convertMarkdown;
