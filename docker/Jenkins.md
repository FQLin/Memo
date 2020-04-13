`docker pull jenkins/jenkins`

To use the latest LTS: docker` pull jenkins/jenkins:lts`
To use the latest weekly: `docker pull jenkins/jenkins`

GitHub文档：https://github.com/jenkinsci/docker/blob/master/README.md
官方文档：https://jenkins.io/zh/doc/book/installing/#docker

macOS和Linux:
docker run \
-u root \
--rm \
-d \
-p 8080:8080 \
-p 50000:50000 \
-v /docker/jenkins/var/jenkins_home:/var/jenkins_home \
-v /docker/jenkins/var/run/docker.sock:/var/run/docker.sock \
jenkins/jenkins:lts
--rm 容器停止后会自动删除容器，应谨慎使用

windows：
以下命令在cmd中可以执行，但在powershell中会出错
docker run ^
-u root ^
-d ^
--rm ^
-p 8081:8080 ^
-p 50000:50000 ^
-v /f/docker/jenkins/var/jenkins_home:/var/jenkins_home ^
-v /f/docker/jenkins/var/run/docker.sock:/var/run/docker.sock ^
jenkins/jenkins:lts