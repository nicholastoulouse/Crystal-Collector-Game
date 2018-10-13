// generate a random number
// place in a div
// variables
$( document ).ready(function() {

    var wins = 0, losses = 0, score, err1, err2, fake1, fake2;
    var crystals; // stores all gem points and 2 duds toward magic number
    var random;

    $(".crystal").on("click", function(){

        $("h2").css('display', 'block');
        var dudOrNot = parseInt( $(this).attr('data-pnts') );
        
        if (dudOrNot !== 0) { // a real gem so calculate new score
            var minuend = $('#num').text(); // displayed magic number
            var subtrahend = $(this).attr('data-pnts'); //getter from gem clicked
            var difference = parseInt(minuend) - parseInt(subtrahend);

            $('#prev').text(minuend);
            $('#now').text(difference);
            $('#points').text(subtrahend);

            if (difference === 0){
                // won game
                wins += 1;
                $("footer > div").css('display', 'inline-block');
                $('#wins').text("Wins: " + wins);
                $('#losses').text("Lost: " + losses);
                initialize();
            } else if (difference > 0) {
                var subtrahend = $(this).attr('data-pnts'); //getter
                console.log(minuend, subtrahend, difference);
                $("#num").text(difference);
            } else {
                // game over
                var playAgain = confirm("Game over! Press OK to play again");
                losses += 1;
                $("footer > div").css('display', 'inline-block');
                $('#wins').text(wins);
                $('#losses').text(losses);
                if(playAgain) {
                    initialize();
                }
            }
        } else if (!fake1 && !err1 && fake2 != $(this).attr("id")) {
            fake1 = $(this).attr("id");
            console.log("fake1 ", fake1);
            err1 = true;
            alert("Careful! You chose a fake gemstone - if you click the fake again, you'll lose!");
        } else if (!fake2 && !err2 && fake1 != $(this).attr("id")) {
            fake2 = $(this).attr("id");
            console.log("fake1 ", fake1);
            err2 = true;
            alert("Careful! You chose a dud (fake gemstone) - if you click any 1 of 2 duds twice, you'll lose!");        
        } else { // second time clicking same dud, game over!
            losses += 1;
            $("h2").css('display', 'none');
            $("footer > div").css('display', 'inline-block');
            $('#wins').text("Wins: " + wins);
            $('#losses').text("Lost: " + losses);
            alert("Game Over! You clicked a dud again.")
            initialize();
        }
    });

    function initialize() {

        score = 0;
        err1 = false, err2 = false;
        fake1 = undefined, fake2 = undefined;
        crystals = [];
        random = undefined;
        var k;

        if (wins === 0 && losses === 0) {
            $("footer > div").css('display', 'none'); // hide scores on initialize
            $("h2").css('display', 'none');
        }
        //  magic number to be displayed is to be between 19 - 120 
        var randomNumber = (Math.floor(Math.random()*(120 - 19 + 1) + 19));
        console.log(randomNumber);
        $("#num").text(randomNumber);

        // every gem has a point score between 1 and 12, no duplicates
        for (var i = 0; crystals.length < 6; i++) {
            
            random = (Math.floor(Math.random() * 12) + 1);
            
            if (crystals.includes(random)) { // duplicate detected
                continue;
            } else { // original number
                crystals.push(random); 
            }
        }

        // Of 6 gems, designate 2 duds or fake gems that the user must remember not to click
        var dud1 = (Math.floor(Math.random()*crystals.length));
        console.log("dud1 ", dud1);
        crystals[dud1] = undefined;
        do { // keep getting a dud2 as long as it's the same index as dud1
            var dud2 = (Math.floor(Math.random()*crystals.length));
            console.log("dud2 ", dud2);
        } while (dud2 === dud1 && dud2 < (crystals.length - 1));
        console.log("dud2 ", dud2);
        crystals[dud2] = undefined;

        // // verify that one of the crystals points is an odd number OR set one
        // var isOneOddNum = crystals.reduce((acc, num) => { if (num != undefined) num % 2 === 1 }, false);
        // do {
        //     k = (Math.floor(Math.random()*crystals.length) + 1);
        // } while (!isOneOddNum && crystals[k] === undefined || k > crystals.length);
        
        // // try not to get any duplicate numbers for gems in array
        // crystals.indexOf(crystals[k] + 1) ? (crystals.indexOf(crystals[k] + 3) ? crystals[k] += 5 : crystals[k] += 3) : crystals[k] += 1;

        for (var j = 0; j < crystals.length; j++) {
            if (crystals[j]) {
                var crystalValue = "#c" + j;
                $(crystalValue).attr("data-pnts", crystals[j]);
            } else {
                $(crystalValue).attr("data-pnts", undefined);
            }
        }
        console.log(crystals);
    }
    initialize();
});
    // var crystal = $("<div>");
    // crystal.addClass("crystal");
    // crystal.attr({  add class function
        // "class": 'crysal'
    // });

    // $(".crystals").append(crystal);


// Psuedo code
    // 4 crystals and a random result
    
        // at least one odd nunber
        // no doubles
    // a new random number should generate a everytime player wins or lose
        // to those 4 crystals
    // when clicking one of the four crystals, should add the previous result
        // until it equals the random result
        // if it is greater than the random result, +1 loss counter
        // if it is equal, +1 to win counter


// for loop, compare target score to current score. if score is equal to it, you win, if it's over, you lose, if less than then keep the game going.
// if ts = cs -> win.

// The 3 group projects.
// KISS, you have 
// scroll and fonts
// https://bradbones.github.io/word_guess_game/index.html
// marktvbui
// target Score, win count lose count, your score, insructions, jumbotron
// RPG - role playing game
// You attack for 20 and someone, it's supposed to double your attack every time you win.
// look at the stats for each character, higher life points if they have higher attack values. each character has higher hitpoints but their attack hits are lower.

