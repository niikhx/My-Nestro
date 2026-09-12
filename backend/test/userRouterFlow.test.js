import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('user router should expose credential-confirm flow endpoints behind protect middleware', () => {
  const routerSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/routers/user.routers.js'),
    'utf8'
  );

  assert.match(
    routerSource,
    /router\.post\("\/logout-with-credentials",\s*protect,\s*logoutWithCredentials\)/,
    'logout-with-credentials route must be registered behind protect middleware'
  );

  assert.match(
    routerSource,
    /router\.post\("\/delete-account",\s*protect,\s*deleteAccountWithCredentials\)/,
    'delete-account route must be registered behind protect middleware'
  );
});
