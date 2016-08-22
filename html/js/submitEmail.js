function success_email_sent() {

  alert("Your email has been sent!");

}

function send_email(name, email) {

  // Send email
  url = "/cgi-bin/htmail/maxgitt@umich.edu";
  data = {
      "email": email,
      "name": name
  };
  $.post(url, data, success_email_sent());

}

function success_google_validated(data) {
  console.log(data);
  console.log(JSON.parse(data));
  status = JSON.parse(data).status;
  if (status == "successful") {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    send_email(name, email);
  }
  else {
    alert("Google did not verify you as human.");
  }

}

function validate_server_recaptcha() {

  console.log("Validate function called");
  // Get Validation
  //url = "https://www.google.com/recaptcha/api/siteverify";
  request_data = {
      "secret": "6LdGfyUTAAAAAIZDpThAR7kfAFRtoslKTeanvG7m",
      "response": document.getElementById("g-recaptcha-response")
  };
  //$.post(url, data, success_google_validated());

  $.ajax({
    url : 'https://www.google.com/recaptcha/api/siteverify',
    type: 'POST',
    data: request_data,
    dataType: 'json',
    success: success_google_validated(),
    error: fail_google_validated()
  })

}


// Attach a submit handler to the form
$( "#recaptcha-form" ).submit(function( event ) {

  // alert("form submitted");
  // Stop form from submitting normally
  event.preventDefault();
 
  // Validate fields
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var recaptcha_checked = document.getElementById('g-recaptcha-response').value;

  if (name && email) {
    console.log("Name: " + name);
    console.log("Email: " + email);
    
    // Check recaptcha was completed
    if (recaptcha_checked) {
        validate_server_recaptcha();
    }
    else {
        alert("Please verify you are human.");
    }
  }
  else {
    // Fields Invalid
    alert("Please enter a valid name and email.");
  }
  
});