const fs = require('node:fs');
const path = require('node:path');

const input = path.resolve('test-results/results.json');
const output = path.resolve('docs/execution-dashboard.md');

if (!fs.existsSync(input)) {
  console.error(`Missing ${input}. Run the Playwright suite first.`);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(input, 'utf8'));
const rows = [];

function collect(suite, inheritedFile = '') {
  const file = suite.file || inheritedFile;
  for (const spec of suite.specs || []) {
    for (const test of spec.tests || []) {
      const results = test.results || [];
      const last = results.at(-1) || {};
      rows.push({
        project: test.projectName || 'unknown',
        title: spec.title,
        file,
        status: test.status || last.status || 'unknown',
        duration: results.reduce((total, result) => total + (result.duration || 0), 0),
        retries: Math.max(0, results.length - 1),
      });
    }
  }
  for (const child of suite.suites || []) collect(child, file);
}

for (const suite of report.suites || []) collect(suite);
const counts = rows.reduce((summary, row) => {
  summary[row.status] = (summary[row.status] || 0) + 1;
  return summary;
}, {});
const passed = counts.expected || counts.passed || 0;
const knownDefects = rows.filter((row) => row.title.startsWith('DEF-')).length;
const productChecks = rows.length - knownDefects;
const passRate = productChecks ? (((passed - knownDefects) / productChecks) * 100).toFixed(1) : '0.0';
const generated = new Date().toISOString();

const markdown = `# Execution Dashboard

Generated: ${generated}

| Metric | Value |
|---|---:|
| Total executions | ${rows.length} |
| Product checks passed | ${passed - knownDefects}/${productChecks} |
| Known defects reproduced | ${knownDefects} |
| Unexpected failures | ${counts.unexpected || counts.failed || 0} |
| Skipped | ${counts.skipped || 0} |
| Flaky retries | ${rows.reduce((total, row) => total + row.retries, 0)} |
| Product-check pass rate | ${passRate}% |

## Results by project

| Project | Test | Status | Duration | Retries |
|---|---|---|---:|---:|
${rows.map((row) => `| ${row.project} | ${row.title.replaceAll('|', '\\|')} | ${row.status} | ${(row.duration / 1000).toFixed(2)}s | ${row.retries} |`).join('\n')}
`;

fs.writeFileSync(output, markdown);
console.log(`Wrote ${output}`);
