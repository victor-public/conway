# Conway's Game of Life Demo

[Conway's Game of Life](https://conwaylife.com/) is a cellular automaton devised by the mathematician John Conway. It is a zero-player game that follows simple rules to simulate the behavior of cells on a grid.

This repository implents a web-based version of the game. You can play it by visiting: 

[https://dada-public.github.io/conway/](https://victor-public.github.io/conway/


## This repo usage

To run the demo locally, follow these steps:

1. Clone this repository
2. Configure the repository by running: `npm install`
3. Start the development server: `npm run start`
4. Open your browser and visit: `http://localhost:1234`
5. In case you want to add or modify the code: open a feature branch (feat/xxx). When 
ready, the changes will be merged through a pull request.

This repository also includes CLI commands to help adding new features 
or fixing bugs:

* `npm install`: configures the repository for local development
* `npm start` : runs a local server
* `npm build` : builds a production ready distribution
* `npm test`: runs tests
* `npm test:watch`: runs test in watch mode
* `npm lint`: provides format, style and security tips

## CI/CD

This repository implements several workflows to enforce good practices, and deploy new versions.

1. Pre-push hook (QA): prevents test failing commits to be pushed.
2. Pre-push hook (SEMVER): enforces conventional commits.

This two hooks will be installed as part of this repository configuration step.

3. Validate workflow: runs test to ensure all incoming code in a Pull request is valid.
4. Release workflow: based in conventional-commits this workflow publishes a new Github release on each push at main.
5. Deployment workflow: updates this repository Pages on each push at main that contains relevant changes.
