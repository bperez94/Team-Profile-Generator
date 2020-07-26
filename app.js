const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// array to hold employee answers
const employeeArray = [];

// function to controll question flow
function employeeType() {
    inquirer.prompt ([
        {
            type:"checkbox",
            name:"name",
            message:"What is your position?",
            choices:[
                "manager","engineer","intern",
            ]
        } 

    ])
    .then((employType) => {
       // console.log("\n\nmanger-"+ employType.name+"-" +"eval "+(employType.name == "manager"));
           if (employType.name == "manager") {
          managerInfo()
          .then((employ) => {
            console.log("sucess");
          }).catch((err) => {
              console.log(err.message);
          });

    }
    else if (employType.name == "intern") {
       internInfo();
    }

    else {
        engineerInfo();
    }

    }).catch((err) => {
        console.log(err.message)
    });
   // console.log(employeeType);
  

}


function managerInfo() {
    return inquirer.prompt ([
        {
            type:"input",
            name:"name",
            message:"What is your name?"

        },
        {
            type:"input",
            name:"id",
            message:"what is your id number?",
        },
        {
            type:"input",
            name:"email",
            message:"What is your email?",
        },
        {
            type:"input",
            name:"role",
            message:"what is your role?",
        },
        {
            type:"input",
            name:"officeNum",
            message:"What is your office number?"

        },
     ])
     // logs answers
     .then((employType) => {
         console.log(employType);
         const managerAnswer = new Manager(
             employType.name,
             employType.id,
             employType.email,
             employType.role,
             employType.officeNumer
         );// sends logged answers to an array
         employeeArray.push(managerAnswer);
     }).catch((err) => {
         console.log(err.message);
     });
}


function engineerInfo() {
    return inquirer.prompt ([
        {
            type:"input",
            name:"name",
            message:"What is your name?"

        },
        {
            type:"input",
            name:"id",
            message:"what is your id number?",
        },
        {
            type:"input",
            name:"email",
            message:"What is your email?",
        },
        {
            type:"input",
            name:"role",
            message:"what is your role?",
        },
        {
            type:"input",
            name:"github",
            message:"What is your github link",
        },

    ])
    .then((employType) => {
        console.log(employType);
        const engineerAnswers = new Engineer(
            employType.name,
            employType.id,
            employType.email,
            employType.role,
            employType.officeNumer
        );// sends logged answers to an array
        employeeArray.push(engineerAnswers);
    }).catch((err) => {
        console.log(err.message);
    });
}


function internInfo() {
    return inquirer.prompt ([
        {
            type:"input",
            name:"name",
            message:"What is your name?"

        },
        {
            type:"input",
            name:"id",
            message:"what is your id number?",
        },
        {
            type:"input",
            name:"email",
            message:"What is your email?",
        },
        {
            type:"input",
            name:"role",
            message:"what is your role?",
        },
        {
            type:"input",
            name:"school",
            message:"What school do you go to?",
        },
        
    ])
    .then((employType) => {
        console.log(employType);
        const internAnswers = new Intern(
            employType.name,
            employType.id,
            employType.email,
            employType.role,
            employType.officeNumer
        );// sends logged answers to an array
        employeeArray.push(internAnswers);
    }).catch((err) => {
        console.log(err.message);
    });
    
}
employeeType()

function sendInfo() {
    console.log("information saved");
    fs.writeFileSync(outputPath,render(employeeArray),"utf-8");
}
function init() {
    sendInfo()
}
console.log(sendInfo);
init();


// After the user has input all employees desired, call the `render` function (requiredn
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
