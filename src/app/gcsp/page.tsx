import { readFileSync } from 'fs';
import { join } from 'path';

export default function GCSPPage() {
  // Read HTML file at build time
  const htmlPath = join(process.cwd(), 'src/app/gcsp/index.html');
  const htmlContent = readFileSync(htmlPath, 'utf-8');

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}

