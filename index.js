const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

profileGenerator();

async function profileGenerator(){
    try{
    const response = await inquirer.prompt([
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

    gitResult(username);

    }
    catch (err) {
        return console.log(err);
      }
}

function gitResult(name){
    const queryUrl = `https://api.github.com/users/${name}`; 
    axios.get(queryUrl).then(function(result){
        const info = result.data;
        const userBio = info.bio;
        const followers = info.followers;
        const repos = info.public_repos;
        const location = info.location;
        const blog = info.blog;
        const following = info.following;
        const profPic = info.avatar_url;

const html = 
        `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <title>Document</title>
</head>
<body>
    <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4"></h1>
          <p class="lead"></p>
          <h2>${name}</h2>
          <a></a>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Public Repositories</h5>
          <p class="card-text">${repos}</p>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Followers</h5>
          <p class="card-text">${followers}</p>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">GitHub Stars</h5>
          <p class="card-text">${following}</p>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Following</h5>
          <p class="card-text"></p>
        </div>
      </div>
</body>
</html>
`;

        writeFileAsync("index.html", html);
    })

}
