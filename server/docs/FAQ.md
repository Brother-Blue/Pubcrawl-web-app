# FAQ

## How to parse URI query string parameters?

```none
GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
```

The Express parser provides the query string parameters in `req.query`

```js
req.query.order
// => "desc"

req.query.shoe.color
// => "blue"

req.query.shoe.type
// => "converse"
```
