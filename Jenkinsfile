pipeline {
    agent any

    environment {
        IMAGE_NAME = "common-service"
        CONTAINER_NAME = "common-service-container"
        PORT = "3000"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/chayanon12/Common_Service.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                script {
                    sh """
                    docker stop $CONTAINER_NAME || true
                    docker rm $CONTAINER_NAME || true
                    """
                }
            }
        }

        stage('Run New Container') {
            steps {
                sh 'docker run -d -p $PORT:$PORT --name $CONTAINER_NAME $IMAGE_NAME'
            }
        }
    }

    post {
        success {
            echo 'Deployment Success ✅'
        }
        failure {
            echo 'Deployment Failed ❌'
        }
    }
}
