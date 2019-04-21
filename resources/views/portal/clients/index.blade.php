<html lang="en">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Portal - Itinify</title>

  <link href="{{ asset('plugins/css/plugins.css') }}" rel="stylesheet">
  <link href="{{ asset('css/portal/style.css') }}" rel="stylesheet">
  <link href="{{ asset('css/portal/responsiveness.css') }}" rel="stylesheet">
  <link href="{{ asset('css/portal/skins/default.css') }}" rel="stylesheet">

</head>

<body class="theme-bg log-screen" style="background-image:url({{ asset('images/portal/banner-log.png') }});">
  <div class="wrapper">
    <section class="log-wrapper">
      <div class="container">
        <div class="col-md-5 col-md-push-7">
          <h3 class="log-title">Client Login</h3>
          <form class="form">
            <div class="form-group">
              <label for="inputEmail">User Name</label>
              <input type="email" class="form-control" id="inputEmail" placeholder="User Name" required="">
            </div>
            <div class="form-group">
              <label for="inputEmail">Password</label>
              <input type="password" class="form-control" id="inputEmail" placeholder="*******" required="">
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-md-6 col-sm-6">
                  <button type="submit" class="btn btn-dark">Login</button>
                </div>
                <div class="col-md-6 col-sm-6">
                  <p>Foreget Password? <a href="login.html#">Click Here</a></p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

    <script src="{{ asset('plugins/js/jquery.min.js') }}" defer></script>
    <script src="{{ asset('plugins/js/bootstrap.min.js') }}" defer></script>
    <script src="{{ asset('plugins/js/viewportchecker.js') }}" defer></script>
    <script src="{{ asset('plugins/js/jquery.nice-select.min.js') }}" defer></script>
    <script src="{{ asset('js/portal/custom.js') }}" defer></script>

  </div>
</body>

</html>
