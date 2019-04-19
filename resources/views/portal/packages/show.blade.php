@if ($package->status == 'accepted')
<style>
.special-from {
padding: 25px;
}
.package-item {
width: auto !important;
text-align: center;
}
.modalContent {
background: #fff;
}
.closeModal {
cursor: pointer !important;
border: 0 !important;
-webkit-appearance: none !important;
color: #000 !important;
right: 40px !important;
top: 31px !important;
position: absolute !important;
background: #fff !important;
opacity: 1 !important;
border-radius: 0px !important;
padding: 2px 10px !important;
z-index: 9999;
font-size: 1.4rem;
}
@media (min-width: 992px) {
  .mobileView {
    display: none!important;
  }
}

@media (max-width: 991px) {
  .desktopView {
    display: none!important;
  }
}
</style>
@endif
<style>
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
@media only screen and (max-width : 992px) {
.td-detail-tab-navbar {
  display:none;
}
.td-user-button {
  display: none;
}
#mobMenu {
margin-bottom: 0;
padding-left: 0;
}

#mobMenu li {
  border-bottom: solid 1px #eee;
}

#mobMenu li > a:last-child {
border-bottom: none !important;
}

.package-link {
font-size: 1.2rem;
width: 100%;
text-align: left;
}
}

@media only screen and (min-width : 992px) {
#mobMenu {
  display:none;
}
}
</style>

<script>
const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

let countDown = new Date('{{ $package->event->start_date }}').getTime(),
    x = setInterval(function() {

      let now = new Date().getTime(),
          distance = countDown - now;

        document.getElementById('days').innerText = Math.floor(distance / (day)),
        document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

    // do something later when date is reached
    // if (distance < 0) {
    //   clearInterval(x);
    //   'Enjoy Your Trip!;
    // }
    }, second)
</script>
<style>
{{ $package->company->custom_css }}
</style>
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
    setCookie("email", "{{ $package->client->email }}");
    setCookie("client_id", "{{ $package->client->id }}");
  }
}
</script>
<body onload="resetCookie()">
<div class="wrapper" id="packageView">
  <!-- HEADER -->
  <header class="about td-header" style="background-image:linear-gradient(rgba(0, 0, 0, 0.17), rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0) 100%, rgba(98, 100, 98, 0.611764705882353)), url('/storage/{{ $package->event->banner_image }}');">
    <div class="td-header-inner">
      <!-- Navbar -->
      <nav class="td-navbar navbar package-nav">
        <div class="container">
          <div class="navbar-header">
            <div class="td-brand">
              <a class="td-logo" href="#">
                @if ( $package->client->logo )
                <img src="/storage/{{ $package->client->logo }}" style="width:80px;" alt="">
                @else
                <img src="/storage/{{ $package->company->logo }}" style="width:110px;" alt="">
                @endif
              </a>
            </div>
            <button class="navbar-toggler hidden-lg-up pull-xs-right" data-toggle="collapse" data-target="#td-nav-collapsed">☰</button>
          </div>
          <div id="td-nav-collapsed" class="collapse navbar-toggleable navbar-toggleable-md">
            <div class="td-navbar-action login pull-lg-right text-lg-right navbar-collapse">
              <ul id="mobMenu">
                <li class="nav-item package-item">
                  <a class="nav-link package-link" data-toggle="tab" href="#Welcome">Welcome</a>
                </li>
                <li class="nav-item package-item hidden-sm-down">
                  <a class="nav-link package-link" data-toggle="tab" href="#Itinerary">Your Itinerary</a>
                </li>
                <li class="nav-item package-item hidden-sm-up">
                  <a class="nav-link package-link" data-toggle="tab" href="#Itinerary">Itinerary</a>
                </li>
  				@if ($package->status == 'open')
                <li class="nav-item package-item hidden-sm-down">
                  <a class="nav-link package-link" data-toggle="tab" href="#TermsConditions">Booking Conditions</a>
                </li>
                <li class="nav-item package-item hidden-sm-up">
                  <a class="nav-link package-link" data-toggle="tab" href="#TermsConditions">Conditions</a>
                </li>
  				@else
          @if (json_decode($package->event->welcome_pack))
          	  @foreach (json_decode($package->event->welcome_pack)->welcomePack as $section)
                        <li class="nav-item package-item">
                          <a class="nav-link package-link" data-toggle="tab" href="#{{ str_replace(' ','',$section->title) }}">{{ $section->title }}</a>
                        </li>
          	  @endforeach
            @endif
  				@endif
              </ul>
				<script>
					$('.nav-item').on('click', function(){
    $('.navbar-toggler').click();
});
				</script>
              @if ($package->client->phone )
              <a href="tel:{{ $package->client->phone }}" class="td-user-button"><span class="call-cta">{{ $package->client->phone }}</span></a>
              @else
              <a href="tel:{{ $package->company->phone }}" class="td-user-button"><span class="call-cta">{{ $package->company->phone }}</span></a>
              @endif
            </div>
            <div class="td-topheader-tagline hidden-md-down text-xs-center" style="line-height: 2.5;">
              <span class="blank-space"></span>
              <!-- Package Tagline Here -->
            </div>
          </div>
        </div>
        <!-- //.container -->
      </nav>
      <div class="jumbotron text-xs-center package-jumbotron">
        <div class="container">
          <div class="row">
            <div class="offset-md-4 col-md-4">
              <div class="jumbotron-content">
                <ul id="eventCountdown" style="color:#fff">
                  <li><span id="days"></span>days</li>
                  <li><span id="hours"></span>Hrs</li>
                  <li><span id="minutes"></span>Mins</li>
                  <li><span id="seconds"></span>Secs</li>
                </ul>
                <h2>{{ $package->title }}</h2>
                <ul class="package-header-list">
                  <li class="package-prepared">Prepared for: {{ $package->client->contact_name }}</li>
                  <!-- <li class="package-prepared">by <a href="">Jake Feeley</a></li> -->
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- TOUR SEARCH -->
    </div>
    <!-- //.td-header-inner -->
  </header>
