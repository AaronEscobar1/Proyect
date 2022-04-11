# NominaApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.4. The application will show **best practices** in terms of: folder structure, use of modules, testing, communication with a REST back-end, navigation organization, handling security issues (authentication/authorization).

## Installation

### Platform & tools

#### Node & npm

You need to install Node.js and then the development tools. Node.js comes with a package manager called [npm](http://npmjs.org) for installing NodeJS applications and libraries.

* [Install node](https://nodejs.org/es/ "Install node")

#### Angular CLI

You also need to install a fundamental tool called **"Angular CLI"** (Command Line Interface), the Angular CLI is a command-line interface tool that you use to initialize, develop, scaffold, and maintain Angular applications directly from a command shell.

* [Install Angular CLI](https://angular.io/cli "Install Angular CLI")

Comand for install the Angular Cli globally:
```
npm install -g @angular/cli
```
___ 

## Get started

### Clone the repository

Either clone this repository or fork it on GitHub and clone your fork:

```
git clone git@bitbucket.org:desarrollo08/nomina-v11-frontend.git
```

### Install node packages 

Install node_modules packages needed to run the application correctly
```
cd NominaApp
npm install
```

### Running NominaApp

* Run the server

```
ng serve
```

If you want to run your application on a specific port, execute:
```
ng serve --port [port]

For example: ng serve --port 4300
```

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

___

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build --prod` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Get statistics (coverage) of unit tests

Run `npm run test` to view unit test statistics [Html Coverage](http://127.0.0.1:5500/coverage/NominaApp/index.html).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.