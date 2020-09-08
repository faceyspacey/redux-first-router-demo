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
        stage("Push") {
            when {
                branch "master"
            }
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'REGISTRY_AUTH',
                        usernameVariable: 'USER',
                        passwordVariable: 'PASSWORD'
                    )
                ]) {
                    sh "docker login -u=$USER -p='$PASSWORD' $REGISTRY"
                }
                sh "make push"
            }
        }
        stage("Prod") {
            when {
                branch "master"
            }
            steps {
                withCredentials([
                    string(credentialsId: 'PRODUCTION_HOST', variable: 'HOST'),
                    string(credentialsId: 'PRODUCTION_PORT', variable: 'PORT')
                ]) {
                    sshagent(credentials: ['PRODUCTION_AUTH']) {
                        sh "BUILD_NUMBER=${env.BUILD_NUMBER} make deploy"
                    }
                }
            }
        }
    }
    post {
        always {
            sh 'make docker-down-clear || true'
            sh 'make deploy-clean || true'
        }
    }
}
