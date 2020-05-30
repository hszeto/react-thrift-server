# Thrift mock server

### Dependencies:
Checkout the `devDependencies` and `dependencies` list in `package.json`

### Thrift IDL
The IDL file locates in `./thrift`

### Install

```sh
$ npm install
```

### Codegen

```sh
$ npm run codegen
```
It will read the IDL in `./thrift` and create Thrift related files in `./src/codegen`  

### Start

```sh
$ npm start
```

The Thrift server should be running on port 8000.

### Usage
`getUserInfo`  
Accept an ID and returns users email and name  

A mock user database is in `src/data.ts`. There are 5 random users and a `findUser` method.

