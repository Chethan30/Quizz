document.addEventListener('DOMContentLoaded',() => {
	const timeleftdisplay = document.querySelector('#timer')
	/* const startbtn = document.querySelector('#startbutton') */
	let timeleft=3600-1
	var a;
	
	function countdown(){
		setInterval(function(){
			if(timeleft <= 0 ) {
				clearInterval(timeleft = 0)
		    }
		    function fmtMSS(s){return(s-(s%=60))/60+(9<s?' mins  ':' mins : 0')+s}
            a= fmtMSS(timeleft)
		    timeleftdisplay.innerHTML = a + ' secs'
		    timeleft-=1
	     },1000);
		 const xhr = new XMLHttpRequest();
		xhr.open('GET', '/takequiz', true);
		xhr.onload = function () {
			console.log(xhr.responseText+"response text");
			arr = JSON.parse(xhr.responseText);
			makeQuestion();
		}
		xhr.send();
	
	 
	}
	// functions displayInstructions(){

	// }
	// function fetchQuestions(){
	// 	console.log("JERE")
	// 	const xhr = new XMLHttpRequest();
	// 	xhr.open('GET', '/takequiz', true);
	// 	xhr.onload = function () {
	// 		console.log(xhr.responseText+"response text");
	// 		arr = JSON.parse(xhr.responseText);
	// 		makeQuestion();
	// 	}
	// 	xhr.send();
	
	// }
window.onload = countdown;
    /* startbtn.addEventListener('click', countdown) */ //in case timer starting needs to be controlled 
})

var a = "submit"
var btnch = -1
var choice = ""
var item = ""
function makeQuestion(){     
	document.getElementById("question").innerHTML=arr[i].Question;
	document.getElementById("question_kan").innerHTML=arr[i + 1].Question;
	document.getElementById("0").innerHTML="1. "+arr[i].Option1+"/"+arr[i + 1].Option1;
	document.getElementById("1").innerHTML="2. "+arr[i].Option2+"/"+arr[i + 1].Option2;
	document.getElementById("2").innerHTML="3. "+arr[i].Option3+"/"+arr[i + 1].Option3;
	document.getElementById("3").innerHTML="4. "+arr[i].Option4+"/"+arr[i + 1].Option4;
	correctans=arr[i].Answer;
	i += 2;
}

function functionA(btn){

	if(btn==0){
		choice = document.getElementById("0").innerHTML;
		// document.getElementById("0").value = choice;
		// console.log(choice);
	}
	if(btn==1){
		choice = document.getElementById("1").innerHTML;
	}
	if(btn==2){
		choice = document.getElementById("2").innerHTML;
	}
	if(btn==3){
		choice = document.getElementById("3").innerHTML;
	}
	btnch = btn;
	
}

function myFunction(){

	if(btnch>-1){
		document.getElementById("test").innerHTML = choice;
		// console.log(document.getElementById("item").value);
	}
	else{
		document.getElementById("test").innerHTML = a;
	}
	
}
