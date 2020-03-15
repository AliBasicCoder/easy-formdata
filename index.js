const Busboy = require("busboy");

function getData(req, callback) {
  const res = {};
  const busboy = new Busboy({ headers: req.headers });

  busboy.on("file", (fieldName, file, filename, encoding, mimetype) => {
    const dataArr = [];
    res[fieldName] = { filename, encoding, mimetype, size: 0 };

    file.on('data', data => {
      res[fieldName].size += data.length;
      dataArr.push(data);
    });

    file.on("end", () => {
      res[fieldName].data = Buffer.concat(dataArr);
    })
  });

  busboy.on('field', (fieldName, val) => {
    res[fieldName] = val;
  });

  busboy.on("finish", () => callback(res));

  req.pipe(busboy);
}

module.exports = {
  expressParser() {
    return (req, _, next) => {
      if (req.headers["content-type"].indexOf("multipart/form-data") === -1)
        return next();
      getData(req, data => {
        req.body = data;
        next();
      });
    }
  },
  parse: getData,
  isFile: (obj) => !!obj.mimetype
}
