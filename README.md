# Yellow Foods MongoDB
A MongoDB-backed REST API in JavaScript (Node.js) and Express.js:
```HTTP
GET api/foods/6096f88cdedd5a1ea03f7cc9
```

```JavaScript
{
    "_id": "6096f88cdedd5a1ea03f7cc9",
    "name": "banana"
}
```

```HTTP
GET api/foods/60956ead6b03db1d7c864bab/nutriententries
```

```JavaScript
[
    {
        "_id": "6096f88cdedd5a1ea03f7cc9",
        "food_id": "60956ead6b03db1d7c864bab",
        "nutrient_id": "6096d164674eb5323cb2a19d",
        "unit_id": "6096d16d674eb5323cb2a19e",
        "amount": { "$numberDecimal": "41.677" }
    },
    {...}
]
```

```HTTP
PUT api/foods/60956ead6b03db1d7c864bab/nutriententries/6096f88cdedd5a1ea03f7cc9
{
  "_id": "6096f88cdedd5a1ea03f7cc9",
  "food_id": "60956ead6b03db1d7c864bab",
  "nutrient_id": "6096d164674eb5323cb2a19d",
  "unit_id": "6096d164674eb5323cb2a19d",
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
- MongoDB Community Server 4.4.3
- MongoDB Database Tools 100.2.1

## Build and run:
### nodemon / first-run and open:
- `npm update`
- `npm install`
- `npm start`

## Credits:
- express-generator by https://www.npmjs.com/package/express-generator (MIT license)
- express-validator by https://www.npmjs.com/package/express-validator (MIT license)
- Problem Details for HTTP APIs by https://tools.ietf.org/html/rfc7807
