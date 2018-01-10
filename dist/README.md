coderockr
====================

## Setup
### Requirements

Node `"^8.2.1"` (use nvm [here](https://github.com/creationix/nvm))

Yarn `"^1.3.2"` (install [here](https://yarnpkg.com))

### Structure folder

```
coderockr
├── .babelrc
├── .eslintignore
├── .eslintrc
├── .gitignore
├── CNAME
├── crossdomain.xml
├── gh-pages.sh
├── gulpfile.js
├── humans.txt
├── package.json
├── README.md
├── robots.txt
├── webpack.config.js
├── dist
└── src
    └── assets
    │   └── fonts
    │   └── images
    │   └── scripts
    │   └── styles
    └── templates
        └── components
        └── layouts
        └── page.html
```

### Install dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Build

```bash
yarn build
```

### Deploy to Github Pages (https://github.com/Coderockr/coderockr.github.com)
```bash
./gh-pages.sh
```
