var masterWordList=[
    ["Awkward","feeling","That ___ moment when you accept a compliment that wasn't meant for you"],
    ["Bagpipe","instrument","Wind instrument"],
    ["Banjo","instrument","String instrument"],
    ["Croquet","sport","Golf with hoops and mallet"],
    ["Dwarf","mythical creature","Middle earth-lings"],
    ["Kayak","thing ","a long narrow boat"],
    ["Fishhook","thing","used for fishing"],
    ["Gazebo","structure","a small roofed structure"],
    ["Hyphen","sign","used to join words"],
    ["Ivory","color","creamish color"],
    ["Jukebox","thing","thing related to music"],
    ["Yacht","thing","water RV"],
    ["hangman","game","suspend creature"],
    ["handkerchief","thing","Use this to cover your head"],
    ["Bookkeeper","occupation","number cruncher"],
    ["buffoonery","behavior","45th is a fine example"],
    ["microwave","it's science","Can you surf on it?"],
    ["nightclub","lifestyle","spot"],
    ["rickshaw","vehicle","baby taxi"],
    ["uptown","area","funk you up"],
    ["yippee","expression","when delighted"],
    ["zigzag","a line of course","full of twists and turns"],
    ["chrome","element","make them shiny"],
    ["Rhythm","pattern","having regular or irregular strong and week elements."],
    ["zucchini","food","Rhyms with sweeney"],
    ["inaccessible","not in any category","give up... It's not in your reach"],
    ["cycle","line of course","set repeated"]
];

var instr="<br><br>This is a basic game of Hangman.<br>";
    instr += "Guess the letters of the hidden word to solve the puzzle.<br>"
    instr += "Each word can take upto <u>13</u> wrong guesses.<br>"
    instr += "If you can't solve a word it will be presented to you again at a later stage.<br>"
    instr += "There are <u>"+masterWordList.length +"</u> wrods to solve!<br><br>"
    instr += "Good Luck !"
    directions.innerHTML=instr;
var game={
    displayWord:"",
    score:0,
    imgSource:"",
    currWordIndex:0,
    wordsSolved:0,
    totalWordCount: masterWordList.length,

    loadBody: function()
    {
        game.score=0;
        game.imgSource=1;
        hangimage.src="Hangman slides/"+game.imgSource+".jpg"
        document.getElementById("hangimage").style.opacity=1;
        game.currWordIndex=Math.floor(Math.random() * (masterWordList.length)) + 0  ;
        game.displayWord=masterWordList[game.currWordIndex][0].trim();
        document.getElementById("cate").innerHTML="Category: <br>"+masterWordList[game.currWordIndex][1];
        document.getElementById("hinttext").innerHTML=masterWordList[game.currWordIndex][2];
        document.getElementById("hinttext").hidden=true;
        document.getElementById("currentWord").innerHTML="";
        document.getElementById("solvedNumber").innerHTML="Words Solved: "+ game.wordsSolved;
        document.getElementById("directions").hidden=true;
        for(i=0;i<game.displayWord.length;i++)
        {
            document.getElementById("currentWord").innerHTML+="-";
        }
        for(var i=97; i<=122; i++)
        {
            var ele="alpha"+String.fromCharCode(i);
            document.getElementById(ele).disabled=false;
        }
    },

    showHint:function()
    {
        document.getElementById("hinttext").hidden=false;
        
    },

    press:function(event)
    {
        if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode>= 97 && event.keyCode<=122))
        {
            var alp="alpha"+String.fromCharCode(event.keyCode).toLowerCase();
            document.getElementById(alp).click();
        }
    },

     clicka:function(alpha,letter)
    {
        
        alpha.setAttribute("disabled", "disabled");
        game.displayWord=game.displayWord.toLowerCase();
    //    console.log(displayWord+ "-- clicka" + " letter="+letter);
        for(var x=0; x<game.displayWord.length; x++)
        {
            if(game.displayWord.substr(x,1)===letter)
            {
                var cw= document.getElementById("currentWord").innerHTML;
                cw = cw.substr(0, x) + letter.toUpperCase() + cw.substr(x+1 , cw.length);
                document.getElementById("currentWord").innerHTML=cw;
            }
        }

        if(game.displayWord.indexOf(letter)<0)
        {
            game.score += 1;
            if(game.score>=13)
            {game.endgame(0);}
            game.imgSource+=1;
            hangimage.src="Hangman slides/"+game.imgSource+".jpg"
        }
        if( document.getElementById("currentWord").innerHTML.indexOf("-")<0)
        { game.endgame(1)}

    },
     endgame:function(solved)
    {
        game.disableAlphas();
        if(solved)
        {
            game.wordsSolved=game.wordsSolved+1;
            console.log("game.wordsSolved="+ game.wordsSolved+"  game.totalWordCount="+ game.totalWordCount);
            masterWordList.splice(game.currWordIndex,1);
            hangimage.src="Hangman slides/ThatWasEasy.png";
            document.getElementById("solvedNumber").innerHTML="Words Solved: "+ game.wordsSolved;
            if( game.wordsSolved === game.totalWordCount)
            {
              game.solvedAll();
            }
       
        }
        else
        {
           hangimage.src="Hangman slides/14.png" ;
           document.getElementById("hangimage").style.opacity=0.5;
           document.getElementById("reset").focus();
        }
    },

    disableAlphas:function()
    {
        for(var i=97; i<=122; i++)
        {
            var ele="alpha"+String.fromCharCode(i);
            document.getElementById(ele).setAttribute("disabled", "disabled");
        }
    },

    solvedAll:function()
    {
        hangimage.src="Hangman slides/AllSolved.jpg" ;
        document.getElementById("reset").disabled=true; 
        document.getElementById("hint").hidden=true;
        document.getElementById("cate").innerHTML="No more words." 
        document.getElementById("currentWord").innerHTML ="   ";  
        document.getElementById("reset").hidden=true;
    },
   
}

document.onkeypress=game.press;

function instclick()
{
    
    var b=document.getElementById("directions").hidden
    if(b)
    {document.getElementById("directions").hidden=false;}
    else
    {document.getElementById("directions").hidden=true;}
}