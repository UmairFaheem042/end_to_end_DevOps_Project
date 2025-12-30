# CashFlow – End-to-End DevOps / OPS Engineering Project

## Overview
This project is designed to **mimic real-world OPS / DevOps engineering workflows** in an enterprise environment.

This project was built as a hands-on upskilling initiative to gain practical exposure to enterprise-grade OPS and DevOps workflows.

Since direct access to production systems and licensed enterprise tools is often restricted, I recreated equivalent workflows using open-source alternatives that closely resemble real-world enterprise technologies and operational practices.

The goal of this project is to demonstrate:
- End-to-end service deployment
- Observability-first architecture
- CI/CD automation
- Service lifecycle management
- Real operational problem-solving

---

## Enterprise Context & Technology Mapping

| Enterprise Stack (Company)                     | Alternative Used (This Project) |
|----------------------------------------------|----------------------------------|
| Oracle MyST (DevOps Platform)                 | Jenkins + Ansible                |
| Oracle OSB / SOA Suite (Integration Layer)    | Node.js + Express (Backend APIs) |
| Axway API Gateway                             | Kong API Gateway                 |
| Red Hat Enterprise Linux (RHEL) / VM          | Ubuntu Linux VM (WSL)            |
| Jenkins (Enterprise)                          | Jenkins (Local)                  |
| Ansible AWX                                  | Ansible CLI (invoked by Jenkins) |
| Splunk Enterprise                             | Splunk (Dockerized)              |
| Dynatrace                                    | Prometheus + Grafana             |
| Oracle Database                               | MongoDB                          |
| Containerization Platform                    | Docker                           |

---

## Application Stack

- **Frontend**: React (Dockerized via NGINX)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Gateway**: Kong
- **Monitoring**: Prometheus, Grafana
- **Logging**: Splunk
- **CI/CD**: Jenkins
- **Automation**: Ansible (invoked by Jenkins)
- **OS**: Ubuntu Linux VM (WSL)

---

## Folder Structure
    CashFlow/
    │
    ├── app/                         # Application source code
    │   ├── backend/                 # Backend service (Node.js + Express)
    │   │   ├── Dockerfile           # Docker image definition for backend
    │   │   ├── src/                 # Backend application source code
    │   │   └── logger/              # Centralized logging setup
    │   │       └── splunkLogger.js  # Winston → Splunk HEC integration
    │   │
    │   └── client/                  # Frontend application (React)
    │       └── Dockerfile           # Multi-stage Dockerfile (Build + NGINX)
    │
    ├── docker/                      # Core application docker-compose stack
    │   └── docker-compose.yml       # Frontend + Backend + MongoDB
    │
    ├── gateway/                     # API Gateway configuration
    │   └── kong/
    │       ├── docker-compose.yml   # Kong gateway runtime
    │       └── kong.yml             # Declarative routing configuration
    │
    ├── monitoring/                  # Monitoring stack
    │   ├── docker-compose.yml       # Prometheus + Grafana services
    │   └── prometheus.yml           # Scrape configuration for metrics
    │
    ├── logging/                     # Centralized logging stack
    │   └── splunk/
    │       └── docker-compose.yml   # Splunk Enterprise with HEC enabled
    │
    ├── ci/                          # CI/CD & automation
    │   ├── Jenkinsfile              # Jenkins pipeline (build + deploy)
    │   └── ansible/                 # Ansible automation (used by Jenkins)
    │       ├── inventory            # Local inventory (localhost execution)
    │       ├── deploy-app.yml       # Deploy application services
    │       ├── deploy-platform.yml  # Deploy observability stack
    │       ├── teardown-app.yml     # Stop application services
    │       └── teardown-platform.yml# Stop observability services
    │
    └── README.md                    # Project documentation




---

## Step-by-Step Implementation

### STEP 1: MongoDB Setup
- Ran MongoDB as a Docker container.
- Used Docker volumes for data persistence.

---

### STEP 2: Backend Health Checks
- Added `/api/health` endpoint in backend.
- Used for Jenkins health verification and gateway checks.

---

### STEP 3: Structured Logging (OPS-level)
- Implemented `morgan` for HTTP logs.
- Integrated `winston` for structured JSON logs.
- Logs forwarded to **Splunk HEC**.

---

### STEP 4: Metrics for Monitoring
- Exposed `/api/metrics` using `prom-client`.
- Metrics scraped by Prometheus.

---

### STEP 5: Dockerized Backend
- Created optimized Dockerfile.
- Used environment-based configuration.

---

### STEP 6: Backend + Mongo Compose Stack
- Combined backend and MongoDB into a single Docker Compose stack.
- Ensured internal Docker networking.

---

### STEP 7: Dockerized Frontend
- Built React app using multi-stage Docker build.
- Served production build via NGINX.

---

### STEP 8: Full Application Stack
- Combined frontend, backend, and database into one compose stack.
- Frontend communicates only via gateway.

---

### STEP 9: API Gateway Integration
- Added Kong API Gateway.
- External traffic routed through port `8000`.
- Backend internal port `3000` no longer exposed.

---

### STEP 10: Centralized Monitoring
- Prometheus scrapes backend metrics.
- Grafana dashboards visualize application health.
- Health checks designed to be **self-contained** (no cross-service dependency).

---

### STEP 11: Centralized Logging
- Integrated backend logs with Splunk using HTTP Event Collector.
- Structured logs indexed with proper sourcetypes.
- Observability stack runs independently of application lifecycle.

---

### STEP 12: CI/CD & Automation

#### Jenkins Responsibilities
- Build backend Docker image
- Build frontend Docker image
- Trigger Ansible playbooks

#### Ansible Responsibilities
- Deploy application services
- Deploy observability platform
- Stop/start services without deleting containers

---

## Service Lifecycle Design

### Application Layer
- Frontend
- Backend
- MongoDB
- Kong

### Platform / Observability Layer
- Prometheus
- Grafana
- Splunk

> Observability services are intentionally kept independent and long-running.

---

## Problems Faced & Solutions

### 1. Jenkins Permission Issues
**Problem:** Jenkins could not access project directories  
**Solution:** Moved workspace to `/home/jenkins` and fixed ownership & execute permissions.

---

### 2. Jenkins Unable to Run Shell Commands
**Problem:** Jenkins failed to create `@tmp` directories  
**Solution:** Ensured Jenkins had write permissions on workspace directories.

---

### 3. Docker Access Denied for Jenkins
**Problem:** Jenkins couldn’t access Docker daemon  
**Solution:** Added Jenkins user to Docker group.

---

### 4. Splunk Logs Not Appearing
**Problem:** Logs not visible in Splunk index  
**Solution:** Fixed HEC token configuration and removed SSL mismatch between client and Splunk.

---

### 5. Observability Stack Failing to Start
**Problem:** Health checks depended on Kong (application not yet running)  
**Solution:** Made platform health checks self-referential.

---

### 6. Platform Deploy Fails but Teardown Works
**Problem:** `docker compose down` worked but `up` failed  
**Solution:** Identified missing service dependencies and startup order issues.

---

### 7. Application Restart Was Slow
**Problem:** Containers were removed on teardown  
**Solution:** Replaced `docker compose down` with `docker compose stop`.

---

## Conclusion
This project simulates **real enterprise OPS workflows**, including:
- Service orchestration
- Observability-first design
- CI/CD automation
- Operational problem-solving

It closely mirrors the responsibilities of an **OPS / DevOps Engineer** in an enterprise Oracle-based environment, using open-source equivalents.

---

## Author
**Umair Faheem**  
DevOps / OPS Engineering Enthusiast
