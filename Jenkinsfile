pipeline {
  agent any

  environment {
    PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    // DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    // DOCKER_REPO = 'sakshipathak/walletsystem-images'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'staging', url: 'https://github.com/pathaksakshi/Wallet-system.git'
      }
    }

    stage('Use Env File') {
      steps {
        // Copy the env file from credentials to the backend folder
        withCredentials([file(credentialsId: 'backend-env-file', variable: 'ENV_FILE')]) {
          sh 'cp $ENV_FILE backend/.env'
        }
      }
    }

    stage('Build Images') {
      steps {
        script {
           sh 'docker --version'
          sh 'docker compose -f docker-compose.yml build'
        }
      }
    }

    stage('Run Containers') {
      steps {
        script {
          // Optional: Stop and remove existing containers
          sh 'docker compose -f docker-compose.yml down'

          // Start new containers
          sh 'docker compose -f docker-compose.yml up -d'
        }
      }
    }

    // stage('Docker Hub Login & Push') {
    //   steps {
    //     script {
    //       sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
    //       sh 'docker push $DOCKER_REPO:ws-frontend-staging'
    //       sh 'docker push $DOCKER_REPO:ws-backend-staging'
    //     }
    //   }
    // }

    // stage('Deploy via Docker Compose') {
    //   steps {
    //     script {
    //       sh 'docker compose -f docker-compose.yml up -d'
    //     }
    //   }
    // }
  }
}