VERSION := $(shell git rev-parse --short HEAD)
ACR_ENDPOINT := text2touch.azurecr.io
IMAGE := $(ACR_ENDPOINT)/text2touch:$(VERSION)

.PHONY: run
run:
	@echo "building image with version '$(VERSION)'...\n" &&  \
	docker build . -t $(IMAGE) &&  \
	echo "\n""built image with version '$(VERSION)'; running..." &&  \
	docker run -it -p 8000:80 $(IMAGE)

.PHONY: build
build: .build

.PHONY: deploy
deploy: .build .deploy


.PHONY: .init-infra
.init-infra:
	@echo 'initializing infra repository...\n' &&  \
	git submodule update --init --recursive --remote

.PHONY: .build
.build:
	@[ -z "`git diff --stat`" ] || {  \
  		echo 'warning: repository is not clean; to get a reliable image version you should commit changes first!\n';  \
	}
	@echo "building image with version '$(VERSION)'...\n" &&  \
	if [ `uname -m` == 'arm64' ]; then  \
		echo 'using buildx to build for amd64...\n' &&  \
		docker buildx build . --platform linux/amd64 --load -t $(IMAGE);  \
	else  \
		docker build . -t $(IMAGE);  \
	fi &&  \
	echo "\n""built image with version '$(VERSION)'; pushing to ACR...\n" &&  \
    az acr login --name text2touch &&  \
	docker push $(IMAGE) &&  \
	echo "\n""pushed image with version '$(VERSION)'.\n"

.PHONY: .deploy
.deploy: .init-infra
	@if [ "$(env)" != 'dev' ] && [ "$(env)" != 'prod' ]; then  \
		echo 'error: argument `env` must be `dev` or `prod`';  \
		exit 1;  \
	fi
	@cd infra/ && make deploy env=$(env) version=$(VERSION)
