/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

document.addEventListener("DOMContentLoaded", function() {
    //console.log("DOM fully loaded and parsed");
    for(var i = 0; i < usStates.length; i++) {
        var x = document.createElement("OPTION");
        x.value = usStates[i].code;
        x.text = usStates[i].name;
        document.getElementById("state").appendChild(x);
    }

    document.forms['signup'].occupation.addEventListener("change", function() {
        if (document.forms['signup'].occupation.value == "other") {
            document.forms["signup"].occupationOther.style.display = "block";
        } else {
            document.forms['signup'].occupationOther.value = '';
            document.forms['signup'].occupationOther.style.display = "none";
        }
    });

    document.forms['signup'].cancelButton.addEventListener("click", function() {
        if(window.confirm('Sure?')) {
            window.location = "https://google.com";
        }
    });

    document.forms['signup'].addEventListener('submit', onSubmit);

    function onSubmit(evt) {
        var valid = true;
        try {
            valid = validateForm(this);
        }
        catch(exception) {
            console.log(exception);
            valid = false; //stop form submission to see error
        }
        //use new standard preventDefault() if available
        if (!valid) {
            evt.preventDefault();
        }
        evt.returnValue = valid; //for older browsers
        return valid;
    } //onSubmit()

    function validateForm() {

        var valid = true;
        if (document.forms['signup'].firstName.value.trim().length = 0) {
            document.forms.signup.firstName.className = 'form-control invalid';
            valid = false;
        } else {
            document.forms.signup.firstName.className = 'form-control';
        }

        if(document.forms.signup.lastName.value.trim().length = 0){
                document.forms['signup'].lastName.className = 'form-control invalid';
                valid = false;
        } else {
                document.forms.signup.lastName.className = 'form-control';
        }

        if ( document.forms['signup'].address1.value.trim().length = 0) {
            document.forms['signup'].address1.className = 'form-control invalid';
            valid = false;
        } else {
            document.forms['signup'].address1.className = 'form-control';
        }

        if (document.forms['signup'].city.value.trim().length = 0) {
            document.forms['signup'].city.className = 'form-control invalid';
            valid = false;
        } else {
            document.forms['signup'].city.className = 'form-control';
        }

        if (!document.forms['signup'].state) {
            document.forms['signup'].state.className = 'form-control invalid';
            valid = false;
        } else {
            document.forms['signup'].state.className = 'form-control';
        }

        if (!document.forms['signup'].occupation.value) {
            valid = false;
            document.forms['signup'].occupation.className = 'form-control invalid';
        } else {
            document.forms['signup'].occupation.className = 'form-control';
        }

        var zipRegExp = new RegExp('^\\d{5}$');
        if (!zipRegExp.test(document.forms['signup'].zip.value)) {
            document.forms['signup'].zip.className = 'form-control invalid';
            valid = false;
        } else {
            document.forms['signup'].zip.className = 'form-control';
        }

        if(document.forms['signup'].birthdate.value) {
            var age = document.forms['signup'].birthdate.value;
            if(calculateAge(age) >= 13) {
                document.forms['signup'].birthdate.className = 'form-control';
                document.getElementById('birthdateMessage').innerHTML = "";
            } else {
                document.forms['signup'].birthdate.className = 'form-control invalid';
                valid = false;
                document.getElementById('birthdateMessage').innerHTML = "You are not 13 years old.";
            }
        } else {
            document.forms['signup'].birthdate.className = 'form-control invalid';
            valid = false;
        }
        return valid;
    }

    function calculateAge (dob) {
        dob = new Date(dob);
        var today = new Date();

        var yearsDiff = today.getFullYear() - dob.getFullYear();
        var daysDiff = today.getDate() - dob.getUTCDate();
        var monthsDiff = today.getMonth() - dob.getUTCMonth();

        if (monthsDiff < 0 || (monthsDiff == 0 && daysDiff < 0)) {
            yearsDiff--;
        }
        return yearsDiff;
    }
});

