# Step by step

(disclaimer: this project was done as part of an interview process)

- Starting, since the specs don't mention if the frontend should be separate from the node server that implements the API or not (as in a SPA), I decided to split the difference and implement a universal/isomorphic frontend, so it supports SSR but once it loads the frontend router handles navigation, thus some of the benefits of both worlds. After some research I decided to bootstrap the necessary setup with https://github.com/jaredpalmer/razzle . I looked into doing the setup from scratch but it looked like too much trouble and out of scope for this exercise. Razzle generated this baseline: https://github.com/jpka/express-react-universal-example/tree/a92172eedbba09753ebb9be02642acd4d90ced07

### `config-and-structure` branch
- After that I created a new branch `config-and-structure` and started doing what it says on the title. Mainly adding linting, Typescript (I always use typescript if I have a choice) and configuring jest with a multiple project setup to test the client, the server and also both in a e2e config (I didn't end up using it much). It took way too much time than anticipated. Razzle is nice but like every webpack wrapper it can be really messy to make it do exactly what you want. -> https://github.com/jpka/express-react-universal-example/commit/875d5422e2b42f2a0a616e3e0af8bf0aa92e8390 , https://github.com/jpka/express-react-universal-example/commit/4191039d7aa4973954eba92de096f7b87626617f

### `login` branch

- Initial mongo db data setup and seeding https://github.com/jpka/express-react-universal-example/commit/2dafd4addd5b385b3176f39c0661ec49f69c3ba5

- A lot of the API structure got setup as part of implementing auth via `jwt` https://github.com/jpka/express-react-universal-example/commit/e359dd7b2e9c03e401766ad6eb94439d0903cf5c

- Later the same but for frontend, started adding structure as it made sense to do so. Also finished the login feature and protected routing, with a placeholder Main view https://github.com/jpka/express-react-universal-example/commit/cbf9a3c2659a1dc0b9a81da9eee7e915d0bb3a66

###  `main-page` branch
- Basic main page without the tasks portion got implemented https://github.com/jpka/express-react-universal-example/commit/bf69ad88ac4746b6da27a217ffc81bf8ca9babf4

### `tasks` branch
- Finally, the tasks feature https://github.com/jpka/express-react-universal-example/commit/5281420a8e2ee1770a2a5a4bdc19e0f09caed135


## Notes

- I did a little bit of testing of different sorts to showcase that I can. I would have liked to do full BDD and cover every feature, at least in integration, but by the end it was taking too much time and I have other obligations
- I should have commited more often, on every feature "slice", but when I work alone and as fast as I can, I am already deep into a new thing by the time I remember to do so
- There are 0 styles. It's horrible to look at but it's parseable and functional.
