# generator-game-builder 
------------------------
### This thing will scaffold a game-builder project. 

### What is game-builder? This is [game-builder](http://diegomarquez.github.io/game/)
------------------------

### Things you will need...

1. [Node](http://www.nodejs.org/)
2. [Yeoman](http://yeoman.io)

### With those two things...

```bash
git clone https://github.com/diegomarquez/generator-game-builder
cd generator-game-builder 
npm link
```

### After doing that...

```bash
yo game-builder
```

That will setup an empty Game-Builder project

### Subgenerators

```bash
yo game-builder:bundle "cool bundle name"
yo game-builder:component "cool component name"
yo game-builder:container "cool container name"
yo game-builder:extension "cool extension name"
yo game-builder:game-object "cool game-object name"
yo game-builder:renderer "cool renderer name"
yo game-builder:state "cool state name"
```

Check out [Game-Builder website](http://diegomarquez.github.io/game-builder/) for the documentation on the types of files those subgenerators scaffold create.

A generator for [Yeoman](http://yeoman.io).
