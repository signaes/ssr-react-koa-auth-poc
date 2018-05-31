import fs from 'fs';
import path from 'path';

const html = () => fs.readFileSync(path.resolve('./app/views/template/index.html')).toString();

const template = ({ title, content, state, script }) =>
  html()
    .replace('${title}', title)
    .replace('${content}', content)
    .replace('${state}', JSON.stringify(state))
    .replace('${script}', script);

export default template;
