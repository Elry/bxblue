# bxblue
Bxblue pokemon trade fairness calculator challenge

## Links
- [Poke API](http://pokeapi.co/docs/v2)
- [Heroku uri](https://bxblue-pokemon.herokuapp.com/api)

## compile ts to js
```bash
npm build
```

## running after building
```bash
npm start
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