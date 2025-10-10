# Docker Instructions for Nike Store

This document provides instructions on how to build and run the Nike Store application using Docker and Docker Compose.

## Prerequisites

- Docker Desktop installed and running on your local machine.
- A `.env` file in the root of the project containing the `DATABASE_URL`. You can use the `.env.example` file as a template.

## Building and Running with Docker Compose (Recommended for Local Development)

Using Docker Compose is the easiest way to get the application running locally.

1.  **Build and start the services:**
    Open a terminal in the project root and run:
    ```sh
    docker-compose up --build
    ```
    This command will:
    - Build the Docker image for the application based on the `Dockerfile`.
    - Start a container from that image.
    - Forward port 3000 from the container to your local machine.

2.  **Access the application:**
    Once the container is running, you can access the application in your browser at `http://localhost:3000`.

3.  **Stopping the application:**
    To stop the application, press `Ctrl + C` in the terminal. To remove the container, you can run:
    ```sh
    docker-compose down
    ```

## Building and Running with Docker Commands (Manual Steps)

You can also build and run the application using manual Docker commands.

1.  **Build the Docker image:**
    ```sh
    docker build -t nike-store .
    ```

2.  **Run the Docker container:**
    Make sure you have your `DATABASE_URL` ready.
    ```sh
    docker run -p 3000:3000 -e DATABASE_URL="your_postgresql_connection_string" nike-store
