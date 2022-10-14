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
                sh 'ng serve' 
            }
        }
    }
}