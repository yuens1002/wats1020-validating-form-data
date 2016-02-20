/* Custom JS goes here. */

// For this assignment you'll need to do a few things:
// 1. Create a document ready handler.
// 2. Define a validation object for use on your page.
// 3. Connect the validation object to an event handler tied to the submit button.

// Refer to the `index.html` file for the validation rules that must be enforced.

$().ready(function() {
	
	$.validator.addMethod("letters", function(value, element) {
		return this.optional(element) || /^[a-z ]+$/i.test(value);
		}, '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> <span class="sr-only">ok</span>use only letters for your name pls');	
	
	$.validator.addMethod( "stateUS", function( value, element, options ) {
		var isDefault = typeof options === "undefined",
			caseSensitive = ( isDefault || typeof options.caseSensitive === "undefined" ) ? false : options.caseSensitive,
			includeTerritories = ( isDefault || typeof options.includeTerritories === "undefined" ) ? false : options.includeTerritories,
			includeMilitary = ( isDefault || typeof options.includeMilitary === "undefined" ) ? false : options.includeMilitary,
			regex;

		if ( !includeTerritories && !includeMilitary ) {
			regex = "^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$";
		} else if ( includeTerritories && includeMilitary ) {
			regex = "^(A[AEKLPRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$";
		} else if ( includeTerritories ) {
			regex = "^(A[KLRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$";
		} else {
			regex = "^(A[AEKLPRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$";
		}

		regex = caseSensitive ? new RegExp( regex ) : new RegExp( regex, "i" );
			return this.optional( element ) || regex.test( value );
		
	}, '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> <span class="sr-only">ok</span>use 2 letter valid US state abbreviation pls' );
	
	//validates 5 digit US zip
	$.validator.addMethod( "zipcodeUS", function( value, element ) {
			return this.optional( element ) || /^\d{5}(-\d{4})?$/.test( value );
	}, '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> <span class="sr-only">ok</span>use a valid 5 digit US ZIP code pls' );
	
	// Form validation
    $('#order-form').validate({
		errorElement: 'em',
		//errorPlacement: function(error, element) {
		//	error.appendTo(element.parent('input'));
		//},
		submitHandler: function(form) {
            // If form is valid, submit it!
            form.submit();
		},
        rules: {
			
            "your-name": {
                required: true,
				letters: true,
				minlength: 2,
                maxlength: 128
            },
			"your-city": {
                required: true,
				minlength: 2,
                maxlength: 128
            },
			"your-address": {
				required: true	
			},
            "your-state": {
                required: true,
				stateUS: {
				 	caseSensitive: false,
				 	includeTerritories: false,
				 	includeMilitary: false
				}
            },
            "your-zip": {
                required: true,
				zipcodeUS: true,
            },
            "card-holder-name": {
                required: true,
				letters: true,
				minlength: 2,
                maxlength: 128
            },
            "card-number": {
                required: true,
                creditcard: true
            },
            "cvv": {
                required: true,
				digits: true,
				minlength: 3,
                maxlength: 4  
            },
			"expiry-month": {
				required: true
			},
			"expiry-year": {
				required: true
			},
			"shipping-method": {
				required: true
			}
        },
		
		success: function(label) {
			label.addClass('valid').html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> <span class="sr-only">ok</span>Awesome!')
		  },
		
		messages: {
			"your-name": {
				required: '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> <span class="sr-only">need a name pls</span>name can\'t be left blank',
				minlength: $.validator.format('<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> <span class="sr-only">min. {0} char pls</span>min. {0} characters for your name pls')
			},
			"your-address": {
				required: '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> <span class="sr-only">need an address pls</span>address can\'t be left blank'
			},
			"card-holder-name": {
				required: '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> <span class="sr-only">need a name pls</span>name can\'t be left blank',
				minlength: $.validator.format('<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> <span class="sr-only">min. {0} char pls</span>min. {0} characters for your name pls')
			},
			"cvv": {
				minlength: $.validator.format('<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> <span class="sr-only">min. {0} #s pls</span>look on the back of your visa/mastercard for the 3 digtal # or the 4 digit # on the front for AMEX.'),
				digits: '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> <span class="sr-only">enter only #s pls</span>enter only #s pls' 
			}
		}
    });
	
	$('[data-toggle="tooltip"]').tooltip()
	
});
