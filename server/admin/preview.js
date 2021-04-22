
var i=0;

document.addEventListener('DOMContentLoaded',() => {
function fetchQuestions(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/takequiz', true);
    xhr.onload = function () {
        console.log(xhr.responseText+"response text");
          arr = JSON.parse(xhr.responseText);
		  makeQuestion();
    }
    xhr.send();
	
}
window.onload = fetchQuestions;
})

function makeQuestion(){   
	console.log("ENTERED MAKE QUESTIOn")
	console.log(i)
	//console.log(arr.length)
	//console.log(arr[i].Question)
	document.getElementById("question").innerHTML=arr[i].Question;
	document.getElementById("question_kan").innerHTML=arr[i + 1].Question;
	document.getElementById("0").innerHTML="1. "+arr[i].Option1+"/"+arr[i + 1].Option1;
	document.getElementById("1").innerHTML="2. "+arr[i].Option2+"/"+arr[i + 1].Option2;
	document.getElementById("2").innerHTML="3. "+arr[i].Option3+"/"+arr[i + 1].Option3;
	document.getElementById("3").innerHTML="4. "+arr[i].Option4+"/"+arr[i + 1].Option4;
	correctans=arr[i].Answer+"/"+arr[i+1].Answer;
	i += 2;
}
