pipeline{
    agent{
        docker{
            image 'node'
            label 'local'
        }
    }
    
    stages{
        stage("checking scm"){
            steps{
        checkout scm
            }
        }
        stage('build'){
        steps{
            
            sh "node --version"
        }
            
        }
        
    }
}
