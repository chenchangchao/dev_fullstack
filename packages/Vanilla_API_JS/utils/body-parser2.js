export  default function bodyParser(req, res, next) {
 if (req.headers["content-type"] === "application/json") {
  let body = [];
  req.on("data", (chunk) => {
   body.push(chunk);
  });
  req.on("end", () => {
   req.body = Buffer.concat(body).toString();
   next();
  });
 } else {
  next();
 }
}