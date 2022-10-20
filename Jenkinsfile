pipeline {
    agent {
        node {
            label 'jenkins-frontend'
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') { 
            steps {
                sh 'ng test' 
            }
        }
        stage('Deploy') { 
            steps {
                sh 'pm2 start "ng serve --host 0.0.0.0" --name nomina-frontend' 
            }
        }
    }
}