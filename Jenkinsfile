pipeline {

    agent any


    stages {

        stage('Deploy Notification Service') {

            steps {

                script {

                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(

                                configName: 'Ubuntu',

                                verbose: true,

                                transfers: [

                                    sshTransfer(

                                        execCommand: '''
                                            set -e

                                            echo "===== NOTIFICATION SERVICE DEPLOYMENT STARTED ====="

                                            cd /home/master/project/microservices/notification-service

                                            git fetch origin

                                            git reset --hard origin/main

                                            npm install

                                            if pm2 describe notification-service > /dev/null 2>&1
                                            then
                                                pm2 restart notification-service
                                            else
                                                pm2 start app.js --name notification-service
                                            fi

                                            pm2 save

                                            echo "===== NOTIFICATION SERVICE DEPLOYED SUCCESSFULLY ====="
                                        '''
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }
    post {
        success {
            echo "======================================"
            echo "Notification Service Deployment Successful"
            echo "======================================"
        }
        failure {
            echo "======================================"
            echo "Notification Service Deployment Failed"
            echo "======================================"
        }
        always {
            cleanWs()
        }
    }
}