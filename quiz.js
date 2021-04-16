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

