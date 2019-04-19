<!DOCTYPE html>
<html lang="en">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>{{ $package->title }} - {{ $package->client->name }} - Itinify</title>

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
          <img src="{{ $package->company->logo }}" class="logo logo-display" alt="">
          <img src="{{ $package->company->logo }}" class="logo logo-scrolled" alt="">
        </a>
      </div>
      <div class="collapse navbar-collapse" id="navbar-menu">
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown dash-link">
            <a href="javascript:void()" class="dropdown-toggle">Hi, Name</a>
            <ul class="dropdown-menu left-nav">
              <li><a href="">All Packages</a></li>
              <li><a href="">Contact Us</a></li>
              <li class="sign-up">
                <a class="btn-signup red-btn" href="javascript:void(0)" data-toggle="modal" data-target="#accept">Accept Proposal</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <section class="page-title-banner" style="background-image:url('{{ $package->event->banner }}');">
    <div class="container">
      <div class="row">
        <div class="tr-list-detail">
          <div class="tr-list-info">
            <h4>{{ $package->title }}</h4>
            <p><strong>Prepared for:</strong> {{ $package->client->name }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="profile-header-nav padd-0 bb-1 hidden-xs hidden-sm" data-spy="affix" data-offset-top="205">
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <div class="tab" role="tabpanel">
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="active"><a href="#Overview" aria-controls="home" role="tab" data-toggle="tab">Welcome</a></li>
              <li role="presentation"><a href="#About" aria-controls="profile" role="tab" data-toggle="tab">About</a></li>
              <li role="presentation"><a href="#Event" aria-controls="profile" role="tab" data-toggle="tab">The Event</a></li>
              <li role="presentation"><a href="#Itinerary" aria-controls="profile" role="tab" data-toggle="tab">Itinerary</a></li>
              <li role="presentation"><a href="#Terms" aria-controls="messages" role="tab" data-toggle="tab">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="tr-single-detail gray-bg">
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <div class="tab-content tabs">
            <div role="tabpanel" class="tab-pane fade in active" id="Overview">
              <div class="row">
                <div class="col-md-9">
                  <div class="tr-single-box">
                    <div class="tr-single-body">
                        {{ $package->event->description }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="tr-single-box">
                <div class="tr-single-header">
                  <div class="tr-single-time">
                    <h4>{{ $package->event->name }}</h4>
                  </div>
                </div>
                <div class="tr-single-body">
                  <table class="table">
                    <tbody>
                      <tr>
                        <td colspan="2"><img src="{{ $package->event->logo }}" class="img-responsive event-img" /></td>
                      </tr>
                      <tr>
                        <td class="event-info-label">Status</td>
                        <td>{{ $package->status }}</td>
                      </tr>
                      <tr>
                        <td class="event-info-label">Issued</td>
                        <td>{{ $package->issued }}</td>
                      </tr>
                      <tr>
                        <td class="event-info-label">Expires</td>
                        <td>{{ $package->expires }}</td>
                      </tr>
                      <tr>
                        <td class="event-info-label">Price PP</td>
                        <td>{{ $package->pricing->person }}</td>
                      </tr>
                      <tr>
                        <td class="event-info-label">Total Price</td>
                        <td>{{ $package->pricing->total }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <a class="btn btn-primary btn-block btn-accept" href="javascript:void(0)" data-toggle="modal" data-target="#accept">Accept Proposal</a>
              </div>
            </div>
          </div>
        </div>

        <div role="tabpanel" class="tab-pane fade in" id="About">
          <div class="row">
            <div class="col-md-9">
              <div class="tr-single-box">
                <div class="tr-single-body">
                  <h3>About {{ $package->client->name }}</h3>
                  <p></p>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="tr-single-box">
                <div class="tr-single-body testimonials">

                </div>
              </div>
            </div>
          </div>
        </div>

        <div role="tabpanel" class="tab-pane fade in" id="Event">
          <div class="row">
            <div class="tr-single-box">
              <div class="tr-single-body">
                <h3>About {{ $package->event->name }}</h3>
                <p></p>
              </div>
            </div>
          </div>
        </div>

        <div role="tabpanel" class="tab-pane fade in" id="Itinerary">
          <div class="row mb-3">
            <div class="col-md-9">
              <h2>Your Itinerary <span class="status"><p>STATUS</p><br><span class="label label-itinerary">{{ $package->status}}</span></span></h2>
            </div>
          </div>
          <div class="row">
            <div class="col-md-9">
              <div class="tr-single-day">
                <p><strong>Monday, 14/02/20</strong></p>
                <div class="tr-single-box">
                  <div class="tr-single-header">
                    <div class="tr-single-time">
                      <h4><i class="ti-time"></i>09:00</h4>
                    </div>
                    <h3 class="tr-single-activity">Activity Title</h3>
                    <a href="javascript:void();" class="pull-right" data-toggle="collapse" data-target="#moreInfo"><i class="ti-info-alt pull-right"></i></a>
                  </div>
                  <div class="tr-single-body itinerary-short-desc">
                    <p>Arrive for 6 nights bed and breakfast accommodation on a twin share basis at the Downtown Hyatt Hotel, Columbia.</p>
                    <div id="moreInfo" class="collapse">
                      <hr class="tr-item-divider">
                      <img src="https://sghsportingevents.com/storage/app/media/hyatt-logos/hyatt-place-logo.png" class="img-responsive" width="100px" />
                      <br>
                      <p><strong>Address:</strong>The Hyatt Place, The Vista, 819 Gervais St, Columbia, SC 29201, USA.</p>
                      <br>
                      <p>The hotel is downtown in the Capital City, located in the heart of Columbia's premier arts and entertainment district. Within minutes of our hotel you will encounter numerous food, art, and entertainment activities in this district,
                        a hub of activity in downtown Columbia.</p>
                    </div>
                  </div>
                </div>
                <div class="tr-single-box">
                  <div class="tr-single-header">
                    <div class="tr-single-time">
                      <h4><i class="ti-time"></i>12:00</h4>
                    </div>
                    <h3 class="tr-single-activity">Activity Title</h3>
                    <i class="ti-info-alt pull-right"></i>
                  </div>
                  <div class="tr-single-body itinerary-short-desc">
                    <p>Arrive for 6 nights bed and breakfast accommodation on a twin share basis at the Downtown Hyatt Hotel, Columbia.</p>
                  </div>
                </div>
              </div>
              <div class="tr-single-day">
                <p><strong>Tuesday, 15/02/20</strong></p>
                <div class="tr-single-box">
                  <div class="tr-single-header">
                    <div class="tr-single-time">
                      <h4><i class="ti-time"></i>09:00</h4>
                    </div>
                    <h3 class="tr-single-activity">Activity Title</h3>
                    <i class="ti-info-alt pull-right"></i>
                  </div>
                  <div class="tr-single-body itinerary-short-desc">
                    <p>Arrive for 6 nights bed and breakfast accommodation on a twin share basis at the Downtown Hyatt Hotel, Columbia.</p>
                  </div>
                </div>
                <div class="tr-single-box">
                  <div class="tr-single-header">
                    <div class="tr-single-time">
                      <h4><i class="ti-time"></i>12:00</h4>
                    </div>
                    <h3 class="tr-single-activity">Activity Title</h3>
                    <i class="ti-info-alt pull-right"></i>
                  </div>
                  <div class="tr-single-body itinerary-short-desc">
                    <p>Arrive for 6 nights bed and breakfast accommodation on a twin share basis at the Downtown Hyatt Hotel, Columbia.</p>
                  </div>
                </div>
              </div>
              <div class="tr-single-day">
                <p><strong>Wednesday, 16/02/20</strong></p>
                <div class="tr-single-box">
                  <div class="tr-single-header">
                    <div class="tr-single-time">
                      <h4><i class="ti-time"></i>09:00</h4>
                    </div>
                    <h3 class="tr-single-activity">Activity Title</h3>
                    <i class="ti-info-alt pull-right"></i>
                  </div>
                  <div class="tr-single-body itinerary-short-desc">
                    <p>Arrive for 6 nights bed and breakfast accommodation on a twin share basis at the Downtown Hyatt Hotel, Columbia.</p>
                  </div>
                </div>
                <div class="tr-single-box">
                  <div class="tr-single-header">
                    <div class="tr-single-time">
                      <h4><i class="ti-time"></i>12:00</h4>
                    </div>
                    <h3 class="tr-single-activity">Activity Title</h3>
                    <i class="ti-info-alt pull-right"></i>
                  </div>
                  <div class="tr-single-body itinerary-short-desc">
                    <p>Arrive for 6 nights bed and breakfast accommodation on a twin share basis at the Downtown Hyatt Hotel, Columbia.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="tr-single-day">
                <p><strong>.</strong></p>
                <div class="tr-single-box" id="Passengers">
                  <div class="tr-single-header">
                    <div class="tr-single-time alt">
                      <h4><i class="ti-user"></i>Passengers</h4>
                    </div>
                  </div>
                  <div class="tr-single-body">
                    <table class="table">
                      <tbody>
                        <tr>
                          <td><i class="ti-user"></i></td>
                          <td>John Doe</td>
                        </tr>
                        <tr>
                          <td><i class="ti-user"></i></td>
                          <td>Jane Doe</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="tr-single-box" id="whatsIncluded">
                  <div class="tr-single-header">
                    <div class="tr-single-time alt">
                      <h4><i class="ti-plus"></i>Whats Included?</h4>
                    </div>
                  </div>
                  <div class="tr-single-body">
                    <table class="table">
                      <tbody>
                        <tr>
                          <td><i class="ti-check-box"></i></td>
                          <td><a href="javascript:void(0)" data-toggle="modal" data-target="#flightModal">Flights</a></td>
                        </tr>
                        <tr>
                          <td><i class="ti-check-box"></i></td>
                          <td><a href="javascript:void(0)" data-toggle="modal" data-target="#carModal">Car hire</a></td>
                        </tr>
                        <tr>
                          <td><i class="ti-check-box"></i></td>
                          <td><a href="javascript:void(0)" data-toggle="modal" data-target="#transferModal">Transfers</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="tr-single-box" id="whatsIncluded">
                  <div class="tr-single-header">
                    <div class="tr-single-time alt">
                      <h4><i class="ti-envelope"></i>Documents</h4>
                    </div>
                  </div>
                  <div class="tr-single-body">
                    <table class="table">
                      <tbody>
                        <tr>
                          <td>Car Hire Voucher</a>
                          </td>
                        </tr>
                        <tr>
                          <td>Parking Permit</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="tr-single-box" id="whatsIncluded">
                  <div class="tr-single-header">
                    <div class="tr-single-time alt">
                      <h4><i class="ti-info-alt"></i>Special Requirements</h4>
                    </div>
                  </div>
                  <div class="tr-single-body">
                    <p>If you require special dietary or travel requirements, please let us know</p>
                    <a href="javascript:void(0)" class="btn btn-primary btn-block" data-toggle="modal" data-target="#specialRequirementsModal">
                          Submit details
                        </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div role="tabpanel" class="tab-pane fade in" id="Terms">
          <div class="row">
            <div class="tr-single-box">
              <div class="tr-single-body">
                <h3>Our Terms & Conditions</h3>
                <p></p>
              </div>
            </div>
          </div>
        </div>

        <div role="tabpanel" class="tab-pane fade in" id="">
          <div class="tr-single-box">
            <div class="tr-single-header">
              <h4><i class="ti-write"></i>All Review</h4>
            </div>
            <div class="tr-single-body">
              <div class="review-box">
                <div class="review-thumb">
                  <img src="assets/img/user-1.jpg.png" class="img-responsive img-circle" alt="" />
                </div>
                <div class="review-box-content">
                  <div class="reviewer-rate">
                    <p><i class="fa fa-star cl-warning"></i>4.7/<span>5</span></p>
                  </div>
                  <div class="review-user-info">
                    <h4>Daniel Dicoss</h4>
                    <p>Et Harum Quidem Rerum Facilis Est Et Expedita Distinctio. Nam Libero Tempore, Cum Soluta Nobis Est Eligendi Optio Cumque Nihil Impedit Quo Minus Id Quod Maxime Placeat Facere Possimus</p>
                  </div>
                  <div class="review-lc text-right">
                    <a href="tour-detail.html#"><i class="ti-heart"></i>87</a>
                    <a href="tour-detail.html#"><i class="ti-comment"></i>52</a>
                  </div>
                </div>
              </div>
              <div class="review-box">
                <div class="review-thumb">
                  <img src="assets/img/user-2.jpg" class="img-responsive img-circle" alt="" />
                </div>
                <div class="review-box-content">
                  <div class="reviewer-rate">
                    <p><i class="fa fa-star cl-warning"></i>4.4/<span>5</span></p>
                  </div>
                  <div class="review-user-info">
                    <h4>Archita Singh</h4>
                    <p>Et Harum Quidem Rerum Facilis Est Et Expedita Distinctio. Nam Libero Tempore, Cum Soluta Nobis Est Eligendi Optio Cumque Nihil Impedit Quo Minus Id Quod Maxime Placeat Facere Possimus</p>
                  </div>
                  <div class="review-lc text-right">
                    <a href="tour-detail.html#"><i class="ti-heart"></i>65</a>
                    <a href="tour-detail.html#"><i class="ti-comment"></i>78</a>
                  </div>
                </div>
              </div>
              <div class="review-box">
                <div class="review-thumb">
                  <img src="assets/img/user-3.jpg" class="img-responsive img-circle" alt="" />
                </div>
                <div class="review-box-content">
                  <div class="reviewer-rate">
                    <p><i class="fa fa-star cl-warning"></i>5.0/<span>5</span></p>
                  </div>
                  <div class="review-user-info">
                    <h4>Devesh Patri</h4>
                    <p>Et Harum Quidem Rerum Facilis Est Et Expedita Distinctio. Nam Libero Tempore, Cum Soluta Nobis Est Eligendi Optio Cumque Nihil Impedit Quo Minus Id Quod Maxime Placeat Facere Possimus</p>
                  </div>
                  <div class="review-lc text-right">
                    <a href="tour-detail.html#"><i class="ti-heart"></i>110</a>
                    <a href="tour-detail.html#"><i class="ti-comment"></i>47</a>
                  </div>
                </div>
              </div>
              <div class="review-box">
                <div class="review-thumb">
                  <img src="assets/img/user-4.jpg" class="img-responsive img-circle" alt="" />
                </div>
                <div class="review-box-content">
                  <div class="reviewer-rate">
                    <p><i class="fa fa-star cl-warning"></i>4.9/<span>5</span></p>
                  </div>
                  <div class="review-user-info">
                    <h4>Ruchi Sethi</h4>
                    <p>Et Harum Quidem Rerum Facilis Est Et Expedita Distinctio. Nam Libero Tempore, Cum Soluta Nobis Est Eligendi Optio Cumque Nihil Impedit Quo Minus Id Quod Maxime Placeat Facere Possimus</p>
                  </div>
                  <div class="review-lc text-right">
                    <a href="tour-detail.html#"><i class="ti-heart"></i>120</a>
                    <a href="tour-detail.html#"><i class="ti-comment"></i>36</a>
                  </div>
                </div>
              </div>
              <div class="review-box">
                <div class="review-thumb">
                  <img src="assets/img/user-5.jpg" class="img-responsive img-circle" alt="" />
                </div>
                <div class="review-box-content">
                  <div class="reviewer-rate">
                    <p><i class="fa fa-star cl-warning"></i>4.8/<span>5</span></p>
                  </div>
                  <div class="review-user-info">
                    <h4>Duke Divalkis</h4>
                    <p>Et Harum Quidem Rerum Facilis Est Et Expedita Distinctio. Nam Libero Tempore, Cum Soluta Nobis Est Eligendi Optio Cumque Nihil Impedit Quo Minus Id Quod Maxime Placeat Facere Possimus</p>
                  </div>
                  <div class="review-lc text-right">
                    <a href="tour-detail.html#"><i class="ti-heart"></i>80</a>
                    <a href="tour-detail.html#"><i class="ti-comment"></i>70</a>
                  </div>
                </div>
              </div>
              <div class="review-box">
                <div class="review-thumb">
                  <img src="assets/img/user-6.jpg" class="img-responsive img-circle" alt="" />
                </div>
                <div class="review-box-content">
                  <div class="reviewer-rate">
                    <p><i class="fa fa-star cl-warning"></i>4.7/<span>5</span></p>
                  </div>
                  <div class="review-user-info">
                    <h4>Shilka Rai</h4>
                    <p>Et Harum Quidem Rerum Facilis Est Et Expedita Distinctio. Nam Libero Tempore, Cum Soluta Nobis Est Eligendi Optio Cumque Nihil Impedit Quo Minus Id Quod Maxime Placeat Facere Possimus</p>
                  </div>
                  <div class="review-lc text-right">
                    <a href="tour-detail.html#"><i class="ti-heart"></i>120</a>
                    <a href="tour-detail.html#"><i class="ti-comment"></i>140</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
          Cookridge Hall Health & Fitness, Leeds, LS16 7NL
        </div>
      </div>
      <div class="col-md-3 col-sm-3 br-1 mbb-1">
        <div class="data-flex text-center">
          <span class="d-block mrg-bot-0">0800 170 7077</span>
          <a href="mailto:enquiries@sgh.events" class="theme-cl"><strong>enquiries@sgh.events</strong></a>
        </div>
      </div>
      <div class="col-md-4 col-sm-4 padd-0">
        <div class="data-flex padd-0">
          <ul class="social-share">
            <li><a href=""><i class="fa fa-facebook theme-cl"></i></a></li>
            <li><a href=""><i class="fa fa-google-plus theme-cl"></i></a></li>
            <li><a href=""><i class="fa fa-twitter theme-cl"></i></a></li>
            <li><a href=""><i class="fa fa-linkedin theme-cl"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Accept Proposal Modal -->
  <div class="modal fade" id="accept" tabindex="-1" role="dialog" aria-labelledby="accept" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <form>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Enter Your Full Name">
            </div>
            <div class="form-group">
              <div class="checkbox">
                <label>
                  <input type="checkbox" required> By ticking this box, you are hereby agreeing to and accepting <strong>SGH Sporting Events</strong> terms and conditions.
                </label>
              </div>
            </div>
            <div class="form-group text-center last">
              <button type="button" class="btn theme-btn full-width btn-m">Accept Proposal </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- End Accept Proposal Modal -->

  <!-- Accept Proposal Modal -->
  <div class="modal fade" id="specialRequirementsModal" tabindex="-1" role="dialog" aria-labelledby="specialRequirementsModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <p>Please use the form below to specify your requirements.</p>
          <form>
            <div class="form-group">
              <select class="form-control wide">
                <option selected disabled>Select Passenger</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Doe">Jane Doe</option>
              </select>
            </div>
            <div class="form-group">
              <textarea class="form-control wide" rows="5" placeholder="Enter your requirement"></textarea>
            </div>
            <div class="form-group text-center last">
              <button type="button" class="btn theme-btn full-width btn-m">Submit Request</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- End Accept Proposal Modal -->

  <!-- Flights Modal -->
  <div class="modal fade" id="flightModal" tabindex="-1" role="dialog" aria-labelledby="flightModal" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <div class="border bg-white filght-content">
                <div class="row">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-3">
                        <div class="airline-detail">
                          <img src="https://lh3.googleusercontent.com/LwhyfAgJeoXZp_nYMZWiBEyqWgu7issV9y8t0RQkj2Cy0vmQ8B9BjHXZgc-ved_oXdM" alt="" width="60px">
                          <div class="flight-no">
                            <div>British Airways</div>
                            <span>BA117</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="flight-time">
                          <div class="flight-depart">
                            <h4>9:35</h4>
                            <span>LHE</span>
                          </div>
                          <div class="trip-map">
                            <h5>3h 30m</h5>
                            <div class="img-line">
                              <div class="line"></div>
                            </div>
                          </div>
                          <div class="flight-arrival">
                            <h4>12:35</h4>
                            <span>DXB</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="flight-details">
                          <a class="btn btn-primary" role="button" data-toggle="collapse" href="#flight1" aria-expanded="false" aria-controls="collapseExample">More Details</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="collapse border" id="flight1">
                <div class="total-duration">
                  <div>
                    <span class="arrow-bg"><i class="fa fa-arrow-right"></i></span>
                    <strong>Flight on Friday 30 November 2018 from Lahore to Dubai</strong>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4 col-sm-12 col-xs-12">
                    <div class="flight border-left">
                      <div class="aircraft">
                        <h3>API <a href="#" data-toggle="tooltip" title="You need to fill in your Advanced Passenger Information in before you travel."><i class="ti-info-alt info-tip"></i></a></h3>
                        <table class="table">
                          <tbody>
                            <tr>
                              <td><strong>Locator</strong></td>
                              <td>TJSHDG</td>
                            </tr>
                            <tr>
                              <td><strong>Class</strong></td>
                              <td>Economy</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12 col-xs-12">
                    <div class="flight">
                      <div class="aircraft">
                        <h3>Departure</h3>
                        <table class="table">
                          <tbody>
                            <tr>
                              <td><strong> Departure Date</strong></td>
                              <td>10/02/19</td>
                            </tr>
                            <tr>
                              <td><strong>Departure Time</strong></td>
                              <td>19:21</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12 col-xs-12">
                    <div class="flight">
                      <div class="aircraft">
                        <h3>Arrival</h3>
                        <table class="table">
                          <tbody>
                            <tr>
                              <td><strong> Arrival Date</strong></td>
                              <td>10/02/19</td>
                            </tr>
                            <tr>
                              <td><strong>Arrival Time</strong></td>
                              <td>19:21</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="bottom-line">
              </div>
            </div>
          </div>
          <!-- End Flight 1 -->
          <hr>
          <div class="row">
            <div class="col-md-12">
              <div class="border bg-white filght-content">
                <div class="row">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-3">
                        <div class="airline-detail">
                          <img src="https://lh3.googleusercontent.com/LwhyfAgJeoXZp_nYMZWiBEyqWgu7issV9y8t0RQkj2Cy0vmQ8B9BjHXZgc-ved_oXdM" alt="" width="60px">
                          <div class="flight-no">
                            <div>Avis</div>
                            <span>BA117</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="flight-time">
                          <div class="flight-depart">
                            <h4>9:35</h4>
                            <span>LHE</span>
                          </div>
                          <div class="trip-map">
                            <h5>3h 30m</h5>
                            <div class="img-line">
                              <div class="line"></div>
                            </div>
                          </div>
                          <div class="flight-arrival">
                            <h4>12:35</h4>
                            <span>DXB</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="flight-details">
                          <a class="btn btn-primary" role="button" data-toggle="collapse" href="#flight2" aria-expanded="false" aria-controls="collapseExample">More Details</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="collapse border" id="flight2">
                <div class="total-duration">
                  <div>
                    <span class="arrow-bg"><i class="fa fa-arrow-right"></i></span>
                    <strong>Flight on Friday 30 November 2018 from Lahore to Dubai</strong>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4 col-sm-12 col-xs-12">
                    <div class="flight border-left">
                      <div class="aircraft">
                        <h3>API <a href="#" data-toggle="tooltip" title="You need to fill in your Advanced Passenger Information in before you travel."><i class="ti-info-alt info-tip"></i></a></h3>
                        <table class="table">
                          <tbody>
                            <tr>
                              <td><strong>Locator</strong></td>
                              <td>TJSHDG</td>
                            </tr>
                            <tr>
                              <td><strong>Class</strong></td>
                              <td>Economy</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12 col-xs-12">
                    <div class="flight">
                      <div class="aircraft">
                        <h3>Departure</h3>
                        <table class="table">
                          <tbody>
                            <tr>
                              <td><strong> Departure Date</strong></td>
                              <td>10/02/19</td>
                            </tr>
                            <tr>
                              <td><strong>Departure Time</strong></td>
                              <td>19:21</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12 col-xs-12">
                    <div class="flight">
                      <div class="aircraft">
                        <h3>Arrival</h3>
                        <table class="table">
                          <tbody>
                            <tr>
                              <td><strong> Arrival Date</strong></td>
                              <td>10/02/19</td>
                            </tr>
                            <tr>
                              <td><strong>Arrival Time</strong></td>
                              <td>19:21</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="bottom-line">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Flights Modal -->

  <!-- Car Hire Modal -->
  <div class="modal fade" id="carModal" tabindex="-1" role="dialog" aria-labelledby="carModal" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <div class="border bg-white filght-content" id="carModalContent">
                <div class="row">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-3">
                        <div class="airline-detail">
                          <img src="https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/9e/7a/bb/9e7abbc9-a08f-29a8-fac5-84f305c9f17f/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-10.png/246x0w.jpg" alt="" width="60px">
                          <div class="flight-no">
                            <div>Confirmation:</div>
                            <span>1234567890</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="flight-time">
                          <div class="flight-depart">
                            <h4>9:35</h4>
                            <span>Pick Up</span>
                          </div>
                          <div class="trip-map">
                            <h5></h5>
                            <div class="img-line">
                              <div class="line"></div>
                            </div>
                          </div>
                          <div class="flight-arrival">
                            <h4>12:35</h4>
                            <span>Drop Off</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="flight-details">
                          <a class="btn btn-primary" role="button" data-toggle="collapse" href="#car1" aria-expanded="false" aria-controls="collapseExample">More Details</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="collapse border" id="car1">
                <div class="total-duration">
                  <div>
                    <span class="arrow-bg"><i class="fa fa-arrow-right"></i></span>
                    <strong>Pick up on Friday 30 November 2018 from Lahore</strong>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4 col-sm-12 col-xs-12">
                    <div class="flight border-left">
                      <div class="aircraft">
                        <h3>Car Details</h3>
                        <table class="table">
                          <tbody>
                            <tr>
                              <td><strong>Lead Driver</strong></td>
                              <td>John Doe<a href="javascript:void()" class="pull-right" data-toggle="tooltip" title="Please contact us if you need to change your lead driver."><i class="ti-info-alt info-tip car-tip"></i></a></td>
                            </tr>
                            <tr>
                              <td><strong>Car Type</strong></td>
                              <td>Economy</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12 col-xs-12">
                    <div class="flight">
                      <div class="aircraft">
                        <h3>Pick Up</h3>
                        <table class="table">
                          <tbody>
                            <tr>
                              <td><strong>Date</strong></td>
                              <td>10/02/19</td>
                            </tr>
                            <tr>
                              <td><strong>Location</strong></td>
                              <td>In Terminal</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12 col-xs-12">
                    <div class="flight">
                      <div class="aircraft">
                        <h3>Drop Off</h3>
                        <table class="table">
                          <tbody>
                            <tr>
                              <td><strong>Date</strong></td>
                              <td>10/02/19</td>
                            </tr>
                            <tr>
                              <td><strong>Location</strong></td>
                              <td>In Terminal</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="bottom-line car">
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="flight border-left">
                      <div class="aircraft">
                        <h3>Whats Included?</h3>
                        <p>Collision Damage Waiver (CDW)</p>
                        <p>Third-Party Liability (TPL)</p>
                        <p>Theft Protection (TP)</p>
                        <p>Supplemental Liability Insurance (SLI)</p>
                        <p>Airport Surcharge</p>
                        <p>Local Taxes</p>
                        <p>Vehicle Registration Fee</p>
                        <p>Your rental includes unlimited free kilometres.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="bottom-line car">
              </div>
            </div>
          </div>
          <!-- End Flight 1 -->
        </div>
      </div>
    </div>
  </div>
  <!-- End Car Hire Modal -->

  <!-- Transfer Modal -->
  <div class="modal fade" id="transferModal" tabindex="-1" role="dialog" aria-labelledby="transferModal" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <div class="border bg-white filght-content" id="transferModalContent">
                <div class="row">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-3">
                        <div class="airline-detail">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMf815jTphaslDBUne_15HGGiLjCzjP0P8ECXu8fbfwAp_h6jx" alt="" width="60px">
                          <div class="flight-no">
                            <div><strong>Type:</strong></div>
                            <span>Coach</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="flight-time">
                          <div class="flight-depart">
                            <h4>9:35</h4>
                            <span>Departing</span>
                          </div>
                          <div class="trip-map">
                            <h5></h5>
                            <div class="img-line">
                              <div class="line"></div>
                            </div>
                          </div>
                          <div class="flight-arrival">
                            <h4>12:35</h4>
                            <span>Returning</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="flight-details">
                          <a class="btn btn-primary" role="button" data-toggle="collapse" href="#transfer1" aria-expanded="false" aria-controls="collapseExample">More Details</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="collapse border" id="transfer1">
                <div class="total-duration">
                  <div>
                    <span class="arrow-bg"><i class="fa fa-arrow-right"></i></span>
                    <strong>Flight on Friday 30 November 2018 from Lahore to Dubai</strong>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4 col-sm-12 col-xs-12">
                    <div class="flight border-left">
                      <div class="aircraft">
                        <h3>API <a href="#" data-toggle="tooltip" title="You need to fill in your Advanced Passenger Information in before you travel."><i class="ti-info-alt info-tip"></i></a></h3>
                        <table class="table">
                          <tbody>
                            <tr>
                              <td><strong>Locator</strong></td>
                              <td>TJSHDG</td>
                            </tr>
                            <tr>
                              <td><strong>Class</strong></td>
                              <td>Economy</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12 col-xs-12">
                    <div class="flight">
                      <div class="aircraft">
                        <h3>Departure</h3>
                        <table class="table">
                          <tbody>
                            <tr>
                              <td><strong> Departure Date</strong></td>
                              <td>10/02/19</td>
                            </tr>
                            <tr>
                              <td><strong>Departure Time</strong></td>
                              <td>19:21</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12 col-xs-12">
                    <div class="flight">
                      <div class="aircraft">
                        <h3>Arrival</h3>
                        <table class="table">
                          <tbody>
                            <tr>
                              <td><strong> Arrival Date</strong></td>
                              <td>10/02/19</td>
                            </tr>
                            <tr>
                              <td><strong>Arrival Time</strong></td>
                              <td>19:21</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="bottom-line">
              </div>
            </div>
          </div>
          <!-- End Flight 1 -->
        </div>
      </div>
    </div>
  </div>
  <!-- End Transfer Modal -->

  <script src="{{ asset('plugins/js/jquery.min.js') }}" defer></script>
  <script src="{{ asset('plugins/js/bootstrap.min.js') }}" defer></script>
  <script src="{{ asset('plugins/js/viewportchecker.js') }}" defer></script>
  <script src="{{ asset('plugins/js/bootsnav.js') }}" defer></script>
  <script src="{{ asset('plugins/js/slick.min.js') }}" defer></script>
  <script src="{{ asset('plugins/js/jquery.nice-select.min.js') }}" defer></script>
  <script src="http://maps.google.com/maps/api/js?key="></script>
  <script src="{{ asset('js/portal/custom.js') }}" defer></script>

  <script>
    function openRightMenu() {
      document.getElementById("rightMenu").style.display = "block";
    }

    function closeRightMenu() {
      document.getElementById("rightMenu").style.display = "none";
    }
  </script>
  <script>
    $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

    $(document).ready(function() {
      $(function() {
        var btn = $("[href='#flight1']");
        var toggled = false;
        btn.on("click", function() {
          if (!toggled) {
            toggled = true;
            btn.text("Close Details");
          } else {
            toggled = false;
            btn.text("More Details");
          }
        });
      });
    });

    $(document).ready(function() {
      $(function() {
        var btn = $("[href='#flight2']");
        var toggled = false;
        btn.on("click", function() {
          if (!toggled) {
            toggled = true;
            btn.text("Close Details");
          } else {
            toggled = false;
            btn.text("More Details");
          }
        });
      });
    });
  </script>
</body>

</html>
