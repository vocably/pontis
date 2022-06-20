# @vocably/pontis

[![npm package](https://img.shields.io/npm/v/@vocably/pontis.svg)](https://www.npmjs.com/package/@vocably/pontis)

`@vocably/pontis` makes login into Chrome extension via the AWS Amplify website easy-peasy.

## Installation

`npm install --save @vocably/pontis`

## How to use

```js
// website-app/index.js

import { Auth } from '@aws-amplify/auth';
import { AppAuthStorage } from '@vocably/pontis';

const extensionId = 'baocigmmhhdemijfjnjdidbkfgpgogmb';

Auth.configure({
  // The following line sets up the custom storage
  // which exchages auth tokens with the extension
  storage: new AppAuthStorage(extensionId),
  // and the rest of Auth params:
  region: 'eu-central-1',
  userPoolId: 'eu-central-1_uSErPooL',
  //etc...
});
```

```js
// extension/service-worker.js
import { registerExtensionStorage } from '@vocably/pontis';
import { Auth } from '@aws-amplify/auth';

// The only function param is responsible for
// the storage type. It could be 'sync' or 'local'
const storage = registerExtensionStorage('sync');

Auth.configure({
  // The following line sets up the custom extension
  // storage which exchanges Auth tokens with the app
  storage: storage,
  // and the rest of Auth params:
  region: 'eu-central-1',
  userPoolId: 'eu-central-1_uSErPooL',
  //etc...
});
```

That's it.

Feel free to check [@vocably/hermes](https://github.com/vocably/hermes) if you love painless promise-based messages exchange between the extension and the app.
