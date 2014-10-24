/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    for(var i = 0; i < usStates.length; i++) {
        var x = document.createElement("OPTION");
        x.value = usStates[i].code;
        x.text = usStates[i].name;
        document.getElementById("state").appendChild(x);
    }
});

document.getElementById("myBtn").addEventListener("click", displayDate);
