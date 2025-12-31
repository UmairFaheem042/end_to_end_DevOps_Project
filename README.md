# CashFlow – End-to-End DevOps / OPS Engineering Project

https://github.com/user-attachments/assets/42d3c37c-d3be-433c-8770-45e49c7b8fd3



## Overview

CashFlow is a **hands-on DevOps / OPS engineering project** focused on applying real-world operational practices to an existing application using open-source tools.

I build this project to practice enterprise-style OPS and DevOps workflows by treating an application as a running business service and evolving it operationally. The emphasis is not on building new features, but on **how an existing service is deployed, automated, observed, and managed throughout its lifecycle**.

This project demonstrates:

- End-to-end service deployment
- Observability-first architecture
- CI/CD automation
- Service lifecycle management
- Practical operational problem-solving

> **Project Context:**  
> CashFlow starts as a standalone MERN application developed by me earlier.
>
> In this project, I reuse that application and focus on **layering enterprise-style OPS / DevOps capabilities on top of it**, including CI/CD pipelines, API gateway integration, centralized logging, monitoring, and controlled service lifecycles.
>
> This mirrors real-world environments where DevOps engineers typically inherit existing services and evolve them operationally rather than building systems from scratch.

> **Enterprise Exposure Context:**  
> While working alongside an Oracle OPS team as an intern, I observe real enterprise operational workflows but have limited hands-on access to production systems and licensed tools.  
> To bridge this gap, I recreate similar workflows using open-source alternatives, allowing me to practice deployment, observability, automation, and service operations in a realistic environment.

---

## Enterprise Context & Technology Mapping

This table shows how common enterprise tools map to the alternatives used in this project.

| Enterprise Stack (Company)      | Alternative Used (This Project)  |
| ------------------------------- | -------------------------------- |
| Oracle MyST (DevOps Platform)   | Jenkins + Ansible                |
| Oracle OSB / SOA Suite          | Node.js + Express (Backend APIs) |
| Axway API Gateway               | Kong API Gateway                 |
| Red Hat Enterprise Linux (RHEL) | Ubuntu Linux VM (WSL)            |
| Jenkins (Enterprise)            | Jenkins (Local)                  |
| Ansible AWX                     | Ansible CLI (via Jenkins)        |
| Splunk Enterprise               | Splunk (Dockerized)              |
| Dynatrace                       | Prometheus + Grafana             |
| Oracle Database                 | MongoDB                          |
| Container Platform              | Docker                           |

---

## Application Stack

- **Frontend**: React (Dockerized, served via NGINX)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **API Gateway**: Kong
- **Monitoring**: Prometheus, Grafana
- **Logging**: Splunk
- **CI/CD**: Jenkins
- **Automation**: Ansible (triggered by Jenkins)
- **Operating System**: Ubuntu Linux VM (WSL)

---

## Folder Structure

```text
    CashFlow/
    │
    ├── app/                         # Application source code
    │   ├── server/                  # Backend service (Node.js + Express)
    │   │   ├── Dockerfile           # Backend Docker image
    │   │   ├── logger/              # Centralized logging
    │   │       └── splunkLogger.js  # Winston → Splunk HEC integration
    │   │
    │   └── client/                  # Frontend application (React)
    │       └── Dockerfile           # Multi-stage build (React + NGINX)
    │
    ├── docker/                      # Core application compose stack
    │   └── docker-compose.yml       # Frontend + Backend + MongoDB
    │
    ├── gateway/                     # API Gateway configuration
    │   └── kong/
    │       ├── docker-compose.yml   # Kong runtime
    │       └── kong.yml             # Declarative routing config
    │
    ├── monitoring/                  # Monitoring stack
    │   ├── docker-compose.yml       # Prometheus + Grafana
    │   └── prometheus.yml           # Metrics scrape config
    │
    ├── logging/                     # Centralized logging
    │   └── splunk/
    │       └── docker-compose.yml   # Splunk Enterprise (HEC enabled)
    │
    ├── ci/                          # CI/CD & automation
    │   ├── Jenkinsfile              # Jenkins pipeline
    │   └── ansible/                 # Ansible playbooks
    │       ├── inventory
    │       ├── deploy-app.yml
    │       ├── deploy-platform.yml
    │       ├── teardown-app.yml
    │       └── teardown-platform.yml
    │
    └── README.md                    # Project documentation
```

---

## Step-by-Step Implementation

### STEP 1: MongoDB Setup

- Run MongoDB as a Docker container.
- Configure Docker volumes for data persistence.

---

### STEP 2: Backend Health Checks

- Add `/api/health` endpoint to the backend.
- Use this endpoint for Jenkins validation and gateway checks.

---

### STEP 3: Structured Logging (OPS-level)

- Implement `morgan` for HTTP request logging.
- Use `winston` for structured JSON logs.
- Forward logs to **Splunk HEC** for centralized visibility.

---

### STEP 4: Metrics for Monitoring

- Expose `/api/metrics` using `prom-client`.
- Allow **Prometheus** to scrape application metrics.

---

### STEP 5: Dockerize Backend

- Create an optimized Dockerfile.
- Use environment-based configuration.

---

### STEP 6: Backend + Mongo Compose Stack

- Combine backend and MongoDB into a single Docker Compose stack.
- Use internal Docker networking for service communication.

---

### STEP 7: Dockerize Frontend

- Build the React application using a multi-stage Docker build.
- Serve the production build using **NGINX**.

---

### STEP 8: Full Application Stack

- Combine frontend, backend, and database into one compose stack.
- Route all frontend traffic exclusively through the API gateway.

---

### STEP 9: API Gateway Integration

- Add **Kong** as the API Gateway.
- Route external traffic through port `8000`.
- Keep backend port `3000` internal and unexposed.

---

### STEP 10: Centralized Monitoring

- Configure **Prometheus** to scrape backend metrics.
- Visualize system health using **Grafana** dashboards.
- Design health checks to be self-contained, avoiding cross-service dependencies.

---

### STEP 11: Centralized Logging

- Integrate backend logs with Splunk using HTTP Event Collector.
- Index structured logs with meaningful sourcetypes.
- Run the observability stack independently from the application lifecycle.

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

## Conclusion

This project represents my **hands-on learning journey into enterprise OPS and DevOps engineering**. It focuses on how systems are deployed, observed, automated, and operated in real environments.

The workflows closely resemble the responsibilities of an **OPS / DevOps Engineer** in an enterprise ecosystem using open-source tools.

---
