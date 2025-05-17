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
        //   sh 'cp $ENV_FILE backend/.env'
        sh 'mkdir -p backend'
        sh 'chmod -R u+w backend'
        sh 'cat $ENV_FILE | tee backend/.env > /dev/null'

        
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

    
  }
}