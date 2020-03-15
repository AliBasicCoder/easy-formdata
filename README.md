# easy-formdata

```easy-formdata``` is a module to parse form data easily

## Usage

```js
const { expressParser, isFile } = require("easy-formdata");
const express = require("express");
const app = express();

app.use(expressParser());

app.post("/api", ({ body }, res) => {
  for(const key in body){
    if(isFile(body[key]))
      console.log(`${key} is ${body[key].size} bytes file`);
    else
      console.log(`${key} is a text field`);  
  }
  res.send(body);
})

app.listen(4000, () => console.log("server started"));
```

## Types

### expressParser

is the middleware that parsers the formdata for [express](https://github.com/expressjs/express)

### isFile

returns true if the argument passed is a [File](#File) Object

### File

an interface having this properties

```js
  interface File {
    /** the file name */
    filename: string;
    /** the encoding of the file  */
    encoding: string;
    /** the mimetype of the file */
    mimetype: string;
    /** the size of the file */
    size: number;
    /** the data of the file */
    data: Buffer;
  }
```