<!-- <div id="desktopView"> -->
  <main id="td-main" class="td-main">
    <div class="td-destination-detail">
      <div class="td-detail-tabs">
        <div class="td-detail-tab-navbar">
          <div class="container">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs">
              <li class="nav-item package-item">
                <a class="nav-link package-link" data-toggle="tab" href="#Welcome">Welcome</a>
              </li>
              <li class="nav-item package-item hidden-sm-down">
                <a class="nav-link package-link" data-toggle="tab" href="#Itinerary">Your Itinerary</a>
              </li>
              <li class="nav-item package-item hidden-sm-up">
                <a class="nav-link package-link" data-toggle="tab" href="#Itinerary">Itinerary</a>
              </li>
				@if ($package->status == 'open')
              <li class="nav-item package-item hidden-sm-down">
                <a class="nav-link package-link" data-toggle="tab" href="#TermsConditions">Booking Conditions</a>
              </li>
              <li class="nav-item package-item hidden-sm-up">
                <a class="nav-link package-link" data-toggle="tab" href="#TermsConditions">Conditions</a>
              </li>
				@else
	  @foreach (json_decode($package->event->welcome_pack)->welcomePack as $section)
              <li class="nav-item package-item">
                <a class="nav-link package-link" data-toggle="tab" href="#{{ str_replace(' ','',$section->title) }}">{{ $section->title }}</a>
              </li>
	  @endforeach
				@endif
            </ul>
          </div>
        </div>

        <!-- Tab panes -->
        <div class="tab-content">
          <!-- TAB: Welcome -->
          <div class="tab-pane @if ($package->status == 'open') active @endif" id="Welcome">
            <div class="td-detail-overview package-overview">
              <div class="container">
                <div class="row">
                  <div class="col-lg-9">
                    <h2>Welcome @if ($package->status == 'accepted')back @endif {{ $package->client->contact_name }},</h2>
                    <p>{!! $package->event->description !!}</p>
                  </div>
                  <div class="col-lg-3" id="approvalBox">
                    <aside class="td-sidebar">
                      <!-- Start Passengers -->
                      @if ($package->status == 'accepted')
                        @if (json_decode($package->passengers))
                          <article class="widget widget-inquire_now">
                            <h4 class="widget-title">Passengers</h4>
                          </article>
                          <div class="itinerary-box mg-b-20">
                              <table id="example2" class="table" cellspacing="0" role="grid" style="margin-bottom:0;">
                                <tbody>
                                  @foreach (json_decode($package->passengers)->passengers as $item)
                                  <tr>
                                    <td style="border-bottom: 1px solid #eceeef; border-top: none">{{ $item->firstName }} {{ $item->lastName }}</td>
                                  </tr>
                                  @endforeach
                                </tbody>
                              </table>
                              <button type="button" class="btn btn-primary btn-block" style="margin-top: 20px;" data-toggle="modal" data-target=".special-modal">
                                Special Requirements?
                              </button>
                              <div class="modal special-modal" tabindex="-1" role="dialog" aria-labelledby="special-modal" id="special-modal" data-lightbox="special-modal">
                                <div class="modal-dialog modal-md" role="document">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h4 class="modal-title">Submit Your Special / Dietary Requirements</h4>
                                    </div>
                                    <div class="container">
                                      <div class="row">
                                        <div class="col-md-12">
                                          <div class="special-from">
                                              <form method="POST" action="{{ route('portal.update', ['client' => $package->client_id, 'id' => $package->id]) }}">
                                                @csrf
                                                @method('PATCH')
                                                <div class="form-group">
                                                  <label>Special Requirements <i>*If applicable</i></label>
                                                  <textarea name="special_requirements" rows="5" class="form-control" style="min-height: 150px;">{{ $package->special_requirements }}</textarea>
                                                </div>
                                                <div class="form-group">
                                                  <label>Dietary Requirements <i>*If applicable</i></label>
                                                  <textarea name="dietary_requirements" rows="5" class="form-control" style="min-height: 150px;">{{ $package->dietary_requirements }}</textarea>
                                                </div>
                                              <input class="btn btn-primary" type="submit" value="Save">
                                            </form>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          @endif
                        @endif
                      <!-- End Passengers -->
                      <article class="widget widget-inquire_now">
                        <h4 class="widget-title">Your Overview</h4>
                        <div class="widget-body package-widget">
                          <table class="table">
                            <tr>
                              <td class="table-col-1 no-border-top" colspan="2">
                                <img src="/storage/{{ $package->event->logo }}" class="img-responsive event-logo" width="75px;"/>
                              </td>
                            </tr>
                            <tr>
                              <td class="table-col-1">Status</td>
                              <td class="table-col-2">{{ $package->status }}</td>
                            </tr>
                            <tr>
                              <td class="table-col-1">Issued</td>
                              <td class="table-col-2">{{ $package->created_at->format('d-m-y') }}</td>
                            </tr>
                            <tr>
                              <td class="table-col-1">Expires</td>
                              <td class="table-col-2">{{ $package->expiry_date }}</td>
                            </tr>
                            <!--<tr>
                              <td class="table-col-1">Passengers</td>
                              <td class="table-col-2">
                                <a href="#" id="passenger-tip" data-html="true" data-toggle="tooltip" data-placement="bottom" title="">
                                </a>
                              </td>
                            </tr> -->
                            <tr>
                              <td class="table-col-1">Price PP</td>
                              <td class="table-col-2">£{{ $package->price_per_person }}</span>
                              </td>
                            </tr>
                            <tr>
                              <td class="table-col-1">Total Price</td>
                              <td class="table-col-2">£{{ $package->total_price }}</span>
                              </td>
                            </tr>
                            @if ($package->status == 'accepted')
                            <!-- <tr>
                              <td class="table-col-1">Accepted by</td>
                              <td class="table-col-2"></td>
                            </tr>
                            <tr>
                              <td class="table-col-1">Accepted Date</td>
                              <td class="table-col-2"></td>
                            </tr> -->
					                  @endif
                          </table>
                          <button type="button" class="btn btn-primary btn-block btn-package-accept" data-toggle="modal" data-target=".bs-example-modal-md" @if ($package->status == 'accepted')disabled @endif>@if ($package->status == 'open')Accept Package @endif @if ($package->status == 'accepted')Accepted @endif</button>
                          <div class="modal bs-example-modal-md" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id="formModal">
                            <div class="modal-dialog modal-md" role="document">
                              <div class="modal-content accept-form">
                                <h3>Accept Your Itinerary</h3>
                                <p>By entering your name and submitting the form below, you hereby agree to {{ $package->company->name }}'s Terms & Conditions.</p>
                                <form class="material-form" method="POST" action="{{ route('portal.accept', ['client' => $package->client_id, 'id' => $package->id]) }}">
                                  @csrf
                                  @method('PATCH')
                      						  <input class="form-control" name="accepted_by" placeholder="Enter your full name" required>
                      						  <button class="btn btn-primary btn-block" type="submit">Approve</button>
                    					  </form>
                              </div>
                            </div>
                          </div>
                      </article>
                    </aside>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- TAB: Itinerary -->
            <div class="tab-pane @if ($package->status == 'accepted') active @endif" id="Itinerary">
              <div class="td-detail-overview package-overview">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-8">
                      <article class="widget widget-inquire_now">
                        <h4 class="widget-title">Itinerary: {{ $package->title }}</h4>
                      </article>
                      <!-- Package Items Loop Start -->
                      @if (json_decode($package->itinerary) && count(json_decode($package->itinerary)->itinerary) != 0 && json_decode($package->itinerary)->itinerary[0]->day)
                      @foreach (json_decode($package->itinerary)->itinerary as $item)
                      @if ($item->day)
                      <div class="itinerary-box mg-b-20">
                        <div class="package-info">
                          <div class="segments">
                            <div class="col-md-2 hidden-sm-down">
                              <span class="fa-stack fa-3x">
                                <i class="fa fa-calendar-o fa-stack-1x"></i>
                                <span class="fa-stack-1x calendar-text day-box">{{ Carbon\Carbon::parse($item->date)->day }}</span>
                              </span>
                              <span class="month package-month" style="padding-top:20px;"> {{ Carbon\Carbon::parse($item->date)->englishMonth }} {{ Carbon\Carbon::parse($item->date)->year }}</span>
                            </div>
                            <div class="col-md-10">
                              <p class="mobile-date" style="display:none;">{{ Carbon\Carbon::parse($item->date)->day }} {{ Carbon\Carbon::parse($item->date)->englishMonth }} {{ Carbon\Carbon::parse($item->date)->year }}</p>
                              <h3 class="itinerary-heading">Day {{ $item->day }} - {{ $item->name }}</h3>
                              <p class="no-mg">{{ $item->short_description }}</p>
                              <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#{{ $item->day }}">More Information</button>
                              <div id="{{ $item->day }}" class="collapse desc-box">
                                <p>{!! $item->long_description !!}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      @endif
                      @endforeach
                      @endif
                      <!-- Package Item End Loop -->
                    </div>
                    <div class="col-lg-4">
                      <!-- Start Passengers -->
                      @if (json_decode($package->flights) && count(json_decode($package->flights)->flights) != 0 && json_decode($package->flights)->flights[0]->departureTime && json_decode($package->flights)->flights[0]->date && json_decode($package->flights)->flights[0]->arrivalTime && json_decode($package->flights)->flights[0]->departureAirport && json_decode($package->flights)->flights[0]->arrivalAirport)
                        <article class="widget widget-inquire_now">
                          <h4 class="widget-title">Flights
                          <span class="widget-info">
                            <button type="button" class="btn btn-package-details" data-toggle="modal" data-target=".flights-modal">
                              View Full Details
                            </button>
                          </span>
                        </h4>
                        </article>
                        @foreach (json_decode($package->flights)->flights as $item)
                        @if ($item->departureTime && $item->date && $item->arrivalTime && $item->departureAirport && $item->arrivalAirport)
                          <div class="itinerary-box mg-b-20">
                            <div class="flight-info">
                              <div class="segments">
                                <div class="segment departure">
                                  <time>{{ $item->departureTime }}</time>
                                  <span class="airport">{{ Carbon\Carbon::parse($item->date)->format('d/m/y') }}</span></div>
                                <div class="divider adaptive">
                                  <br>
                                </div>
                                <div class="segment destination">
                                  <time>{{ $item->arrivalTime }}</time>
                                  <span class="airport">{{ Carbon\Carbon::parse($item->date)->format('d/m/y') }}</span></div>
                              </div>
                            </div>
                            <div class="flight-duration">
                              {{ $item->departureAirport }} <span class="arrow">></span> {{ $item->arrivalAirport }}
                            </div>
                          </div>
                          @endif
                        @endforeach
                      @endif

                      @if (json_decode($package->flights) && count(json_decode($package->flights)->flights) != 0)
                      <div class="modal flights-modal" tabindex="-1" role="dialog" aria-labelledby="flights" id="flightModal" data-lightbox="flights">
                        <button type="button" class="close closeModal" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="modal-dialog modal-lg" role="document">
                          <div class="modal-content" style="padding: 1rem 0rem; background:none;">
                            <div class="container-fluid">
                              <div class="row">
                                @foreach (json_decode($package->flights)->flights as $item)
                                <div class="col-md-6 mb-3">
                                  <div class="modalContent">
                                  <article class="widget widget-inquire_now" style="margin-bottom: 0px;">
                                    <h6 class="widget-title" style="font-size: 1rem;"> {{ $item->departureAirport }} <span class="arrow">></span> {{ $item->arrivalAirport }}</h6>
                                  </article>
                                  <table class="table">
                                    <tbody>
                                      <tr>
                                        <td class="table-col-1 no-border-top" colspan="2">
                                          @if( $item->airline == 'American Airlines' )
                                          <img src="https://sghsportingevents.com/storage/app/media/airlines/american-airlines-logo.png"	class="airline-logo">
                                          @elseif( $item->airline == 'Virgin Atlantic' )
                                          <img src="https://sghsportingevents.com/storage/app/media/airlines/virgin-atlantic-logo.png"	class="airline-logo">
                                          @elseif( $item->airline == 'Aer Lingus' )
                                          <img src="https://sghsportingevents.com/storage/app/media/airlines/aer-lingus-logo.png"	class="airline-logo">
                                          @elseif( $item->airline == 'British Airways' )
                                          <img src="https://sghsportingevents.com/storage/app/media/airlines/british_airways_logo.png"	class="airline-logo">
                                          @elseif( $item->airline == 'Delta' )
                                          <img src="https://sghsportingevents.com/storage/app/media/airlines/delta-airlines-logo.jpg"	class="airline-logo">
                                          @elseif( $item->airline == 'Finnair' )
                                          <img src="https://sghsportingevents.com/storage/app/media/airlines/finnair-logo.jpg"	class="airline-logo">
                                          @elseif( $item->airline == 'KLM' )
                                          <img src="https://sghsportingevents.com/storage/app/media/airlines/klm-logo.png"	class="airline-logo">
                                          @elseif( $item->airline == 'Ryanair' )
                                          <img src="https://sghsportingevents.com/storage/app/media/airlines/ryanair-logo.png"	class="airline-logo">
                                          @elseif( $item->airline == 'United' )
                                          <img src="https://sghsportingevents.com/storage/app/media/airlines/united-airlines-logo.png"	class="airline-logo">
                                          @endif
                                        </td>
                                      </tr>
                                      @if ($item->date)
                                      <tr>
                                        <td class="table-col-1">Date</td>
                                        <td class="table-col-" style="display: block; text-align: right;">{{ Carbon\Carbon::parse($item->date)->format('d/m/y') }}</td>
                                      </tr>
                                      @endif
                                      @if ($item->airline)
                                      <tr>
                                        <td class="table-col-1">Airline</td>
                                        <td class="table-col-" style="display: block; text-align: right;">{{ $item->airline }}</td>
                                      </tr>
                                      @endif
                                      <tr>
                                        @if ($item->number)
                                        <td class="table-col-1">Flight No</td>
                                        <td class="table-col-" style="display: block; text-align: right;">{{ $item->number }}</td>
                                        <!--<button id="flightdetails{{ $item->number }}">Console log flight details</button>
                                        <script>
                                            $("#flightdetails{{ $item->number }}").click(function(){
                                                $.ajax({url: "http://aviation-edge.com/v2/public/flights?key=e18cdb-b486c3&flightNum={{ $item->number }}", success: function(result){
                                                  $("#result{{ $item->number }}").html(result);
                                                }});
                                            });
                                        </script>
                                        <div id="result{{ $item->number }}"></div> -->
                                      </tr>
                                      @endif
                                      @if ($item->locator)
                                      <tr>
                                        <td class="table-col-1">Locator No</td>
                                        <td class="table-col-" style="display: block; text-align: right;">{{ $item->locator }}</td>
                                      </tr>
                                      @endif
                                      @if ($item->class)
                                      <tr>
                                        <td class="table-col-1">Class</td>
                                        <td class="table-col-" style="display: block; text-align: right;">{{ $item->class }}</td>
                                      </tr>
                                      @endif
                                    </tbody>
                                  </table>
                                  <article class="widget widget-inquire_now" style="margin-bottom: 0px;">
                                    <h6 class="widget-title" style="font-size: 1rem;"><span class="arrow">></span> {{ $item->departureAirport}}</h6>
                                  </article>
                                  <table class="table">
                                    <tbody>
                                      @if ($item->departureAirport)
                                      <tr>
                                        <td class="table-col-1 no-border-top">Departure Airport</td>
                                        <td class="table-col- no-border-top" style="display: block; text-align: right;">{{ $item->departureAirport }}</td>
                                      </tr>
                                      @endif
                                      @if ($item->departureTime)
                                      <tr>
                                        <td class="table-col-1">Departure Time</td>
                                        <td class="table-col-" style="display: block; text-align: right;">{{ $item->departureTime }}</td>
                                      </tr>
                                      @endif
                                    </tbody>
                                  </table>
                                  <article class="widget widget-inquire_now" style="margin-bottom: 0px;">
                                    <h6 class="widget-title" style="font-size: 1rem;"><span class="arrow">></span> {{ $item->arrivalAirport}}</h6>
                                  </article>
                                  <table class="table">
                                    <tbody>
                                      @if ($item->arrivalAirport)
                                      <tr>
                                        <td class="table-col-1 no-border-top">Arrival Airport</td>
                                        <td class="table-col- no-border-top" style="display: block; text-align: right;">{{ $item->arrivalAirport }}</td>
                                      </tr>
                                      @endif
                                      @if ($item->arrivalTime)
                                      <tr>
                                        <td class="table-col-1">Arrival Time</td>
                                        <td class="table-col-" style="display: block; text-align: right;">{{ $item->arrivalTime }}</td>
                                      </tr>
                                      @endif
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                                @endforeach
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      @endif
                      @if (json_decode($package->car_hire) && count(json_decode($package->car_hire)->carHire) != 0 && json_decode($package->car_hire)->carHire[0]->pickupTime && json_decode($package->car_hire)->carHire[0]->pickupDate && json_decode($package->car_hire)->carHire[0]->dropoffTime && json_decode($package->car_hire)->carHire[0]->dropoffDate && json_decode($package->car_hire)->carHire[0]->carType)
                      <article class="widget widget-inquire_now">
                        <h4 class="widget-title">Car Hire
                          <span class="widget-info">
                            <button type="button" class="btn btn-package-details" data-toggle="modal" data-target=".car-modal">
                              View Full Details
                            </button>
                          </span>
                        </h4>
                      </article>
                      @foreach (json_decode($package->car_hire)->carHire as $item)
                      @if ($item->pickupTime && $item->pickupDate && $item->dropoffTime && $item->dropoffDate && $item->carType)
                      <div class="itinerary-box mg-b-20">
                        <div class="flight-info">
                          <div class="segments">
                            <div class="segment departure"><span class="airport car-hire-details">Pick Up</span>
                              <time>{{ $item->pickupTime }}</time>
                              <span class="airport">{{ Carbon\Carbon::parse($item->pickupDate)->format('d/m/y') }}</span></div>
                            <div class="divider adaptive">
                              <br>
                            </div>
                            <div class="segment destination"><span class="airport car-hire-details">Drop Off</span>
                              <time>{{ $item->dropoffTime}}</time>
                              <span class="airport">{{ Carbon\Carbon::parse($item->dropoffDate)->format('d/m/y') }}</span></div>
                          </div>
                        </div>
                        <div class="flight-duration car-hire-type">{{ $item->carType }}</div>
                      </div>
                      @endif
                      @endforeach
                      @endif
                      <div class="modal car-modal" tabindex="-1" role="dialog" aria-labelledby="flights" id="carModal">
                        <button type="button" class="close closeModal" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="modal-dialog modal-md" role="document">
                          <div class="modal-content" style="padding: 1rem;">
                            <div class="container-fluid">
                              <div class="row">
								  @if (json_decode($package->car_hire))
                                @foreach (json_decode($package->car_hire)->carHire as $item)
                                <div class="col-md-12">
                                  <article class="widget widget-inquire_now" style="margin-bottom: 0px;">
                                    <h6 class="widget-title" style="font-size: 1rem;">Car Hire Details @if ($item->confirmationNumber) - {{ $item->confirmationNumber }} @endif</h6>
                                  </article>
                                  <table class="table">
                                    <tbody>
                                      <tr>
                                        <td class="table-col-1 no-border-top" colspan="2">
                                          @if( $item->provider == 'Alamo' )
                                            <img src="https://sghsportingevents.com/storage/app/media/carhire/alamo-logo.png" class="airline-logo">
                                          @elseif( $item->provider == 'Avis' )
                                          <img src="https://sghsportingevents.com/storage/app/media/carhire/avis-logo.png" class="airline-logo">
                                          @elseif( $item->provider == 'Budget' )
                                          <img src="https://sghsportingevents.com/storage/app/media/carhire/budget-logo.png" class="airline-logo">
                                          @elseif( $item->provider == 'Dollar' )
                                          <img src="https://sghsportingevents.com/storage/app/media/carhire/dollar-logo.png" class="airline-logo">
                                          @elseif( $item->provider == 'Enterprise' )
                                          <img src="https://sghsportingevents.com/storage/app/media/carhire/enterprise-logo.png" class="airline-logo">
                                          @elseif( $item->provider == 'Europcar' )
                                          <img src="https://sghsportingevents.com/storage/app/media/carhire/europcar-logo.png" class="airline-logo">
                                          @elseif( $item->provider == 'Hertz' )
                                          <img src="https://sghsportingevents.com/storage/app/media/carhire/hertz-logo.png" class="airline-logo">
                                          @elseif( $item->provider == 'Thrifty' )
                                          <img src="https://sghsportingevents.com/storage/app/media/carhire/thirfty-logo.png" class="airline-logo">
                                          @elseif( $item->provider == 'Iberia' )
                                          <img src="https://sghsportingevents.com/storage/app/media/airlines/iberia.jpeg" class="airline-logo">
                                          @endif
                                        </td>
                                      </tr>
                                      @if ($item->provider)
                                      <tr>
                                        <td class="table-col-1">Provider</td>
                                        <td class="table-col-" style="display: block; text-align: right;">{{ $item->provider }}</td>
                                      </tr>
                                      @endif
                                      @if ($item->carType)
                                      <tr>
                                        <td class="table-col-1">Car Type</td>
                                        <td class="table-col-" style="display: block; text-align: right;">{{ $item->carType }}</td>
                                      </tr>
                                      @endif
                                      @if ($item->confirmationNumber)
                                      <tr>
                                        <td class="table-col-1">Confirmation Number</td>
                                        <td class="table-col-" style="display: block; text-align: right;">{{ $item->confirmationNumber }}</td>
                                      </tr>
                                      @endif
                                    </tbody>
                                  </table>
                                  <article class="widget widget-inquire_now" style="margin-bottom: 0px;">
                                    <h6 class="widget-title" style="font-size: 1rem;">Pick Up Details</h6>
                                  </article>
                                  <table class="table">
                                    <tbody>
                                      @if ($item->pickupDate)
                                      <tr>
                                        <td class="table-col-1 no-border-top">Pick Up Date</td>
                                        <td class="table-col- no-border-top" style="display: block; text-align: right;">{{ Carbon\Carbon::parse($item->pickupDate)->format('d/m/y') }}</td>
                                      </tr>
                                      @endif
                                      @if ($item->pickupTime)
                                      <tr>
                                        <td class="table-col-1">Pick Up Time</td>
                                        <td class="table-col-" style="display: block; text-align: right;">{{ $item->pickupTime }}</td>
                                      </tr>
                                      @endif
                                      @if ($item->pickupLocation)
                                      <tr>
                                        <td class="table-col-1">Rental Desk Location</td>
                                        <td class="table-col-" style="display: block; text-align: right;">{{ $item->pickupLocation }}</td>
                                      </tr>
                                      @endif
                                    </tbody>
                                  </table>
                                  <article class="widget widget-inquire_now" style="margin-bottom: 0px;">
                                    <h6 class="widget-title" style="font-size: 1rem;">Drop Off Details</h6>
                                  </article>
                                  <table class="table">
                                    <tbody>
                                      @if ($item->dropoffDate)
                                      <tr>
                                        <td class="table-col-1">Drop Off Date</td>
                                        <td class="table-col-" style="display: block; text-align: right;">{{ Carbon\Carbon::parse($item->dropoffDate)->format('d/m/y') }}</td>
                                      </tr>
                                      @endif
                                      @if ($item->dropoffTime)
                                      <tr>
                                        <td class="table-col-1">Drop Off Time</td>
                                        <td class="table-col-" style="display: block; text-align: right;">{{ $item->dropoffTime }}</td>
                                      </tr>
                                      @endif
                                      @if ($item->dropoffLocation)
                                      <tr>
                                        <td class="table-col-1">Rental Desk Location</td>
                                        <td class="table-col-" style="display: block; text-align: right;">{{ $item->dropoffLocation }}</td>
                                      </tr>
                                      @endif
                                    </tbody>
                                  </table>
                                  @if ($item->whats_included)
                                  <article class="widget widget-inquire_now" style="margin-bottom: 0px;">
                                    <h6 class="widget-title" style="font-size: 1rem;">Whats Included?</h6>
                                  </article>
                                  <table class="table">
                                    <tbody>
                                      <tr>
                                        <td colspan="2">
                                          {!! $item->whats_included !!}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  @endif
                                </div>
                                @endforeach
								  @endif
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      @if (json_decode($package->transfers) && count(json_decode($package->transfers)->transfers) != 0)
                        <article class="widget widget-inquire_now car-hire">
                          <h4 class="widget-title">Transfers<span class="widget-info"></span></h4>
                        </article>
                        @foreach (json_decode($package->transfers)->transfers as $item)
                          <div class="itinerary-box mg-b-20">
                            <div class="package-info">
                              <div class="segments">
                                <p class="no-mg">{{ $item->short_description }}</p>
                              </div>
                            </div>
                          </div>
                        @endforeach
                      @endif
                      @if (sizeof($package->notes))
                      <article class="widget widget-inquire_now car-hire">
                        <h4 class="widget-title">Notes</h4>
                      </article>
                      <div class="itinerary-box mg-b-20">
                        <div class="package-info">
                          <div class="segments" id="notes">
                            <p class="small-mg">
                              @foreach ($package->notes as $note)
                              {!! $note->content !!}
                              <hr>
                              @endforeach
                            </p>
                          </div>
                        </div>
                      </div>
                      @endif
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- TAB: Extras -->
            <div class="tab-pane" id="TermsConditions">
              <div class="td-detail-overview package-overview">
                <div class="container">
                  <div class="">
                    <div class="row">
                      <div class="col-lg-12">
                          {!! $package->event->booking_conditions !!}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            @if (json_decode($package->event->welcome_pack))
	  @foreach (json_decode($package->event->welcome_pack)->welcomePack as $section)
            <!-- TAB: {{ $section->title }} -->
            <div class="tab-pane" id="{{ str_replace(' ','',$section->title) }}">
              <div class="td-detail-overview package-overview">
                <div class="container">
                  <div class="">
                    <div class="row">
                      <div class="col-lg-12">
                          {!! $section->content !!}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
	  @endforeach
    @endif
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
  <form id="portal-form" action="https://itinify.io/portal" method="POST" style="display: none;">@csrf<input type="hidden" name="email" value="{{ $package->client->email }}"><input type="hidden" name="client_id" value="{{ $package->client->id }}"></form>
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
    <script>
    {{ $package->company->tracking_code }}
    </script>
  </main>
<!-- </div> -->
</div>
<!-- End Desktop -->
<!-- Start Mobile
<div id="mobileView">
  <div class="wrapper" id="packageView">
    <div class="row">
      @if (json_decode($package->event->welcome_pack))
        @foreach (json_decode($package->event->welcome_pack)->welcomePack as $section)
          <div class="col-xs-6">
            <a class="nav-link package-link" data-toggle="tab" href="#{{ str_replace(' ','',$section->title) }}">{{ $section->title }}</a>
          </div>
        @endforeach
      @endif
    </div>
  </div>
</div> -->
</body>