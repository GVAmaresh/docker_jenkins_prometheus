# Express Monitoring API with Prometheus, Grafana, and Loki

This is a Node.js API using Express with monitoring capabilities via Prometheus, Grafana, and Loki. The project also includes a MongoDB database, a frontend Next.js, and CI/CD using Jenkins with Docker.


* Unit Testing, Integration Testing, and E2E Testing
* Performance Monitoring with Grafana
* Fully Containerized Environment

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Monitoring**: Prometheus, Grafana, Loki
- **CI/CD**: Jenkins
- **Containerization**: Docker, Docker Compose


---

### Project Architecture

```
                     +------------+
                     |  Developer |
                     +------------+
                            |
                            v
                 +-------------------+
                 |  Push Code (Git)   |
                 +-------------------+
                            |
                            v
                   +----------------+
                   |  Jenkins CI/CD  |
                   +----------------+
                            |
          +----------------+----------------+
          |                                 |
+-----------------+               +----------------+
|  Build & Test   |               |   Grafana (PM) |
|   (Docker)      |               |   (Docker)     |
+-----------------+               +----------------+
          |                                 |
          v                                 v
  +----------------+               +----------------+
  | Deploy API     |               |  Logs & Metrics|
  | (Docker + DB)  |               |   Visualization|
  +----------------+               +----------------+
```

### Features

- ✅ Next.js API with Node.js Backend
- ✅ MongoDB as Database
- ✅ Dockerized Environment
- ✅ Jenkins CI/CD Pipeline for Build & Deployment
- ✅ Unit, Integration & E2E Testing
- ✅ Performance Monitoring with Grafana

---
### Project File Structure

```
.
├── client
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── global.css
│   ├── public
│   ├── package.json
│   ├── Dockerfile
│   └── package-lock.json
|
├── server
│   ├── controllers
│   │   └── userControllers.ts
│   ├── models
│   │   └── userModel.ts
│   ├── routes
│   │   └── userRouter.ts
│   ├── tests
│   │   ├── unit
│   │   │   └── userController.test.ts
│   │   ├── integration
│   │   │   └── userRouter.test.ts
│   │   └── e2e
│   │       └── userE2E.test.ts
│   ├── app.tsx
│   ├── Dockerfile
│   ├── jest.config.ts
│   ├── jest.setup.ts
│   ├── server.ts
│   └── tsconfig.json
|
├── monitoring
│   ├── prometheus.yml    
│   ├── grafana.ini      
│   ├── dashboards/       
│   └── data_sources/    
| 
├── cicd
│   ├── Jenkinsfile      
|
├── .gitignore
├── docker-compose.yml
├── LICENSE
└── Readme.md

```
### Frontend Setup

1. Run the following command to create the frontend:

    ```bash
    npx create-next-app client
    ```
---

### Backend Setup

1.  Initialize an npm project

    ```bash
    npm init -y
    ```

2. Install TypeScript, Nodemon, and dependencies

    ```bash
    npm i --save-dev typescript nodemon jest supertest ts-node @types/node @types/jest
    ```

3. Create a TypeScript config file (```tsconfig.json```)

    ```bash
    nano tsconfig.json
    ```

    Paste the following:

    ```json
    {
    "compilerOptions": {
        "module": "commonjs",
        "esModuleInterop": true,
        "target": "es6",
        "moduleResolution": "node",
        "sourceMap": true,
        "outDir": "dist"
    },
    "lib": ["es2015"]
    }
    ```

4. Create a Nodemon config file (```nodemon.json```)
    ```bash
    nano nodemon.json
    ```
    Paste the following:
    ```json
    {
    "watch": ["src"],
    "ext": "ts",
    "execMap": {
        "ts": "node --loader ts-node/esm"
    }
    }
    ```

5. Update ```package.json``` scripts

    In ```package.json```, add:

    ```json
    "start": "npx nodemon app.py",
    ```

6. Run the project

    ```bash
    npm start
    ```
---

### Docker Setup

#### This setup uses Docker to run Ubuntu, Jenkins, Prometheus, and Grafana.

1. Start Ubuntu Container

    ```bash
    docker run -d ubuntu
    ```
2. Start Grafana
    ```bash
    docker run -d -p 4000:3000 --name=grafana grafana/grafana-oss
    ```
3. Start Jenkins

    ```bash
    docker network create jenkins
    ```

    ```bash
    docker run --name jenkins-blueocean --restart=on-failure --detach `
    --network jenkins --env DOCKER_HOST=tcp://docker:2376 `
    --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 `
    --volume jenkins-data:/var/jenkins_home `
    --volume jenkins-docker-certs:/certs/client:ro `
    --publish 8080:8080 --publish 50000:50000 myjenkins-blueocean:2.414.2
    ```
    Cmd to get the password for Jenkins
    
    ```bash
    docker exec jenkins-blueocean cat /var/jenkins_home/secrets/initialAdminPassword    
    ```

## Steps that how the Jenkins works 
#### Once the docker compose builds

Open your browser and visit:

- Application: http://localhost:5000
- Grafana: http://localhost:3000
- Loki (logs): http://localhost:3100
- Prometheus Metrics: http://localhost:5000/metrics


#### List available API endpoints.
```markdown
## API Endpoints

| Endpoint       | Method | Description |
|---------------|--------|-------------|
| `/`           | GET    | Health check endpoint |
| `/slow`       | GET    | Simulates a slow response and potential error |
| `/metrics`    | GET    | Exposes Prometheus metrics |

```

### To build the application with Prometheus and Loki logging

#### 📌 Required Installations

```bash
npm install express prom-client response-time winston winston-loki --save-dev @types/express @types/node
```

#### 🐳 Setting Up Docker for Loki & Grafana

Start Grafana
```bash
docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss
docker start grafana
```
Start Loki
```bash
docker run -d -p 3100:3100 --name=loki grafana/loki
docker start loki
```