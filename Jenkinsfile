pipeline {

    agent any

    parameters {

        choice(
            name: 'BRANCH',
            choices: [
                'main',
                'dev'
            ],
            description: 'Select the Git branch to deploy'
        )

    }

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

                                        execCommand: """

                                            set -e

                                            echo "Selected Branch : ${params.BRANCH}"

                                            echo "===== NOTIFICATION SERVICE DEPLOYMENT STARTED ====="

                                            cd /home/master/project/microservices/notification-service

                                            git fetch origin

                                            git checkout ${params.BRANCH}

                                            git reset --hard origin/${params.BRANCH}

                                            npm install

                                            if pm2 describe notification-service > /dev/null 2>&1
                                            then
                                                pm2 restart notification-service
                                            else
                                                pm2 start app.js --name notification-service
                                            fi

                                            pm2 save

                                            echo "===== NOTIFICATION SERVICE DEPLOYED SUCCESSFULLY ====="

                                            """

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