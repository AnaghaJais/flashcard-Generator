var ClozeCard = require("./clozeCard.js");
var inquirer = require("inquirer");
var Questions = require("./question.js");
var BasicCard = require("./basicCard.js");
var count = 0;
var i = 0;
var score = 0;
var array1 = [];
var array2 = [];


arrayBuild();

/******* function *******/
function arrayBuild() {
    for (var i = 0; i < Questions.length; i++) {
        if (Questions[i].type === "clozeCard") {

            var obje = {
                type: Questions[i].type,
                text: Questions[i].text,
                cloze: Questions[i].cloze
            };
            array1.push(obje);
        } else {
            var obje = {
                type: Questions[i].type,
                front: Questions[i].front,
                back: Questions[i].back
            };
            array2.push(obje);
        }
    }
}



cardChoose();

function cardChoose() {
    inquirer.prompt([{
        type: 'list',
        name: 'basicOrClozeDele',
        message: 'What kind of flashcard you want to play?',
        choices: [
            'Basic FlashCard',
            'Cloze-Deleted flashcards'
        ]
    }]).then(function(answers) {

        if (answers.basicOrClozeDele === 'Basic FlashCard') {
            console.log("let's start basic flashcard!");
            createBasicFlashCard();
        }
        if (answers.basicOrClozeDele === 'Cloze-Deleted flashcards') {
            console.log("let's start Cloze-Deleted flashcards!");
            createClozeFlashCard();

        }
    });

}


function createClozeFlashCard() {

    if (count < array1.length) {
        var card = new ClozeCard(array1[i].text, array1[i].cloze);
        var clozeQuestion = card.partial;

        inquirer.prompt([{
            name: "name",
            message: clozeQuestion
        }]).then(function(answers) {
            var word = titleCase(answers.name);

            if (word === card.cloze) {
                console.log("Correct Answer");
                score++;
            } else {
                console.log("Wrong!!" + card.fullText);
            }
            count++;
            i++;
            createClozeFlashCard();
        });

    } else {
        console.log("Game Over");
        console.log("Your Score is: " + score + "/" + array1.length);
        inquirer.prompt({
            name: "again",
            type: "confirm",
            message: "Would you like to play Again?"
        }).then(function(answer) {
            if (answer.again === true) {
                count = 0;
                i = 0;
                score = 0;
                cardChoose();
            } else {
                console.log("come back again");
            }

        });

    }
}


function createBasicFlashCard() {

    if (count < array2.length) {
        var card = new BasicCard(array2[i].front, array2[i].back);
        var basicQuestion = card.front;

        inquirer.prompt([{
            name: "name",
            message: basicQuestion
        }]).then(function(answers) {

            var word = titleCase(answers.name);
            
            if (word === card.back) {
                console.log("Correct Answer");
                score++;
            } else {
                console.log("Wrong!!" + card.back);
            }
            count++;
            i++;
            createBasicFlashCard();
        });

    } else {
        console.log("Game Over");
        console.log("Your Score is: " + score + "/" + array2.length);
        inquirer.prompt({
            name: "again",
            type: "confirm",
            message: "Would you like to play Again?"
        }).then(function(answer) {
            if (answer.again === true) {
                count = 0;
                i = 0;
                score = 0;
                cardChoose();
            } else {
                console.log("come back again");
            }

        });

    }
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}