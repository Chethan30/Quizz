var timer;
document.addEventListener("DOMContentLoaded", () => {
  
  const timeleftdisplay = document.querySelector("#timer");
  timer = parseInt(window.localStorage.getItem("timer"));
  function countdown() {
    makeQuestion();
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      timeleftdisplay.innerHTML = minutes + ":" + seconds;
      timer = timer - 1;
      window.localStorage.setItem("timer",timer);
    }, 1000);
  }

  function fetchQuestions() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/takeround2", true);
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
    };
    xhr.send();
  }
  window.onload = fetchQuestions;
});

var j = parseInt(window.localStorage.getItem("j"));
var ans = "";
var correctans = "";
var comments = "";
var response = JSON.parse(window.localStorage.getItem("response"));
var score = parseInt(window.localStorage.getItem("score"));
function makeQuestion() {
  if (j >= arr.length) {
    window.location = "image_quiz.html";
  }
  document.getElementById("question").innerHTML = arr[j].Question;
  document.getElementById("question_kan").innerHTML = arr[j + 1].Question;
  cans = arr[j].TrueorFalse + "";
  correctans = arr[j].TrueorFalse + "/" + arr[j + 1].TrueorFalse;
  comments = arr[j].Comments + "/" + arr[j + 1].Comments;
}

function displayRightAns() {
  if(flag>=0){
    document.getElementById("nextbutton").disabled = true;
    document.getElementById("answer").innerHTML ="CORRECT ANSWER: " + correctans;
    document.getElementById("comments").innerHTML = comments;
    if (cans == ans) {
      score++;
    }
    response["round2choice" + j / 2] = ans;
    ans = "";
    j += 2;
    window.localStorage.setItem("j", j);
    window.localStorage.setItem("response", JSON.stringify(response));
    window.localStorage.setItem("score", score);
    setTimeout(() => {
      document.getElementById("nextbutton").disabled = false;
      document.getElementById("answer").innerHTML="";
      document.getElementById("comments").innerHTML="";
      makeQuestion();
      location.reload();
    }, 2000);
  }
  else{
    document.getElementById("test").innerHTML ="Choose an option";
  }
 
}

var flag = -1
function recordAns(option) {
  if (option == 0) {
    flag = 0;
    ans = "true";
  }
  if (option == 1) {
    flag = 1;
    ans = "false";
  }
}

function preventBack() { window.history.forward(); }  
setTimeout("preventBack()", 0);  
window.onunload = function () { null };  

