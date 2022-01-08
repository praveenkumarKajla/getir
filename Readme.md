# Getir
Getir Assignment



Open the project and install node dependencies.

**With NPM**
```shell
$ npm install 
```


Below command will start the node server

```shell
$ npm run dev
```

If don't want to start from npm script, use below command to start all with docker
```shell
$ docker-compose up
```

For testing run below command
```shell
$ npm run test
```

**API**

### request

```shell
curl --location --request GET 'https://traveen.herokuapp.com/v1/records/?startDate=2016-01-26&endDate=2018-02-02&minCount=2700&maxCount=3000'
> query params are
> startDate
> endDate
> minCount
> maxCount

```

### response
```json

{
"code": 0,
"msg": "Success",
"records": [
    {
    "key": "bxoQiSKL",
    "createdAt": "2016-01-29T01:59:53.494Z",
    "totalCount": 2991
    },
    {
    "key": "NOdGNUDn",
    "createdAt": "2016-01-28T07:10:33.558Z",
    "totalCount": 2813
    }
]
}

> records are created between startDate & endDate with sum of all the counts per record is between minCount to maxCount
```


Deployed on  [Heroku](https://traveen.herokuapp.com/v1/records/?startDate=2016-01-26&endDate=2018-02-02&minCount=2700&maxCount=2800)

HAPPY CODING
