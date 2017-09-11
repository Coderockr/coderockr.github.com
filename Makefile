.PHONY: all
all: build

build:
	cd static; npm install
	cd static; bower install
	cd static; gulp build

serve:
	cd static; gulp serve
