# ngdux-cli

> "Automate all the things" - Nicolás Bevacqua

This is an attempt to automate the process of creating ngrx/* ducks, effects, models and middlewares. These files have proven to be really boilerplatey and having a simple tool that allows me to create simple CRUD-ready files seemed important as I spent a considerable amount of time writing / copy&pasting these.

It uses the amazing Vorpal lib.

## TODO
- [x] Basic commands (duck, model, effect, middleware, ls, cd, init, bundle)
- [x] Basic structure (Duck)
- [x] Basic structure (Effects)
- [x] Basic structure (Model)
- [x] Basic structure (Middleware)
- [x] Extract config values to a file
- [ ] Bundle should include model in reducer and effects
- [x] cd should change Vorpal's delimiter to the current dir
- [x] duck, model, effect, middleware and bundle should get a path as param, fallback to defaults
- [ ] Prompt for config values
- [ ] Store config .ngdux file
- [ ] Lift from .ngdux config file
- [ ] Test in Win (it probably doesn't work)

