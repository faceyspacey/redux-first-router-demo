pipeline {
    agent any
    options {
        timestamps()
    }
    environment {
        CI = 'true'
        REGISTRY = credentials("REGISTRY")
        IMAGE_TAG = sh(returnStdout: true, script: "echo '${env.BUILD_TAG}' | sed 's/%2F/-/g'").trim()
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
        stage ("Build") {
            steps {
                sh "make build"
            }
        }
    }
    post {
        always {
            sh 'make docker-down-clear || true'
        }
    }
}
