pipeline {
    agent any
    
    environment {
        // Docker Compose file for Jenkins build
        COMPOSE_FILE = 'docker-compose.jenkins.yml'
        
        // Environment variables
        MONGO_ROOT_USERNAME = credentials('mongo-username')
        MONGO_ROOT_PASSWORD = credentials('mongo-password')
        MONGO_DB_NAME = 'AiMentalHealth'
        JWT_SECRET = credentials('jwt-secret')
        
        // Port configurations (different from Part I)
        MONGO_PORT = '27018'
        BACKEND_PORT = '5001'
        FRONTEND_PORT = '3001'
        
        // EC2 IP (update this with your EC2 public IP)
        EC2_IP = '13.51.166.215'
        FRONTEND_URL = "http://${EC2_IP}:3001"
        VITE_API_BASE_URL = "http://${EC2_IP}:5001/api"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }
        
        stage('Environment Setup') {
            steps {
                script {
                    echo 'Setting up environment variables...'
                    sh '''
                        cat > .env << EOF
NODE_ENV=production
MONGO_ROOT_USERNAME=${MONGO_ROOT_USERNAME}
MONGO_ROOT_PASSWORD=${MONGO_ROOT_PASSWORD}
MONGO_DB_NAME=${MONGO_DB_NAME}
MONGO_PORT=${MONGO_PORT}
BACKEND_PORT=${BACKEND_PORT}
FRONTEND_PORT=${FRONTEND_PORT}
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES_IN=7d
FRONTEND_URL=${FRONTEND_URL}
VITE_API_BASE_URL=${VITE_API_BASE_URL}
EOF
                    '''
                }
            }
        }
        
        stage('Stop Existing Containers') {
            steps {
                script {
                    echo 'Stopping any existing containers...'
                    sh '''
                        docker-compose -f ${COMPOSE_FILE} down || true
                    '''
                }
            }
        }
        
        stage('Build Application') {
            steps {
                script {
                    echo 'Building application with Docker Compose...'
                    sh '''
                        docker-compose -f ${COMPOSE_FILE} up -d --build
                    '''
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    echo 'Waiting for services to start...'
                    sleep(time: 30, unit: 'SECONDS')
                    
                    echo 'Checking MongoDB health...'
                    sh '''
                        docker exec jenkins-mongodb mongosh --eval "db.adminCommand('ping')" || exit 1
                    '''
                    
                    echo 'Checking Backend health...'
                    sh '''
                        for i in {1..10}; do
                            if curl -f http://localhost:${BACKEND_PORT}/api/health; then
                                echo "Backend is healthy"
                                exit 0
                            fi
                            echo "Waiting for backend... ($i/10)"
                            sleep 10
                        done
                        echo "Backend health check failed"
                        exit 1
                    '''
                }
            }
        }
        
        stage('Run Selenium Tests') {
            steps {
                script {
                    echo 'Running Selenium automated tests...'
                    sh '''
                        cd tests
                        docker build -t selenium-tests .
                        docker run --network host selenium-tests
                    '''
                }
            }
        }
        
        stage('Display Service Info') {
            steps {
                script {
                    echo 'Displaying running containers...'
                    sh '''
                        docker-compose -f ${COMPOSE_FILE} ps
                    '''
                    
                    echo '====================================='
                    echo 'Application deployed successfully!'
                    echo '====================================='
                    echo "Frontend: http://${EC2_IP}:${FRONTEND_PORT}"
                    echo "Backend API: http://${EC2_IP}:${BACKEND_PORT}/api/health"
                    echo "MongoDB: ${EC2_IP}:${MONGO_PORT}"
                    echo '====================================='
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline executed successfully!'
            echo 'Application is running with volume mounts'
            mail to: 'your-email@example.com',
                 subject: "Jenkins Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "The build was successful. Check console output at ${env.BUILD_URL}"
        }
        failure {
            echo 'Pipeline execution failed!'
            sh 'docker-compose -f ${COMPOSE_FILE} logs'
            sh 'docker-compose -f ${COMPOSE_FILE} down'
            mail to: 'your-email@example.com',
                 subject: "Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "The build failed. Check console output at ${env.BUILD_URL}"
        }
        always {
            echo 'Cleaning up workspace...'
            cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true)
        }
    }
}
