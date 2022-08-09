#!/usr/bin/env zx

process.env.FORCE_COLOR=3

const examplePath = path.join(__dirname, '..', 'example');

const pkgs = await glob(`${examplePath}/*/package.json`);

for (const pkg of pkgs) {
  const example = path.dirname(pkg)
  cd(example)
  await $`npm run build`
}
