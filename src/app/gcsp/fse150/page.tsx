import { readFileSync } from 'fs';
import { join } from 'path';

export default function FSE150Page() {
  // Read HTML file at build time
  const htmlPath = join(process.cwd(), 'src/app/gcsp/fse150.html');
  const htmlContent = readFileSync(htmlPath, 'utf-8');

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}

