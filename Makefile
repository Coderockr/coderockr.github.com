.PHONY: all
all: build

build:
	curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
  nvm use 7
	cd src; yarn install
	npm rebuild node-sass
	gulp build

serve:
	cd src; gulp
