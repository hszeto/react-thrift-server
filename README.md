# Thrift mock server

### Thrift IDL
The IDL file are located in `./thrift`

### Install

```sh
$ npm install
```

### Codegen

```sh
$ npm run codegen
```

### Start

```sh
$ npm start
```

The Thrift server should be running on port 8000.

### Usage
`getUserInfo`  
Accept an ID and returns users email and name  

A mock user database is in `src/data.ts`. There are 5 random users and a `findUser` method.

