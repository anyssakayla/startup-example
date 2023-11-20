
$(document).ready(function () {
	$.validator.setDefaults({
	    highlight: function(element) { //validating that all signup information is inputted
	        $(element).closest(".form-group").addClass("has-error");
	    },

	    unhighlight: function(element) {
	        $(element).closest(".form-group").removeClass("has-error");
	    },

	    errorElement: "span",

	    errorClass: "help-block",

	    errorPlacement: function(error, element) {
	        if (element.parent(".input-group").length ||
	        	element.prop("type") === "checkbox" ||
	        	element.prop("type") === "radio"
	        ) {
	            error.insertAfter(element.parent());
	        } else {
	            error.insertAfter(element);
	        }
	    }
	});

	$("form").validate({
		rules: {
            firstName:{
                required: true,
                maxLength: 100
              },
                lastName:{
                required: true,
                maxLength: 100
              },
			email: {
				required: true,
				maxlength: 255
			},

			zipCode: {
				maxlength: 32
			},
			password: {
				required: true,
				minlength: 5
			},
			passwordConfirm: {
				required: true,
				minlength: 5,
				equalTo: "#password"
			},
			termsOfUse: "required"
		},

		messages: {
			password: {
				required: "Please create a password."
			},
			passwordConfirm: {
				required: "Please confirm your password",
				equalTo: "Your passwords do not match"
			},
      			email: {
				required: "Please enter your email",
			},
			termsOfUse: {
				required: "Please agree to the terms of use."
			}
		}
	});

    // event listener to the submit button
    $('#signupForm').on('submit', function (event) {

		event.preventDefault();
      if ($('#signupForm').valid()) {
        // Serialize form data
        const formData = $('#signupForm').serialize();

        //request to the server
        $.ajax({
          type: 'POST',
          url: 'http://localhost:8080/signup',
          data: JSON.stringify({formData}),
		  contentType: 'application/json',
          success: function (response) {
            console.log('User successfully registered:', response);
			window.location.href = 'buy.html';
            // success message then redirect to a new page
          },
          error: function (error) {
            console.error('Error registering user:', error.responseText);
            // error message
          },
        });
      }
    });


	$('#loginForm').on('submit', function (event) {
        event.preventDefault();
        if ($('#loginForm').valid()) {
            const formData = $('#loginForm').serialize();

            // request to the server for login
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/login',
                data: JSON.stringify({ formData }),
                contentType: 'application/json',
                success: function (response) {
                    console.log('User successfully logged in:', response);
                    window.location.href = 'buy.html';
                },
                error: function (error) {
                    console.error('Error logging in:', error.responseText);
                },
            });
        }
    });
  });
	