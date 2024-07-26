# Blog API Project
Create a RESTful API for a simple blog application. 

## Overview
The API handles CRUD operations for posts, comments, and users, employing user authentication and authorization for secure accesss.

## Dependencies

- **express**: The Express.js framework for building web applications.

- **typeorm**: An ORM (Object-Relational Mapping) library for TypeScript.

## Prerequisites

1. Ensure that MySQL server is up and running.

2. Ensure that the latest version of NPM and Node.js is also installed.
    

## Installation and Setup

### 1. Clone repository

    `git clone https://github.com/Reggenius/blog_api.git`
    `cd blog_api`

### 2. Install Dependencies
    
    `npm install`

### 3. Configure Environment Variables:

Set the following variables in the terminal of your project (On Windows, replace "export" with "set"):

1. Database port

    `export blog_DBPort=myDBPort`

2. Database host
    
    `export blog_DBPort=myDBHost`

3. Database username

    `export blog_DBUsername=myDBUsername`

4. Database password
    
    `export blog_DBPassword=myDBPassword`

5. Database name

    `export blog_DBName=myDBName`

5. JWT key

    `export jwtPrivateKey=myPrivateKey`

## 3. Start the Application:

    `npm run serve`
