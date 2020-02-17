const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");

const writeFileAsync = util.promisify(fs.writeFile);

async function profileGenerator(){
    try{
    const response = await inquirer([
        {
            type:"input",
            message:"What is your GitHub username?",
            name:"username"
        },
        {
            type:"input",
            message:"What color do you want your profile to be?",
            name:"background"
        }
])

    const username = response.username;
    const color = response.background;

    

    }
    catch (err) {
        return console.log(err);
      }
}