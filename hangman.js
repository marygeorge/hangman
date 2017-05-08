var masterWordList=[
    ["Awkward",	"Feeling",	"That ___ moment when you accept a compliment that wasn't meant for you."],
    ["Bagpipes", "Instrument", "Scotland, Kilts"],
    ["Croquet",	"Sport","Golf with hoops and mallet"],
    ["Banjo","Instrument","String instrument"],
    ["Dwarves",	"mythical creature","Middle earth-lings"],
    ["Kayak","thing","A long narrow boat"],
    ["Fishhook","thing","used for fishing"],
    ["Gazebo",	"structure",	"a small roofed structure"],
    ["Hyphen",	"sign",	"Used to join words"],
    ["Ivory",	"color",	"creamish color"],
    ["Jukebox",	"thing",	"related to music"],
    ["Yacht",	"thing",	"Water RV"]

];
var displayWord="";
var score;
var imgSource;


function loadBody()
{
    score=0;
    imgSource=1;
    hangimage.src="Hangman slides/"+imgSource+".jpg"
    var ranNum=Math.floor(Math.random() * (masterWordList.length)) + 0  ;
    displayWord=masterWordList[ranNum][0];
    document.getElementById("cate").innerHTML="Category: <br>"+masterWordList[ranNum][1];
    document.getElementById("hinttext").innerHTML=masterWordList[ranNum][2];
    document.getElementById("hinttext").hidden=true;
    document.getElementById("currentWord").innerHTML="";
    for(i=0;i<displayWord.length;i++)
    {
        document.getElementById("currentWord").innerHTML+="-";
     }
    for(var i=97; i<=122; i++)
    {
        var ele="alpha"+String.fromCharCode(i);
        document.getElementById(ele).disabled=false;
    }
}

function showHint()
{
    document.getElementById("hinttext").hidden=false;
    
}

document.onkeypress=press;

function press(event)
{
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode>= 97 && event.keyCode<=122))
    {
        var alp="alpha"+String.fromCharCode(event.keyCode).toLowerCase();
         document.getElementById(alp).click();
    }
}


function clicka(alpha,letter)
{
    alpha.setAttribute("disabled", "disabled");
    displayWord=displayWord.toLowerCase();
//    console.log(displayWord+ "-- clicka" + " letter="+letter);
    for(var x=0; x<displayWord.length; x++)
    {
        if(displayWord.substr(x,1)===letter)
        {
            var cw= document.getElementById("currentWord").innerHTML;
            cw = cw.substr(0, x) + letter.toUpperCase() + cw.substr(x+1 , cw.length);
             document.getElementById("currentWord").innerHTML=cw;
        }
    }

    if(displayWord.indexOf(letter)<0)
    {
        score += 1;
        if(score>=13)
        {endgame(0);}
        imgSource+=1;
        hangimage.src="Hangman slides/"+imgSource+".jpg"
    }
    if( document.getElementById("currentWord").innerHTML.indexOf("-")<0)
    { endgame(1)}

}

function endgame(solved)
{
    for(var i=97; i<=122; i++)
    {
        var ele="alpha"+String.fromCharCode(i);
        document.getElementById(ele).setAttribute("disabled", "disabled");
    }
    if(solved)
    {
        hangimage.src="Hangman slides/ThatWasEasy.png";
    }
    else
    {
    hangimage.src="Hangman slides/14.png" ;
    }
}