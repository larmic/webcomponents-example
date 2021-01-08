CONTAINER_NAME=webcomponents-example
IMAGE_NAME=larmic/webcomponents-example
IMAGE_TAG=latest

docker-all: docker-build docker-push

docker-build:
	@echo "Remove docker image if already exists"
	docker rmi -f ${IMAGE_NAME}:${IMAGE_TAG}
	@echo "Build go docker image"
	DOCKER_BUILDKIT=1 docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
	@echo "Prune intermediate images"
	docker image prune --filter label=stage=intermediate -f

docker-push:
	docker push ${IMAGE_NAME}:${IMAGE_TAG}

docker-run:
	docker run -d -p 8080:80 --rm --name ${CONTAINER_NAME} ${IMAGE_NAME}

docker-stop:
	docker stop ${CONTAINER_NAME}
