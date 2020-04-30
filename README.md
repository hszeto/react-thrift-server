# Hub mock server

This Thrift service was cloned from https://github.com/kevinbgreene/thrift-tutorial.git

### Thrift IDL
The IDL file are located in `./thrift`  
The `exception` are commented out pending implementations.  

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

The Thrift server should be running on port 8095.

### Usage
`createUserSessionWithEmailAddressAndPassword`  
Accept any valid email and password string and returns:  
* 1, if email is in valid format
* 0, if email is not valid
