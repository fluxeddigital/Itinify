@extends('layouts.portal')

@section('title', 'Find Your Itinerary')

@section('content')
<script>
function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var email=getCookie("email");
  var client_id=getCookie("client_id");
  if (email != "" && client_id != "") {
	  $('input[name="email"]').val(email);
	  $('input[name="client_id"]').val(client_id);
    $('#login').submit();
  }
}
</script>
<body class="nav-xl theme-green" onload="checkCookie()">
	<form id="login" action="/portal" method="POST">@csrf<input type="hidden" name="client_id"><input type="hidden" name="email"></form>
  <!-- nav class="navbar navbar-expand-lg navbar-light bg-dark">
    <a class="navbar-brand" href="#">

          </g>
        </g>
      </svg>
    </a>
    <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#itinifyNavBar" aria-controls="itinifyNavBar" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="itinifyNavBar">
      <ul class="navbar-nav ml-md-auto d-md-flex">
        <li class="nav-item">
          <a class="nav-link login ripple btn-raised" href="{{ route('login') }}"></i>LOGIN</a>
        </li>
        <li class="nav-item">
          <a class="nav-link register ripple btn-raised" href="{{ route('register') }}">REGISTER</a>
        </li>
      </ul>
    </div>
  </nav> -->
  <div class="main-container login-register">
    <div class="d-flex justify-content-center h-100 w-100 align-items-center">
      <div class="login-container">
        <div class="form-container">
          <div class="mb-background">
            <h4 class="text-center pb-3">Find Your Itinerary</h4>
            <form class="material-form" method="POST" action="{{ route('portal.index') }}">
            @csrf
              <div class="form-group floating-label">
                <input type="text" id="email" class="form-control" name="email" required>
                <label for="email">Enter your email address</label>
              </div>
              <div class="form-group floating-label">
                <input type="password" id="idpin" class="form-control" name="client_id" required>
                <label for="idpin">Enter your ID pin</label>
              </div>
              <div class="form-group m-0 p-0">
                <button type="submit" class="btn btn-theme ripple btn-raised btn-block btn-submit">
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
@endsection
