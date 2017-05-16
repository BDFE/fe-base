onmessage = function (e) {
	setInterval(function () {
		var date = new Date();
		var y = date.getFullYear();
		var M = date.getMonth()+1;
		var d = date.getDate();
		var h = get2Char(date.getHours());
		var m = get2Char(date.getMinutes());
		var s = get2Char(date.getSeconds());
		postMessage({y:y,M:M,d:d,h:h,m:m,s:s});
	}, 1000);
}

function get2Char(code) {
	var incode = code + "";
	if (incode.length === 1) {
		incode = "0" + incode;
	}
	return incode;
}