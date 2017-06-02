var xhttp = new XMLHttpRequest();
var currencyBaseSymbol = 'EUR';
var curFromElement = document.getElementById("cur_from");
var curToElement = document.getElementById("cur_to");
var curTextElement = document.getElementById("cur_text");
var resultElement = document.getElementById("result");
var FER = 1;
var data;
var textFrom;

function SelectDefault(i)
  {
    curFromElement.options[i].selected=true;

  }

function addSel(sel,data, curren){
	var i=1;
	   sel.options[0] = new Option(curren);   
	   for (var key in data){
		   sel.options[i] = new Option(key);
		   console.log(key);      
        i++;   		
	   }
}

curFromElement.onchange = function() {
    currencyBaseSymbol = curFromElement.value;
	load_curs();
    selectint = curFromElement.options.selectedIndex;
	SelectDefault(selectint);
	//textFrom = curFromElement.options[selectint].text;
};

curToElement.onchange = function() {
	selectint = curToElement.options.selectedIndex;
	//SelectDefault(selectint);
	textCur = curToElement.options[selectint].text;
	if (data[curToElement.value]){
         if (textCur == currencyBaseSymbol)
		 {FER = 1}
	else{     
	     FER = data[curToElement.value];
	    } 		 
         }

};



function load_curs(){
	var myRequest2 = new XMLHttpRequest();
	var url = 'http://api.fixer.io/latest?base='+currencyBaseSymbol; 
	var Str;
	var objSelcur_from = document.getElementById("cur_from");
    var objSelcur_to = document.getElementById("cur_to"); 
     myRequest2.open('GET', url, true);
     myRequest2.onreadystatechange = function() 
    {
  if (myRequest2.readyState == 4) {
     if(myRequest2.status == 200) {
       dataJson = JSON.parse(myRequest2.responseText);
	   data = dataJson["rates"];
       Str = 'BASE-'+ currencyBaseSymbol+' ';	   
       for (var key in data){
		   Str = ' '+Str +' '+ key + ':' + data[key];
         } 
         addSel(objSelcur_from,data, currencyBaseSymbol);
         addSel(objSelcur_to,data, currencyBaseSymbol);		 
		 curTextElement.innerHTML = Str;
  }
};
}
myRequest2.send(null);

}
/*
    Implement function that fills currency from/to select boxes with currency codes
    and fills scrolling text with rates against currencyBaseSymbol
*/
function loadCurrency() {
   /* your code goes here */   
     load_curs()
   }

/*
    Implement function that converts from one selected currency to another filling result text area.
 */
function getRates() {
    /* your code goes here */
	  var amount = 1;
       if (document.getElementById("cur_amount").value){	  
	   amount = document.getElementById("cur_amount").value;
	   }
	   resultElement.innerHTML = amount*FER;
         //}
	
}

// Load currency rates when page is loaded
window.onload = function() {
    // Run loadCurrency func to fetch currencies data and set this function to run every 60 sec.
    (() => {loadCurrency(); setInterval(loadCurrency, 1000 * 60);})();
    var btn = document.getElementById('run');
    btn.addEventListener("click", getRates);
};
