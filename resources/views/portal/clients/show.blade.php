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

function resetCookie() {
  var email=getCookie("email");
  var client_id=getCookie("client_id");
  if (email == "" || client_id == "") {
    setCookie("email", "{{ $packages[0]->client->email }}");
    setCookie("client_id", "{{ $packages[0]->client->id }}");
  }
}
</script>
<style>
.mb-3 {
    padding-bottom: 10px;
}

#mobNav {
position: fixed;
z-index: 999999;
bottom: 0;
background: #222;
width: 100%;
padding-top: 10px;
padding-bottom: 10px;
}

#mobNav .mobNavBack,
#mobNav .mobNavForward {
-webkit-appearance: none;
background: none;
border: none;
color: white;
font-size: 2.5rem;
}

#mobNav .mobNavRefresh {
  -webkit-appearance: none;
  background: none;
  border: none;
  color: white;
  font-size: 2.2rem;
}

.text-center {
	text-align: center;
}

.text-right {
	text-align: right;
}

.user {
color: #fff !important;
}

.mobHeader {
width: 100%;
padding: 0 10px;
background: #FF5B5E;
color: #fff;
}

.itineraryList {
list-style: none;
padding-left: 0;
margin-bottom: 0;
}

.itineraryList li {
padding: 10px 20px;
background: #fff;
border: solid 1px #eee;
}

.login-register:after {
  display: none;
}

.widget-title {
background: #FF5B5E !important;
color: #ffffff;
font-size: 1.429rem;
font-weight: 600;
margin: 0;
padding: 1.143rem 1.5rem;
}

.contact-logo {
  background: #36404a;
  padding:25px;
}

@media (min-width:985px){
  #contactBox{
    display: none;
  }
}

@media (min-width: 992px) {
  #mobileView {
    display: none;
  }
}

@media (max-width: 991px) {
  #desktopView {
    display: none;
  }
}
</style>
<body class="nav-xl theme-green" onload="resetCookie()">
  <div class="main-container " id="desktopView">
    <div class="d-flex justify-content-center h-100 w-100 align-items-center">
      <div class="container d-flex h-100">
        <div class="row justify-content-center align-self-center">
          <div class="col-lg-8">
            <div style="background:#fff; padding:25px;">
              <h4 class="text-left pb-3">Your Itinerary</h4>
              <table class="table">
                <tr>
                  <th class="tg-0lax">Title</th>
                  <!-- <th class="tg-0la">Valid From</th> -->
                  <!-- <th class="tg-0la">Expires On</th> -->
                </tr>
                @foreach ($packages as $package)
                <tr>
                  <td class="tg-0lax"><a href="/portal/client/{{ $package->client_id }}/package/{{ $package->id }}" target="_blank">{{ $package->title }}</a></td>
                  <!-- <td class="tg-0la">{{ $package->created_at }}</td> -->
                  <!-- <td class="tg-0la">{{ $package->expiry_date }}</td> -->
                </tr>
                @endforeach
              </table>
            </div>
          </div>
          <div class="col-lg-4 d-none d-sm-block d-xs-block" id="contactBox">
            <article class="widget widget-inquire_now">
              <h4 class="widget-title">{{ $package->company->name }}</h4>
            </article>
            <div class="contact-logo">
              <img src="/storage/{{ $package->company->logo }}" class="img-fluid">
            </div>
            <div class="contact-box" style="background:#fff;">
              <table class="table" style="margin-top: 0px;">
                <tr>
                  <td class="tg-0lax">Phone</td>
                  <td class="tg-0lax"><a href="tel:{{ $package->company->phone }}">{{ $package->company->phone }}</a></td>
                </tr>
                <tr>
                  <td class="tg-0lax">Email</td>
                  <td class="tg-0lax"><a href="mailto:{{ $package->company->email }}">{{ $package->company->email }}</a></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Desktop -->
  <!-- Start Mobile -->
  <div class="main-container login-register" id="mobileView">
    <div class="justify-content-center h-100 w-100 align-items-center">
      <section class="mobHeader">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1>Your Itineraries <span class="float-right"><a href="" class="user"><i class="fa fa-user" aria-hidden="true"></i></a></span></h1>
            </div>
          </div>
        </div>
      </section>
      <div class="container-fluid h-100">
        <div class="row">
          <div class="col-md-12">
            <ul class="itineraryList mt-3 mb-3">
              @foreach ($packages as $package)
              <li class="mb-3">
                <a href="/portal/client/{{ $package->client_id }}/package/{{ $package->id }}">
                    {{ $package->title }}
                  </a>
              </li>
              @endforeach
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section id="mobNav" class="hidden-md-up">
    <div class="container-fluid">
      <div class="container">
        <div class="row">
          <div class="col-md-3 col-sm-3 col-xs-3 col-3">
            <button class="mobNavBack" onclick="goBack()"><i class="fa fa-angle-left" aria-hidden="true"></i></button>
            <script>
              function goBack() {
                window.history.back();
              }
            </script>
          </div>
          <div class="col-md-3 col-sm-3 col-xs-3 col-3">
            <button class="mobNavRefresh" onclick="reload()"><i class="fa fa-refresh" aria-hidden="true"></i></button>
            <script>
              function reload() {
                location.reload();
              }
            </script>
          </div>
          <div class="col-md-3 col-sm-3 col-xs-3 col-3 text-center">
            <a href="https://itinify.io/portal" onclick="event.preventDefault(); document.getElementById('portal-form').submit();" class="mobNavBack"><i class="fa fa-home" aria-hidden="true"></i></a>
            <form id="portal-form" action="https://itinify.io/portal" method="POST" style="display: none;">@csrf
              <input type="hidden" name="email" value="{{ $package->client->email }}">
              <input type="hidden" name="client_id" value="{{ $package->client->id }}">
            </form>
          </div>
          <div class="col-md-3 col-sm-3 col-xs-3 col-3 text-right">
            <button class="mobNavForward" onclick="goForward()"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
            <script>
              function goForward() {
                window.history.forward();
              }
            </script>
          </div>
        </div>
      </div>
    </div>
  </section>
</body>