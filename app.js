const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const { statement } = require("@babel/template");

function start(){
inquirer
  .prompt([
    {
      name: "role",
      type: "list",
      message: "What type of employee would you like to add?",
      choices: ["Manager", "Engineer", "Intern"],
    },
    { name: "name", type: "input", message: "What is their name?" },
    { name: "id", type: "input", message: "What is their ID number?" },
    { name: "email", type: "input", message: "What is their email address?" },
  ])
  .then(function (output) {
    switch(output.role){
      case("Engineer"):
      inquirer
        .prompt([
          {
          name: "github",
          type: "input",
          message: "What is their GitHub username?",
        },
        {
          name:"repeat",
          type:"confirm",
          message:"Do you want to add another employee?"
      }
      ])
        .then(function (output2) {
          var submission = new Engineer(output.name, output.id, output.email, output2.github);
          employees.push(submission);
        });
      break;
      case("Manager"):
      inquirer
      .prompt([
        {
        name: "officeNumber",
        type: "input",
        message: "What is their office number?",
      },
      {
        name:"repeat",
        type:"confirm",
        message:"Do you want to add another employee?"
    }
      
    ])
      .then(function (output2) {
        var submission = new Manager(output.name, output.id, output.email, output2.officeNumber);
        employees.push(submission);
      });
      break;
      case("Intern"):
      inquirer
      .prompt([
        {
        name: "school",
        type: "input",
        message: "What is the name of their school?",
      },
      {
        name:"repeat",
        type:"confirm",
        message:"Do you want to add another employee?"
    }
    
    ])



.then(function (output2) {
        var submission = new Intern(output.name, output.id, output.email, output2.getSchool);
        employees.push(submission);
      });
      break;
      default:
        break;
    }

})
}
  
function askAgain(){
  inquirer.prompt([
    {
      name:"repeat",
      type:"confirm",
      message:"Do you want to add another employee?"
  }
])
.then(function(output){
  if(output.repeat){
    start();
  }
  else{
    var data = render(employees)
    fs.writeFile("./index.html", data, "utf8", function(err){
      console.log(err)
    })
  }
})
}


start();
