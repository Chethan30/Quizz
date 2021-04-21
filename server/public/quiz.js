var timer = 3220;
document.addEventListener('DOMContentLoaded',() => {
	const timeleftdisplay = document.querySelector('#timer')
	/* const startbtn = document.querySelector('#startbutton') */
	
	function countdown(){
		makeQuestion();
		setInterval(function(){
			console.log(timer);
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);
	
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
			timeleftdisplay.innerHTML=minutes+":"+seconds;
			//display.textContent = minutes + ":" + seconds;
			timer=timer-1;
			// if (--timer < 0) {
			// 	timer = duration;
			// }
		}, 1000);
	 
	}
	function fetchQuestions(){

		const xhr = new XMLHttpRequest();
		xhr.open('GET', '/takequiz', true);
		xhr.onload = function () {
			console.log(xhr.responseText+"response text");
			arr = JSON.parse(xhr.responseText);
			countdown();
		}
		xhr.send();
	
	}
window.onload = fetchQuestions;

    /* startbtn.addEventListener('click', countdown) */ //in case timer starting needs to be controlled 
})

var ans = "";
var response={};
var score=0;
var choice = ""
var item = ""
var i=0;
function makeQuestion(){   
	if(i>=2){
		response["round1score"]=score;
		
		 fetch('/round1', {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(response)
		  });
		  	
	window.location="torf_quiz.html";
	}  
	console.log(i)
	console.log(arr.length)
	console.log(arr[i].Question)
	document.getElementById("question").innerHTML=arr[i].Question;
	document.getElementById("question_kan").innerHTML=arr[i + 1].Question;
	document.getElementById("0").innerHTML="1. "+arr[i].Option1+"/"+arr[i + 1].Option1;
	document.getElementById("1").innerHTML="2. "+arr[i].Option2+"/"+arr[i + 1].Option2;
	document.getElementById("2").innerHTML="3. "+arr[i].Option3+"/"+arr[i + 1].Option3;
	document.getElementById("3").innerHTML="4. "+arr[i].Option4+"/"+arr[i + 1].Option4;
	correctans=arr[i].Answer+"/"+arr[i+1].Answer;
	i += 2;
}
function displayRightAns(){
	document.getElementById("nextbutton").disabled=true;
	document.getElementById("test").innerHTML = correctans;
	if(correctans==ans.slice(3)){
		score++;
	}
	response["choice"+i]=ans;
	ans="";
	console.log(response);
	console.log("SCORE",score);
	setTimeout(()=>{
		document.getElementById("nextbutton").disabled=false;
		document.getElementById("test").innerHTML = "";
		makeQuestion();
	},5000);
	
}

function functionA(btn){


	if(btn==0){
		ans = document.getElementById("0").innerHTML;
		
	}
	if(btn==1){
		ans = document.getElementById("1").innerHTML;
	}
	if(btn==2){
		ans = document.getElementById("2").innerHTML;
	}
	if(btn==3){
		ans = document.getElementById("3").innerHTML;
	}
	
}

window.onunload = function(){
    
	window.localStorage.setItem("timer",timer);
}
// function preventBack() { window.history.forward(); }  
// setTimeout("preventBack()", 0);  
// window.onunload = function () { null };  
