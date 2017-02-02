

### 설치 관련 패키지

| 이름  | 설명  |
|---|---|
| mongodb-org  | A metapackage that will automatically install the four component packages listed below.  |
| mongodb-org-server  | Contains the mongod daemon and associated configuration and init scripts  |
| mongodb-org-mongos  | Contains the mongos daemon.  |
| mongodb-org-shell  | Contains the mongo shell.  |
| mongodb-org-tools  | Contains the following MongoDB tools: mongoimport bsondump, mongodump, mongoexport, mongofiles, mongooplog, mongoperf, mongorestore, mongostat, and mongotop.  |


The mongodb-org-server package provides an initialization script that starts mongod with the /etc/mongod.conf configuration file.
mongodb-org-server 패키지는

The default /etc/mongod.conf configuration file supplied by the packages have bind_ip set to 127.0.0.1 by default. Modify this setting as needed for your environment before initializing a replica set.

### 데이터 타입
| 타입  | 설명  |
|---|---|
| String              | This is the most commonly used datatype to store the data. String in MongoDB must be UTF-8 valid.  |
| Integer             | This type is used to store a numerical value. Integer can be 32 bit or 64 bit depending upon your server.  |
| Boolean             | This type is used to store a boolean (true/ false) value.  |
| Double              | This type is used to store floating point values.  |
| Min/Max Keys        | This type is used to compare a value against the lowest and highest BSON elements.  |
| Arrays              | This type is used to store arrays or list or multiple values into one key.  |
| Timestamp           | This can be handy for recording when a document has been modified or added.  |
| Object              | This datatype is used for embedded documents.  |
| Null                | This type is used to store a Null value.  |
| Symbol              | This datatype is used identically to a string; however, it's generally reserved for languages that use a specific symbol type.  |
| Date                | This datatype is used to store the current date or time in UNIX time format. You can specify your own date time by creating object of Date and passing day, month, year into it. |
| Object ID           | This datatype is used to store the document’s ID.  |
| Binary data         | This datatype is used to store binary data.  |
| Code                | This datatype is used to store JavaScript code into the document.  |
| Regular expression  | This datatype is used to store regular expression.  |



### Basic Query Handling
```javascript
// MongoDB CRUD
db.COLLECTION_NAME.find();
db.COLLECTION_NAME.insert({"FIELD": VALUE}, "FIELD": VALUE}}); // INSERT OBJECTID AUTO
db.COLLECTION_NAME.save({"FIELD": VALUE}, "FIELD": VALUE}}); // SAVE OBJECTID AUTO
db.COLLECTION_NAME.update({"FIELD": VALUE}, {"$set" : {"FIELD" : VALUE }});
db.COLLECTION_NAME.remove();

// Sort, Skip, Limit => Paging
db.COLLECTION_NAME.find().sort();
db.COLLECTION_NAME.find().skip();
db.COLLECTION_NAME.find().limit();
```







### [Bulk API](https://docs.mongodb.com/manual/reference/method/Bulk/)
Ordered : every operation will be executed in the order they are added to the bulk operation.
UnOrdered : there is no guarantee what order the operations are executed


### [Aggregation](https://docs.mongodb.com/manual/aggregation/)
- aggregation pipeline
- the map-reduce function
- single purpose aggregation methods.