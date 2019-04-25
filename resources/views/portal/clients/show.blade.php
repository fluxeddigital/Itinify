<!DOCTYPE html>
<html lang="en">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>My Packages - {{ $client->company->name }} - Itinify</title>

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <link href="{{ asset('plugins/css/plugins.css') }}" rel="stylesheet">
  <link href="{{ asset('css/portal/style.css') }}" rel="stylesheet">
  <link href="{{ asset('css/portal/responsiveness.css') }}" rel="stylesheet">
  <link href="{{ asset('css/portal/skins/default.css') }}" rel="stylesheet">
</head>

<body>

  <nav class="navbar navbar-default navbar-mobile navbar-fixed light bootsnav">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
          <i class="fa fa-bars"></i>
        </button>
        <a class="navbar-brand" href="#">
          <img src="{{ $client->company->logo }}" class="logo logo-display" alt="{{ $client->company->name }} Logo">
          <img src="{{ $client->company->logo }}" class="logo logo-scrolled" alt="{{ $client->company->name }} Logo">
        </a>
      </div>
      <div class="collapse navbar-collapse" id="navbar-menu">

        <ul class="nav navbar-nav navbar-left" data-in="fadeInDown" data-out="fadeOutUp">
          <li class="dropdown">
            <a href="messages.html#" class="dropdown-toggle" data-toggle="dropdown">Home</a>
            <ul class="dropdown-menu animated fadeOutUp">
              <li><a href="index.html">Home 1</a></li>
              <li><a href="home-2.html">Home 2</a></li>
              <li><a href="home-3.html">Home 3</a></li>
              <li><a href="home-4.html">Home 4</a></li>
              <li><a href="home-5.html">Home 5</a></li>
            </ul>
          </li>
        </ul>

        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown dash-link">
            <a href="javascript:void()" class="dropdown-toggle">Hi, {{ $client->name }}</a>
            <ul class="dropdown-menu left-nav">
              <li><a href="">Log Out</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <section class="dashboard gray-bg padd-0 mrg-top-50">
    <div class="container">
      <div class="row mrg-0">
        <div class="tr-single-body heading alt">
          <h3>Your Packages</h3>
        </div>
        <div class="tr-single-box short-box">
          <div class="col-sm-3 hidden-xs align-self-center">
            <h4>Filter</h4>
          </div>

          <div class="col-sm-9 text-right">
            <div class="btn-group ">
              <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Event
              </button>
              <div class="dropdown-menu pull-right">
                <a href="">US Masters 2020</a>
              </div>
            </div>
            <div class="btn-group mr-lg-3">
              <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Type
              </button>
              <div class="dropdown-menu pull-right">
                <a href="">Proposal</a>
                <a href="">Itinerary</a>
                <a href="">Declined</a>
              </div>
            </div>
            <div class="btn-group mr-lg-3">
              <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort By
              </button>
              <div class="dropdown-menu pull-right">
                <a href="">Accending</a>
                <a href="">Decending</a>
                <a href="">By Date</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mrg-top-20">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="row">
            @foreach ($client->packages as $item)
            <div class="col-md-4 col-sm-6">
              <article class="destination-box style-1">
                <div class="destination-box-image">
                  <figure>
                    <a href="/portal/clients/{{ $client->id }}/{{ $client->email }}/packages/{{ $item->id }}" target="_blank">
                      <img src="{{ $item->event->banner }}" class="img-responsive listing-box-img" alt="{{ $item->event->name }} - {{ $item->company->name }}" />
                      <div class="list-overlay"></div>
                    </a>
                    <h4 class="destination-place">
							        <a href="/portal/clients/{{ $client->id }}/{{ $client->email }}/packages/{{ $item->id }}" target="_blank">{{ $item->title }}</a>
							      </h4>
                  </figure>
                </div>
                <div class="entry-meta">
                  <div class="meta-item meta-rating">
                    <p><strong>{{ $item->event->name }}</strong></p>
                  </div>
                  <div class="meta-item meta-comment fl-right">
                    <span class="real-price padd-l-10 font-bold">£{{ $item->pricing->total }}</span>
                  </div>
                </div>
                <div class="inner-box">
                  <div class="box-inner-ellipsis">
                    <h4 class="entry-location">
							         <a href="/portal/clients/{{ $client->id }}/{{ $client->email }}/packages/{{ $item->id }}" target="_blank">View Proposal</a>
							       </h4>
                    <div class="price-box">
                      <div class="destination-price fl-right">
                        <a href="/portal/clients/{{ $client->id }}/{{ $client->email }}/packages/{{ $item->id }}" target="_blank">
                          <i class="theme-cl ti-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
            @endforeach
          </div>
          <div class="row">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="" aria-label="Previous">
                  <span class="ti-arrow-left"></span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              <li class="page-item active"><a class="page-link" href="">1</a></li>
              <li class="page-item"><a class="page-link" href="">2</a></li>
              <li class="page-item">
                <a class="page-link" href="" aria-label="Next">
                  <span class="ti-arrow-right"></span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="before-footer bt-1 bb-1">
    <div class="container-fluid padd-0 full-width">
      <div class=" col-md-2 col-sm-2 br-1 mbb-1">
        <div class="data-flex">
          <h4>Contact Us!</h4>
        </div>
      </div>
      <div class="col-md-3 col-sm-3 br-1 mbb-1">
        <div class="data-flex text-center">
          @if ($client->company->address_line_1) {{ $client->company->address_line_1 }}, @endif @if ($client->company->address_line_2) {{ $client->company->address_line_2 }}, @endif @if ($client->company->address_line_3) {{ $client->company->address_line_3 }},
          @endif @if ($client->company->address_town) {{ $client->company->address_town }}, @endif @if ($client->company->address_county) {{ $client->company->address_county }}, @endif @if ($client->company->address_postcode) {{ $client->company->address_postcode
          }} @endif
        </div>
      </div>
      <div class="col-md-3 col-sm-3 br-1 mbb-1">
        <div class="data-flex text-center">
          <span class="d-block mrg-bot-0"><a href="tel:{{ $client->company->phone }}" class="theme-cl">{{ $client->company->phone }}</a></span>
          <a href="mailto:{{ $client->company->email }}" class="theme-cl"><strong>{{ $client->company->email }}</strong></a>
        </div>
      </div>
      <div class="col-md-4 col-sm-4 padd-0">
        <div class="data-flex padd-0">
          <ul class="social-share">
            @if ($client->company->about->social->facebook)
            <li>
              <a href="{{ $client->company->about->social->facebook }}">
                <i class="fa fa-facebook theme-cl"></i>
              </a>
            </li>
            @endif @if ($client->company->about->social->instagram)
            <li>
              <a href="{{ $client->company->about->social->instagram }}">
                <i class="fa fa-instagram theme-cl"></i>
              </a>
            </li>
            @endif @if ($client->company->about->social->twitter)
            <li>
              <a href="{{ $client->company->about->social->twitter }}">
                <i class="fa fa-twitter theme-cl"></i>
              </a>
            </li>
            @endif @if ($client->company->about->social->linkedin)
            <li>
              <a href="{{ $client->company->about->social->facebook }}">
                <i class="fa fa-linkedin theme-cl"></i>
              </a>
            </li>
            @endif
          </ul>
        </div>
      </div>
    </div>
  </section>

  <script src="{{ asset('plugins/js/jquery.min.js') }}" defer></script>
  <script src="{{ asset('plugins/js/bootstrap.min.js') }}" defer></script>
  <script src="{{ asset('plugins/js/viewportchecker.js') }}" defer></script>
  <script src="{{ asset('plugins/js/bootsnav.js') }}" defer></script>
  <script src="{{ asset('plugins/js/jquery.nice-select.min.js') }}" defer></script>
  <script src="{{ asset('plugins/js/moment.min.js') }}" defer></script>
  <script src="{{ asset('js/portal/custom.js') }}" defer></script>

</body>

</html>
