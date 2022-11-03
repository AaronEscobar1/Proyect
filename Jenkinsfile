
pipeline {
    agent {
        node {
            label 'jenkins-frontend'
        }
    }
    stages {
        stage('Build') { 
            when {
                branch "develop"
            }
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') {
            when {
                branch "develop"
            } 
            steps {
                sh 'ng test' 
            }
        }
        stage('Deploy') {
            when {
                branch "develop"
            } 
            steps {
                sh 'pm2 delete nomina-frontend'
                sh 'pm2 start "npm run start:prod" --name nomina-frontend' 
            }
        }
    }
}