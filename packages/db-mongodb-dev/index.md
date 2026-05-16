```js
USE account;
db.userinfos.find()

db.userinfos.find().pretty()

var schematodo = db.userinfos.findOne()
for (var key in schematodo) { print (key, typeof key) ; }
```