# PokeTrader
Pokemon trade fairness calculator

## Links
- [Poke API](http://pokeapi.co/docs/v2)
- [Heroku uri](https://bxblue-pokemon.herokuapp.com/api)
- [Typescript styleguide](https://google.github.io/styleguide/tsguide.html)

## passing data to the trade check route
```bash
{
  "users": {
    "p1": {
        "name": "p1",
        "pokemons" : [
            {"id": 1},
            {"id": 2}
        ]
    },
    "p2": {
        "name": "p2",
        "pokemons": [
            {"id": 3},
            {"id": 4}
        ]
    }
  }
}
```

## compile ts to js
```bash
npm build
```

## running after building
```bash
npm start
```

## compile and build
```bash
npm build-start
```

## running tests
```bash
npm run test
```

## continuously running tests
```bash
npm run test:watch
```

## heroku shenanigans
### specific dir push
```bash
git subtree push --prefix dist heroku main
```

### default push
```bash
git push heroku main
```

### show heroku logs
```bash
heroku logs --tail
```