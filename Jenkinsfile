pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    DOCKER_REPO = 'sakshipathak/walletsystem-images'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'staging', url: 'https://github.com/pathaksakshi/Wallet-system.git'
      }
    }

    stage('Build Images') {
      steps {
        script {
          sh 'docker compose -f docker-compose.yml build'
        }
      }
    }

    stage('Docker Hub Login & Push') {
      steps {
        script {
          sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
          sh 'docker push $DOCKER_REPO:ws-frontend-staging'
          sh 'docker push $DOCKER_REPO:ws-backend-staging'
        }
      }
    }

    stage('Deploy via Docker Compose') {
      steps {
        script {
          sh 'docker compose -f docker-compose.yml up -d'
        }
      }
    }
  }
}