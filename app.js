const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const outputPath = path.resolve(__dirname, "output", "team.html");

const render = require("./lib/htmlRenderer");

const roles = [];



function getManagerDetail() {
  inquirer.prompt([{
    message: "What is your name?:",
    name: "Name",
    type: "input"
  },
  {
    message: "What is your Id?:",
    name: "Id",
    type: "input"
  },
  {
    message: "What is your email id?:",
    name: "Email",
    type: "input"
  },
  {
    message: "What is your office number?:",
    name: "ContactNum",
    type: "input"
  }])
  .then(function(answer){
    const manager = new Manager(answer.Name, answer.Id, answer.Email, answer.ContactNum);
    roles.push(manager);
    readyToBuildTeam();
  })
}

function getEngineerDetail() {
    inquirer.prompt([{
      message: "What is your name?:",
      name: "Name",
      type: "input"
    },
    {
      message: "What is your Id?:",
      name: "Id",
      type: "input"
    },
    {
      message: "What is your email id?:",
      name: "Email",
      type: "input"
    },
    {
      message: "What is your github username?:",
      name: "Username",
      type: "input"
    }])
    .then(function(answer){
      const engineer = new Engineer(answer.Name, answer.Id, answer.Email, answer.Username);
      roles.push(engineer);
      readyToBuildTeam();
    })
  }


  function getInternDetail() {
    inquirer.prompt([{
      message: "What is your name?:",
      name: "Name",
      type: "input"
    },
    {
      message: "What is your Id?:",
      name: "Id",
      type: "input"
    },
    {
      message: "What is your email id?:",
      name: "Email",
      type: "input"
    },
    {
      message: "What is your school name?:",
      name: "School",
      type: "input"
    }])
    .then(function(answer){
      const intern = new Intern(answer.Name, answer.Id, answer.Email, answer.School);
      roles.push(intern);
      readyToBuildTeam();
    })
  }


  function getRole() {
    inquirer.prompt([{message: "What role do you want to add?:",
    name: "Role",
    type: "list",
    choices:["Manager", "Engineer", "Intern"]
    }])
    .then(function(answer){
     if(answer.Role == "Manager"){
        getManagerDetail();
     }
     else if(answer.Role == "Engineer"){
      getEngineerDetail();
     }
     else if(answer.Role == "Intern"){
        getInternDetail();
    }
    })
  }

  function readyToBuildTeam() {
    inquirer.prompt([{message: "Are you ready to build the team?:",
    name: "Build",
    type: "list",
    choices:["Yes", "No"]
    }])
    .then(function(answer){
     if(answer.Build == "Yes"){
        buildTeam();
     }
     else{
        getRole();
     }
    })
  }

  function buildTeam(){
      fs.writeFileSync(outputPath, render(roles), "UTF-8");
  }

  getRole();








