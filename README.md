# Yellow Foods MongoDB
A MongoDB-backed REST API in JavaScript (Node.js) and Express.js:
```HTTP
GET api/foods/609ed176e6dd070a805b303d
```

```JavaScript
{
    "_id": "609ed176e6dd070a805b303d",
    "name": "banana"
}
```

```HTTP
GET api/foods/609ed176e6dd070a805b303d/nutriententries
```

```JavaScript
[
    {
        "_id": "609ed176e6dd070a805b304b",
        "food_id": "609ed176e6dd070a805b303d",
        "nutrient_id": "609ed176e6dd070a805b3041",
        "unit_id": "609ed176e6dd070a805b3048",
        "amount": { "$numberDecimal": "89.0" }
    },
    {
        "_id": "609ed176e6dd070a805b304c",
        "food_id": "609ed176e6dd070a805b303d",
        "nutrient_id": "609ed176e6dd070a805b3042",
        "unit_id": "609ed176e6dd070a805b3049",
        "amount": { "$numberDecimal": "0.3" }
    },
    {...}
]
```

```HTTP
PUT api/foods/609ed176e6dd070a805b303d/nutriententries/609ed176e6dd070a805b304b
{
    "_id": "609ed176e6dd070a805b304b",
    "food_id": "609ed176e6dd070a805b303d",
    "nutrient_id": "609ed176e6dd070a805b3041",
    "unit_id": "609ed176e6dd070a805b3048",
    "amount": { "$numberDecimal": "not a decimal" }
}
```

```JavaScript
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "errors": [
        {
            "value": "not a decimal",
            "msg": "Invalid value",
            "param": "amount.$numberDecimal",
            "location": "body"
        }
    ]
}
```

## Prerequisites:
- Node.js 15.6.0
- MongoDB Server 4.4.3
- MongoDB Database Tools 100.2.1

## Build and run:
### MongoDB:
- `mongorestore --db=yellow_foods_mongodb yellow_foods_mongodb/`

### nodemon / first-run and open:
- `npm update`
- `npm install`
- `npm start`

## Credits:
- express-generator by https://www.npmjs.com/package/express-generator (MIT license)
- express-validator by https://www.npmjs.com/package/express-validator (MIT license)
- Problem Details for HTTP APIs by https://tools.ietf.org/html/rfc7807
