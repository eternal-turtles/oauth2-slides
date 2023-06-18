GIT_COMMIT_SHA := $(shell git rev-parse --short HEAD)
TARGET_PORT ?= 8080
CONTAINER_PORT ?= 8080
DOCKER_IMAGE_NAME := oauth2-slides:$(GIT_COMMIT_SHA)
DOCKER_CONTAINER_NAME := oauth2-slides
RUN_ARGS := run --rm -it -p $(TARGET_PORT):$(CONTAINER_PORT) --name $(DOCKER_CONTAINER_NAME) $(DOCKER_IMAGE_NAME)
PODMAN_COMMAND := $(shell command -v podman 2> /dev/null)

ifdef PODMAN_COMMAND
	DOCKER_COMMAND := podman
else
	DOCKER_COMMAND := docker
endif

.PHONY: build-docker
build-docker:
	$(DOCKER_COMMAND) build -t $(DOCKER_IMAGE_NAME) .

.PHONY: start
start:
	$(DOCKER_COMMAND) $(RUN_ARGS) npm run start

.PHONY: build
build:
	NODE_ENV=production $(DOCKER_COMMAND) $(RUN_ARGS) npm run build

# .PHONEY: test
# test:
#   NODE_ENV=production $(DOCKER_COMMAND) $(RUN_ARGS) npm run test

.PHONY: stop-docker
stop-docker:
	$(DOCKER_COMMAND) stop $(DOCKER_CONTAINER_NAME)

