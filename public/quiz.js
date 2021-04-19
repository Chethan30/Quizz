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
	     },1000)
	 
	}
window.onload = countdown;
    /* startbtn.addEventListener('click', countdown) */ //in case timer starting needs to be controlled 
})

var a = "submit"
var btnch = -1
var choice = ""
var item = ""

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
