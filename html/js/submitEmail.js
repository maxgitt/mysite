function send_email(name, email) {
  // Send email
  url = "/cgi-bin/htmail/maxgitt@umich.edu";
  data = {
      "email": email,
      "name": name
  };
  var posting = $.post(url, data);
  
  // Check email was sent
  posting.done(function(){
      alert("Your email has been sent!");
  })
  posting.fail(function(){
      alert("Sorry the email could not be sent.");
  })
}

function validate_server_recaptcha() {
  alert("Function called")
  var status = null;
  // Get Validation
  url = "https://www.google.com/recaptcha/api/siteverify";
  data = {
      "secret": email,
      "response": document.getElementById("g-recaptcha-response")
  };
  var posting = $.post(url, data);
  
  // Check email was sent
  posting.done(function(data){
      status = JSON.parse(data).status;
      alert('Status: ' + status);
  })
  posting.fail(function(){
      alert("Could not connect with google.");
  })
  return status;
}


// Attach a submit handler to the form
$( "#recaptcha-form" ).submit(function( event ) {

  alert("form submitted");
  // Stop form from submitting normally
  event.preventDefault();
 
  // Validate fields
  var name = document.getElementById('name');
  var email = document.getElementById('email');
  if (name.value && email.value) {
    alert("Name: " + name.value);
    alert("Email: " + email.value);
    
    // Check recaptcha was completed
    if (document.getElementById('g-recaptcha-response').value) {
        status = validate_server_recaptcha();
        // Check recaptcha was successful
        if (status == "successful") {
          send_email(name, email);
        }
        else {
          alert("Google did not verify you as human.");
        }
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