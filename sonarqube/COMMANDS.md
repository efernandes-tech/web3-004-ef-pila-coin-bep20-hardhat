# SonarQube Commands

## Build and Run SonarQube

```cmd
cd ./sonarqube
docker build -t sonarqube-local .
docker run -d --name sonarqube -p 1337:9000 sonarqube-local
```

-   Access: http://localhost:1337
-   Default credentials: admin/admin

## React TypeScript Project Analysis

### 1. Install SonarScanner CLI

npm install -g sonarqube-scanner

### 2. Create sonar-project.properties in your React project root

```properties
sonar.projectKey=my-react-app
sonar.projectName=My React App
sonar.projectVersion=1.0
sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx
sonar.exclusions=**/node_modules/**,**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx,build/**,coverage/**
sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

### 3. Run analysis

```cmd
sonar-scanner \
 -Dsonar.host.url=http://localhost:1337 \
 -Dsonar.login=your-token
```

### Example with test coverage (using Jest)

-   Install dependencies

```cmd
npm install --save-dev jest ts-jest @types/jest
```

-   Run tests with coverage

```cmd
npm test -- --coverage --watchAll=false
```

-   Run SonarQube analysis

```cmd
sonar-scanner \
 -Dsonar.projectKey=my-react-app \
 -Dsonar.sources=src \
 -Dsonar.host.url=http://localhost:1337 \
 -Dsonar.login=sqp_your_token_here \
 -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
```

### Alternative: Using package.json script

-   Add to package.json:

```json
"scripts": {
    "sonar": "sonar-scanner"
}
```

-   Then run:

```cmd
npm run sonar
```

## .NET Project Analysis

### 1. Install SonarScanner for .NET

```cmd
dotnet tool install --global dotnet-sonarscanner
```

### 2. Create a project in SonarQube and get the token

-   Navigate to http://localhost:1337 and create a new project
-   Generate a token for the project

### 3. Run analysis on your .NET project

-   Begin analysis

```cmd
dotnet sonarscanner begin /k:"project-key" /d:sonar.host.url="http://localhost:1337" /d:sonar.login="your-token"
```

-   Build your project

```cmd
dotnet build
```

-   End analysis

```cmd
dotnet sonarscanner end /d:sonar.login="your-token"
```

### Example with specific parameters

```cmd
dotnet sonarscanner begin \
 /k:"MyProject" \
 /d:sonar.host.url="http://localhost:1337" \
 /d:sonar.login="sqp_your_token_here" \
 /d:sonar.cs.opencover.reportsPaths="**/coverage.opencover.xml" \
 /d:sonar.cs.vstest.reportsPaths="**/\*.trx"

dotnet build MyProject.sln

dotnet sonarscanner end /d:sonar.login="sqp_your_token_here"
```

## Docker Management

-   Stop SonarQube

```cmd
docker stop sonarqube
```

-   Start SonarQube

```cmd
docker start sonarqube
```

-   Remove container

```cmd
docker rm sonarqube
```

-   Remove image

```cmd
docker rmi sonarqube-local
```
