/*
 Signup Form Script
 This script will load the state select list and validate the form before submission
 */

document.addEventListener('DOMContentLoaded', function () {
    var signupForm = document.forms['signup'];
    for (var i = 0; i < usStates.length; i++) {
        var state = usStates[i];
        var option = document.createElement("OPTION");
        option.value = state.code;
        option.text = state.name;
        signupForm.state.appendChild(option);
    }

    var occupation = signupForm.occupation;
    occupation.addEventListener('change', function() {
        var occupationElement = occupation.value;
        if(occupationElement == "other") {
            signupForm.occupationOther.style.display = "block";
        } else {
            signupForm.occupationOther.style.display = "none";
            signupForm.occupationOther.value = '';
        }
    });

    signupForm.cancelButton.addEventListener('click', function() {
        if(window.confirm("You sure you want to leave? We have cookies!")) {
            window.location = "https://www.google.com";
        }
    });

    function onSubmit(eventObject) {
        var firstName = signupForm.firstName;
        var lastName = signupForm.lastName;
        var address1 = signupForm.address1;
        var city = signupForm.city;
        var birthDate = signupForm.birthdate;
        var state = signupForm.state.value;
        var zip = signupForm.zip.value;
        var currentOccupation = occupation.value;


        var valid = true;

        if(firstName.value.trim().length == 0) {
            valid = false;
            firstName.className = 'form-control invalid';
        } else {
            firstName.className = 'form-control';
        }

        if(lastName.value.trim().length == 0) {
            valid = false;
            lastName.className = 'form-control invalid';
        } else {
            lastName.className = 'form-control';
        }

        if(address1.value.trim().length == 0) {
            valid = false;
            address1.className = 'form-control invalid';
        } else {
            address1.className = 'form-control';
        }

        if(city.value.trim().length == 0) {
            valid = false;
            city.className = 'form-control invalid';
        } else {
            city.className = 'form-control';
        }

        var testZipCode = new RegExp('^\\d{5}$');
        if(!testZipCode.test(zip)) {
            valid = false;
            signupForm.zip.className = 'form-control invalid';
        } else {
            signupForm.zip.className = 'form-control';
        }

        if(!currentOccupation) {
            valid = false;
            occupation.className = 'form-control invalid';
        } else {
            occupation.className = 'form-control';
        }

        if (currentOccupation == "other") {
            var currentOccupationOther = signupForm.occupationOther.value;
            if(currentOccupationOther.trim().length == 0) {
                valid = false;
                signupForm.occupationOther.className = 'form-control invalid';
            } else {
                signupForm.occupationOther.className = 'form-control';
            }
        }

        if(!state) {
            valid = false;
            signupForm.state.className = 'form-control invalid';
        } else {
            signupForm.state.className = 'form-control';
        }

        if(birthdate.value) {
            var age = birthDate.value;
            if(calculateAge(age) >= 13) {
                birthDate.className = 'form-control';
                document.getElementById('birthdateMessage').innerHTML = "";
            } else {
                birthDate.className = 'form-control invalid';
                valid = false;
                document.getElementById('birthdateMessage').innerHTML = "You are not 13 years old.";
            }
        } else {
            birthDate.className = 'form-control invalid';
            valid = false;
        }

        console.log(age);
        if(!valid) {
            eventObject.preventDefault();
            eventObject.returnValue = false;
            return false;
        }
    }
    signupForm.addEventListener('submit', onSubmit);

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
