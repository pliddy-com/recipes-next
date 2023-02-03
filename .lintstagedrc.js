// eslint-disable-next-line @typescript-eslint/no-var-requires
const ESLint = require('eslint').ESLint;

const fixPrettier = 'prettier --ignore-unknown --write';

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint();
  // eslint-disable-next-line no-undef
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file);
    })
  );
  const filteredFiles = files.filter((_, i) => !isIgnored[i]);
  return filteredFiles.join(' ');
};

module.exports = {
  '*.*!({js,jsx,ts,tsx})': fixPrettier,
  '*.{js,jsx,ts,tsx}': async (files) => {
    const filesToLint = await removeIgnoredFiles(files);

    const esLintFixIgnore = `eslint --max-warnings=0 ${filesToLint} --fix`;
    const prettierFixIgnore = `prettier --ignore-unknown --write ${files.join(
      ' '
    )}`;

    return [prettierFixIgnore, esLintFixIgnore];
  },
};
