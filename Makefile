
APP_IMAGE_TAG ?= SNAPSHOT
APP_IMAGE_NAME ?= nginx-test
APP_IMAGE_NAME := ${APP_IMAGE_NAME}:${APP_IMAGE_TAG}

NODE_ENV ?= development

DOCKER_COMPOSE ?= docker-compose

### Applications
DOCKER ?= docker
DOCKER_RUN ?= ${DOCKER_COMPOSE} run --rm
DOCKER_BASE_IMAGE ?= node

NPM ?= ${DOCKER_RUN} -e NODE_ENV=${NODE_ENV} ${DOCKER_BASE_IMAGE} npm

### Helpers
all: build

tinker:
	@${DOCKER_RUN} ${DOCKER_BASE_IMAGE} /bin/bash

.PHONY: all tinker

build:
	npm install
	${DOCKER} build --rm -t ${APP_IMAGE_NAME} .

.PHONY: build

### Running
run:
	${DOCKER_RUN} apps
.PHONY: run

clean-all: clean clean-assets clean-docker

clean-assets:
	@rm -rf ./node_modules

clean-docker:
	${DOCKER} rm -fv $$(${DOCKER} ps -aq) 2> /dev/null || exit 0

clean:
	@rm -rf ./build

.PHONY: clean-all clean-assets clean-docker clean
