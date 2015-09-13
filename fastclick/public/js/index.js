window.onload = function() {
	var touchDom = document.getElementById("touchBlock");
	var clickDom = document.getElementById("clickBlock");
	var innerDom = document.getElementById("inner");
	var wrapperDom = document.getElementById("wrapper");

	touchDom.addEventListener("touchstart", function() {
		console.log("touchstart");
		alert("touch start")
	})

	clickDom.addEventListener("click", function() {
		console.log("click");
		alert("click");
	})


	var startTs, endTs; 
	innerDom.addEventListener("click", function() {
		endTs = + new Date(); 

		alert("innerDom: " + (endTs - startTs) + 'ms');
	})

	wrapperDom.addEventListener("touchend", function() {
		startTs = + new Date(); 
	})
}