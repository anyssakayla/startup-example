$(document).ready(function () {

	$.validator.setDefaults({
	    highlight: function(element) {
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
});