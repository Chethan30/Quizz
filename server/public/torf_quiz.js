document.addEventListener('DOMContentLoaded',() => {
	const timeleftdisplay = document.querySelector('#timer')
	/* const startbtn = document.querySelector('#startbutton') */
	//var minutes= window.localStorage.getItem("minutes");
	//var seconds=window.localStorage.getItem("seconds");
	var timer=parseInt(window.localStorage.getItem("timer"));
	console.log(timer);
	//var timer = 3600 , minutes, seconds;	
	function countdown(){
		//makeQuestion();
		setInterval(function(){
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);
	
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
			timeleftdisplay.innerHTML=minutes+":"+seconds;
			//display.textContent = minutes + ":" + seconds;
	
			timer=timer-1;
		}, 1000);
	 
	 
	}
	
	// function fetchQuestions(){
	// 	const xhr = new XMLHttpRequest();
	// 	xhr.open('GET', '/takequiz', true);
	// 	xhr.onload = function () {
	// 		console.log(xhr.responseText+"response text");
	// 		arr = JSON.parse(xhr.responseText);
	// 		countdown();
	// 	}
	// 	xhr.send();
	window.onload = countdown;
	})


    /* startbtn.addEventListener('click', countdown) */ //in case timer starting needs to be controlled 
// })

// var a = "submit"
// var btnch = -1
// var choice = ""
// var item = ""
// var i=0;
// function makeQuestion(){   
// 	if(i>=arr.length){
// 		window.location="image_quiz.html";
// 	}  
// 	console.log(arr.length)
// 	console.log(i)
// 	document.getElementById("question").innerHTML=arr[i].Question;
// 	document.getElementById("question_kan").innerHTML=arr[i + 1].Question;
// 	document.getElementById("0").innerHTML="1. "+arr[i].Option1+"/"+arr[i + 1].Option1;
// 	document.getElementById("1").innerHTML="2. "+arr[i].Option2+"/"+arr[i + 1].Option2;
// 	correctans=arr[i].Answer;
// 	i += 2;
// }
// function displayRightAns(){
// 	document.getElementById("nextbutton").stye="none"
// 	document.getElementById("test").innerHTML = correctans;
// 	setTimeout(()=>{
// 		document.getElementById("test").innerHTML = "";
// 		makeQuestion();
// 	},5000);
	
// }

// function functionA(btn){


// 	if(btn==0){
// 		choice = document.getElementById("0").innerHTML;
// 		// document.getElementById("0").value = choice;
// 		// console.log(choice);
// 	}
// 	if(btn==1){
// 		choice = document.getElementById("1").innerHTML;
// 	}

	
// 	btnch = btn;
	
// }



// // document.getElementById("nextbutton").addEventListener('click',()=>{
// // 	console.log(correctans)
// // 	document.getElementById("test").innerHTML = correctans;
// // 	setTimeout(()=>{
// // 		makeQuestion();
// // 	},6000);
	
// // });


// function myFunction(){

// 	if(btnch>-1){
// 		document.getElementById("test").innerHTML = choice;
// 		// console.log(document.getElementById("item").value);
// 	}
// 	else{
// 		document.getElementById("test").innerHTML = a;
// 	}
	
// }
// window.onload=function(){
// 	console.log(window.localStorage.getItem("time"));
// }