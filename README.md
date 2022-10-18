# Caveman's Server

A restaurant app

## Setup

### Node

This code uses ES6+ ``import/export`` syntax. To prevent errors do the following:

- When executing directly:

```sh
NODE_OPTIONS=--experimental-specifier-resolution=node NODE_NO_WARNINGS=1 node index.js
```

- When executing through IDE, include environment variables in run/debug configurations:

```sh
NODE_OPTIONS=--experimental-specifier-resolution=node;NODE_NO_WARNINGS=1  # run config
NODE_OPTIONS=--experimental-vm-modules;NODE_NO_WARNINGS=1  # test config
```

### Config

1. Create ``.env`` file in the project's root directory.

2. Set the following constants:

   - ``APP`` - app name
   - ``ENV`` - ``dev``, ``test`` or ``prod``
   - ``PORT`` - server port, e.g. ``3000``
   - ``MONGO_DB_URI`` - e.g. ``mongodb://localhost:27017``
   - ``JWT_SECRET`` - jsonwebtoken secret key
   - ``JWT_EXPIRES_IN`` - jsonwebtoken expiration time, e.g. ``1h``

## Usage

```sh
npm i  # install dependencies
npm start  # run app
```
