pipeline {
    agent any
    options {
        timestamps()
    }
    environment {
        CI = 'true'
    }
    stages {
        stage ("Init") {
            steps {
                sh "make init"
            }
        }
        stage ("Lint") {
            steps {
                sh "make lint"
            }
        }
        stage ("Down") {
            steps {
                sh "make docker-down-clear"
            }
        }
    }
    post {
        always {
            sh 'make docker-down-clear || true'
        }
    }
}
