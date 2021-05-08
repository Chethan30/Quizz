document.addEventListener('DOMContentLoaded',() => {
	const timeleftdisplay = document.querySelector('#timer')
	timer = window.localStorage.getItem("timer");
	
	function countdown(){
		makeQuestion();
		setInterval(function(){
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);	
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
			timeleftdisplay.innerHTML=minutes+":"+seconds;
			timer=timer-1;
			window.localStorage.setItem("timer",timer);
		}, 1000);
	 
	}
	function fetchQuestions(){		
		const xhr = new XMLHttpRequest();
		xhr.open('GET', '/takequiz', true);
		xhr.onload = function () {
			arr = JSON.parse(xhr.responseText);
			arr.sort((a,b)=>{
				if(a.QNO<b.QNO){
					return -1;
				}
				else{
					return 1;
				}
			})
			countdown();
		}
		xhr.send();
		
	}

	
	
window.onload = fetchQuestions;

})


var ans = "";
var choice = ""
var item = ""
var response=JSON.parse(window.localStorage.getItem("response"));
var score=parseInt(window.localStorage.getItem("score"));
var i=parseInt(window.localStorage.getItem("i"));
function makeQuestion(){ 

	if(i>=arr.length){		
	window.location="torf_quiz.html";
	}  

	document.getElementById("question").innerHTML=arr[i].Question;
	document.getElementById("question_kan").innerHTML=arr[i + 1].Question;
	document.getElementById("0").innerHTML="1. "+arr[i].Option1+"/"+arr[i + 1].Option1;
	document.getElementById("1").innerHTML="2. "+arr[i].Option2+"/"+arr[i + 1].Option2;
	document.getElementById("2").innerHTML="3. "+arr[i].Option3+"/"+arr[i + 1].Option3;
	document.getElementById("3").innerHTML="4. "+arr[i].Option4+"/"+arr[i + 1].Option4;
	correctans=arr[i].Answer+"/"+arr[i+1].Answer;
	
	
}
function displayRightAns(){
	if(flag>=0){
		document.getElementById("nextbutton").disabled=true;
		document.getElementById("test").innerHTML ="CORRECT ANSWER: " +correctans;
		if(correctans==ans.slice(3)){
			score++;
		}
		response["round1choice"+(i/2)]=ans;
		
		ans="";
		i += 2;
		window.localStorage.setItem("i",i);
		window.localStorage.setItem("response",JSON.stringify(response));
		window.localStorage.setItem("score",score);
		setTimeout(()=>{
			document.getElementById("nextbutton").disabled=false;
			document.getElementById("test").innerHTML = " ";
			makeQuestion();
			location.reload();
		},2000);
	}
	else{
		document.getElementById("test").innerHTML ="Choose an option";
	}
}

var flag= -1
function functionA(btn){
	if(btn==0){
		flag = 0 	
	}
	if(btn==1){
		flag = 1
	}
	if(btn==2){
		flag = 2
	}
	if(btn==3){
		flag = 3
	}
}

function preventBack() { window.history.forward(); }  
setTimeout("preventBack()", 0);  
window.onunload = function () { null };  

