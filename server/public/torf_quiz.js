var timer;
document.addEventListener('DOMContentLoaded',() => {
	const timeleftdisplay = document.querySelector('#timer')
	timer=parseInt(window.localStorage.getItem("timer"));
	function countdown(){
		makeQuestion();
		setInterval(function(){
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);
	
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
			timeleftdisplay.innerHTML=minutes+":"+seconds;
			console.log(timer)
			timer=timer-1;
		}, 1000);
	 
	 
	}
	
	function fetchQuestions(){
		const xhr = new XMLHttpRequest();
		xhr.open('GET', '/takeround2', true);
		xhr.onload = function () {
			console.log(xhr.responseText+"response text");
			arr = JSON.parse(xhr.responseText);
			countdown();
		}
		xhr.send();
	}
	window.onload = fetchQuestions;
	})


	var i=0;
	var ans="";
	var correctans="";
	var comments="";
	var response={};
	var score = 0;
	function makeQuestion(){   
		if(i>=2){
			response["round2score"]=score;
			
			 fetch('/round2', {
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(response)
			  });
				  
		window.location="image_quiz.html";
		}  
		console.log(i)
		console.log(arr.length)
		console.log(arr[i].Question)
		document.getElementById("question").innerHTML=arr[i].Question;
		document.getElementById("question_kan").innerHTML=arr[i + 1].Question;
		cans=arr[i].TrueorFalse+"";
		correctans=arr[i].TrueorFalse+"/"+arr[i+1].TrueorFalse;
		comments=arr[i].Comments+"/"+arr[i+1].Comments;
		i += 2;
	}

	function displayRightAns(){
		document.getElementById("nextbutton").disabled=true;
		document.getElementById("answer").innerHTML = correctans;
		document.getElementById("comments").innerHTML = comments;
		console.log(cans)
		console.log(ans)
		if(cans==ans){
			score++;
		}
		response["choice"+i]=ans;
		ans="";
		console.log(response);
		console.log("SCORE",score);
		setTimeout(()=>{
			document.getElementById("nextbutton").disabled=false;
			makeQuestion();
		},3000);
	}

	function recordAns(option){
		if(option==0){
			ans="true";
		}
		if(option==1){
			ans="false";
		}
	}

	window.onunload = function(){
    
		window.localStorage.setItem("timer",timer);
	}