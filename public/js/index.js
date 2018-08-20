$(document).ready(function (){ 
  



var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $GoalList = $("#goal-list");
var $updateBtn = $("#to-do-list");

//login 
var $signInEmail = $("#loginEmail");
var $signInPassword = $("#loginPassword");
var $signInButton = $("#loginSubmitForm");

//signup
var $signUpEmail = $("#signUpEmail");
var $signUpPassword = $("#signUpPassword");
var $signUpPasswordVerify = $("#signUpPasswordVerify");
var $signUpButton = $("#signUpSubmitForm");

//login switch

var userLoggedIn = false;

var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/goal",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/goal",
      type: "GET"
    });
  },
  updateGoal: function () {
    return $.ajax({
      url: "api/goal",
      type: "PUT",
      data: newStatus
    });
  },

  deleteExample: function (id) {
    return $.ajax({
      url: "api/goal/" + id,
      type: "DELETE"
    });
  },

  //users
  userSignIn: function (user, password) {
    return $.ajax({
     
      url: "api/signin/" + user +"/" + password,
      type: "GET"

    });
  },
  userSignUp: function (newUser) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/signup",
      data: JSON.stringify(newUser)
    });
  },
};

var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.goal)
        .attr("href", "/goal/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("Completed!");

      $li.append($button);
      return $li;

    });

    $updateBtn.empty();
    $updateBtn.append($examples);
  });
};





//LOGIN FUNCTION

var handleLogin = function (event) {
  event.preventDefault();

  var login = {
    email: $signInEmail.val().trim(),
    password: $signInPassword.val().trim()
    
  };

  // if (!example.goal) {
  //   alert("You must enter a goal!");
  //   return;
  // }

  API.userSignIn(login.email, login.password).then(function (data) {
    if (data.password === login.password){
      $('#logInWindow').modal('hide');
      console.log("welcome ");
      console.log(login);
      userLoggedIn = true;
    }
    else {
      $("#loginAlerts").html("Incorrect Email Password Combination");
      console.log("passwords do not match, try again");
   
    
    }


  });

  
};



//SIGNIN FUNCTION

var handleSignup = function (event) {
  event.preventDefault();

  var signup = {
    email: $signUpEmail.val().trim(),
    password: $signUpPassword.val().trim(),
    verifyPassword: $signUpPasswordVerify.val().trim()

  };
  var login = {
    email: $signUpEmail.val().trim(),
    password: $signUpPassword.val().trim()
  };


  // if (!example.goal) {
  //   alert("You must enter a goal!");
  //   return;
  // }

  API.userSignUp(signup).then(function () {
    console.log("new user created");
    API.userSignIn(login).then(function () {
      console.log("welcome " + login.email);
      console.log(login);

    });
  });

  
};


var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    goal: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if ($exampleText.val() === "") {
    // alert("You must enter a goal!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

var handleUpdateBtnClick = function () {

  var idToUpdate = $(this);

  var newStatus = {
    status: idToUpdate
  };

  API.updateGoal(newStatus).then(function () {
    refreshExamples();
  });
};

refreshExamples();
$submitBtn.on("click", handleFormSubmit);
$updateBtn.on("click", ".delete", handleDeleteBtnClick);


$signInButton.on("click", handleLogin);
$signUpButton.on("click", handleSignup);



var handleLogin = function (event) {
  event.preventDefault();

  var login = {
    email: $signInEmail.val().trim(),
    password: $signInPassword.val().trim()
    
  };

  // if (!example.goal) {
  //   alert("You must enter a goal!");
  //   return;
  // }

  API.userSignIn(login.email).then(function () {
    console.log("welcome ");
    console.log(login);
    userLoggedIn = true;

  });

  
};



var today = new Date();
var hourNow = today.getHours();
var greeting;

if (hourNow > 18) {
    greeting = "Good Evening! Did You Accomplish Your Goals Today?";
} else if (hourNow > 11) {
    greeting = "Good Afternoon! Keep Moving and Eating Well";
} else if (hourNow > 0) {
    greeting = "Good Morning! Start of a New Day and a New You";
} else {
    greeting = "Welcome!";
}
$("#greeting").html(greeting);
$("#today").html(today);


});
