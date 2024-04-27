# Skedule (Calendar-app)
![Alt text](images/skedule2.jpg)  

Skedule is a powerful calendar app built with React and Laravel.  Manage your time effectively by creating and organizing events across multiple calendars.

![GitHub repo size](https://img.shields.io/github/repo-size/molnarlevi19/calendar-app-php)
![GitHub language count](https://img.shields.io/github/languages/count/molnarlevi19/calendar-app-php)
![GitHub contributors](https://img.shields.io/github/contributors/molnarlevi19/calendar-app-php)
![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/molnarlevi19/calendar-app-php)
![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/m/molnarlevi19/calendar-app-php)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/molnarlevi19/calendar-app-php)
![GitHub pull requests](https://img.shields.io/github/issues-pr/molnarlevi19/calendar-app-php)


# Technologies
**A full stack CRUD web application with the following technologies:**
- <img src="https://raw.githubusercontent.com/yurijserrano/Github-Profile-Readme-Logos/042e36c55d4d757621dedc4f03108213fbb57ec4/frameworks/react.svg" alt="drawing" width="30" align="center"/> *React* 
- <img src="https://raw.githubusercontent.com/yurijserrano/Github-Profile-Readme-Logos/042e36c55d4d757621dedc4f03108213fbb57ec4/programming%20languages/javascript.svg" alt="drawing" width="30" align="center"/> *JavaScript*
- <img src="https://raw.githubusercontent.com/yurijserrano/Github-Profile-Readme-Logos/042e36c55d4d757621dedc4f03108213fbb57ec4/frameworks/laravel.svg" alt="drawing" width="30" align="center"/> *Laravel*
- <img src="https://raw.githubusercontent.com/yurijserrano/Github-Profile-Readme-Logos/042e36c55d4d757621dedc4f03108213fbb57ec4/programming languages/php.png" alt="drawing" width="30" align="center"/> *PHP* 
- <img src="https://raw.githubusercontent.com/yurijserrano/Github-Profile-Readme-Logos/042e36c55d4d757621dedc4f03108213fbb57ec4/databases/mysql.svg" alt="drawing" width="30" align="center"/> *MySQL*


# Background
- *Register themselves securely*
- *Add any number of calendar to their profile*
- *Create events in specific calendars*


# Prerequisites
- <img src="https://raw.githubusercontent.com/yurijserrano/Github-Profile-Readme-Logos/042e36c55d4d757621dedc4f03108213fbb57ec4/frameworks/laravel.svg" alt="drawing" width="30" align="center"/> *Laravel 10.10*
- <img src="https://raw.githubusercontent.com/yurijserrano/Github-Profile-Readme-Logos/042e36c55d4d757621dedc4f03108213fbb57ec4/programming languages/php.png" alt="drawing" width="30" align="center"/> *PHP 8.1*
- <img src="https://raw.githubusercontent.com/yurijserrano/Github-Profile-Readme-Logos/042e36c55d4d757621dedc4f03108213fbb57ec4/others/npm.svg" alt="drawing" width="30" align="center"/> *NPM 8.19.2*
- <img src="https://raw.githubusercontent.com/yurijserrano/Github-Profile-Readme-Logos/042e36c55d4d757621dedc4f03108213fbb57ec4/databases/mysql.svg" alt="drawing" width="30" align="center"/> *MySQL 8.1.0*
- <img src="https://raw.githubusercontent.com/yurijserrano/Github-Profile-Readme-Logos/042e36c55d4d757621dedc4f03108213fbb57ec4/others/git.svg" alt="drawing" width="30" align="center"/> *Git 2.38.1*

# Usage
**Clone with the following command line:**

```bash
# Clone this repository
git clone git@github.com:molnarlevi19/calendar-app-php.git

```

## Frontend

```bash
# Go to your local folder
cd {local_folder_of_cloned_project/frontend}

# Install dependencies
npm i

# Run application
npm run dev

# Visit localhost:5173

```

## Backend

```bash
# Go to your local folder
cd {local_folder_of_cloned_project/backend}

# Install dependencies
composer install

#Create a '.env' file in the root directory of the project and set your mysql environment variables based on '.env.example':
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306  # Replace with your MySQL port number
DB_DATABASE=your_database_name  # Replace with your MySQL database name
DB_USERNAME=your_username  # Replace with your MySQL username
DB_PASSWORD=your_password  # Replace with your MySQL password

# migrate the database
php artisan migrate

#run application
php artisan serve
```

## Project Roadmap

The project roadmap is managed using Trello. [here](https://trello.com/invite/b/ObH0vUEb/ATTIfb670166c8aef3e43103a3d9890fc60b703FE816/calendar-app).

## Author:

* Molnár Levente (molnarlevi19@gmail.com)

## License:

* MIT License (See LICENSE file)