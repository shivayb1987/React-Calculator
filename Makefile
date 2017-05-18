BIN = ./node_modules/.bin
BUILD_DIR = ./build
STYLE_DIR = ./styles

clean:
	rm -rf $(BUILD_DIR)

less:
	mkdir -p build/css
	$(BIN)/lessc --source-map $(STYLE_DIR)/index.less $(BUILD_DIR)/css/index.css

enableLocal:
	# <== disable remote ==>
	-sed -i.bak 's/<script>isRemote = true<\/script>/<script>isRemote = false<\/script>/g' ./index.html
	-sed -i.bak 's/<script src="\/gsf\/owasp\/csrf-guard.js"><\/script>//g' ./index.html

lint:
	@$(BIN)/eslint --ext .jsx,.es src/**

dev:
	-@NODE_ENV=development $(BIN)/gulp dev --watch

install: installdeps

installdeps:
	-@npm install

build:
	-@NODE_ENV=development 
	$(BIN)/webpack -d --watch