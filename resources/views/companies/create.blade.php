@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Register') }}</div>

                <div class="card-body">
                    <form id="form" method="POST" action="{{ route('register') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">{{ __('Name') }}</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" value="{{ old('name') }}" required autofocus>

                                @if ($errors->has('name'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required>

                                @if ($errors->has('email'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="industry" class="col-md-4 col-form-label text-md-right">{{ __('Industry') }}</label>

                            <div class="col-md-6">
                                <select id="industry" class="form-control{{ $errors->has('industry') ? ' is-invalid' : '' }}" name="industry">
                                    <option value="Accommodation" {{ old('industry') == 'Accommodation' ? ' selected' : '' }}>Accommodation</option>
                                    <option value="Accounting" {{ old('industry') == 'Accounting' ? ' selected' : '' }}>Accounting</option>
                                    <option value="Automotive & Motors" {{ old('industry') == 'Automotive & Motors' ? ' selected' : '' }}>Automotive & Motors</option>
                                    <option value="Books" {{ old('industry') == 'Books' ? ' selected' : '' }}>Books</option>
                                    <option value="Building & Construction" {{ old('industry') == 'Building & Construction' ? ' selected' : '' }}>Building & Construction</option>
                                    <option value="Camera & Photography" {{ old('industry') == 'Camera & Photography' ? ' selected' : '' }}>Camera & Photography</option>
                                    <option value="Drinks & Food" {{ old('industry') == 'Drinks & Food' ? ' selected' : '' }}>Drinks & Food</option>
                                    <option value="Education" {{ old('industry') == 'Education' ? ' selected' : '' }}>Education</option>
                                    <option value="Electronics" {{ old('industry') == 'Electronics' ? ' selected' : '' }}>Electronics</option>
                                    <option value="Engineering" {{ old('industry') == 'Engineering' ? ' selected' : '' }}>Engineering</option>
                                    <option value="Entertainment" {{ old('industry') == 'Entertainment' ? ' selected' : '' }}>Entertainment</option>
                                    <option value="Fashion" {{ old('industry') == 'Fashion' ? ' selected' : '' }}>Fashion</option>
                                    <option value="Financial" {{ old('industry') == 'Financial' ? ' selected' : '' }}>Financial</option>
                                    <option value="Health & Beauty" {{ old('industry') == 'Health & Beauty' ? ' selected' : '' }}>Health & Beauty</option>
                                    <option value="Home & Garden" {{ old('industry') == 'Home & Garden' ? ' selected' : '' }}>Home & Garden</option>
                                    <option value="Insurance" {{ old('industry') == 'Insurance' ? ' selected' : '' }}>Insurance</option>
                                    <option value="Jewellery" {{ old('industry') == 'Jewellery' ? ' selected' : '' }}>Jewellery</option>
                                    <option value="Manufacturing" {{ old('industry') == 'Manufacturing' ? ' selected' : '' }}>Manufacturing</option>
                                    <option value="Movies, Music & Games" {{ old('industry') == 'Movies, Music & Games' ? ' selected' : '' }}>Movies, Music & Games</option>
                                    <option value="Real Estate" {{ old('industry') == 'Real Estate' ? ' selected' : '' }}>Real Estate</option>
                                    <option value="Restaurants" {{ old('industry') == 'Restaurants' ? ' selected' : '' }}>Restaurants</option>
                                    <option value="Retail" {{ old('industry') == 'Retail' ? ' selected' : '' }}>Retail</option>
                                    <option value="Services" {{ old('industry') == 'Services' ? ' selected' : '' }}>Services</option>
                                    <option value="Sports & Outdoors" {{ old('industry') == 'Sports & Outdoors' ? ' selected' : '' }}>Sports & Outdoors</option>
                                    <option value="Toy, Kids & Babies" {{ old('industry') == 'Toy, Kids & Babies' ? ' selected' : '' }}>Toy, Kids & Babies</option>
                                    <option value="Transportation" {{ old('industry') == 'Transportation' ? ' selected' : '' }}>Transportation</option>
                                    <option value="Travel" {{ old('industry') == 'Travel' ? ' selected' : '' }}>Travel</option>
                                    <option value="Wholesale" {{ old('industry') == 'Wholesale' ? ' selected' : '' }}>Wholesale</option>
                                    <option value="Law Offices" {{ old('industry') == 'Law Offices' ? ' selected' : '' }}>Law Offices</option>
                                </select>

                                @if ($errors->has('industry'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('industry') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="phone" class="col-md-4 col-form-label text-md-right">{{ __('Phone') }}</label>

                            <div class="col-md-6">
                                <input id="phone" type="text" class="form-control{{ $errors->has('phone') ? ' is-invalid' : '' }}" name="phone" value="{{ old('phone') }}" required>

                                @if ($errors->has('phone'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('phone') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <hr>

                        <div class="form-group row">
                            <label for="address" class="col-md-4 col-form-label text-md-right">{{ __('Address') }}</label>

                            <div class="col-md-6">
                                <input id="address" type="text" class="form-control" required>
                            </div>
                        </div>

                        <input type="hidden" id="street_number">
                        <input type="hidden" id="route">

                        <div class="form-group row">
                            <label for="address_line_1" class="col-md-4 col-form-label text-md-right">{{ __('Line 1') }}</label>

                            <div class="col-md-6">
                                <input id="address_line_1" type="text" class="form-control{{ $errors->has('address_line_1') ? ' is-invalid' : '' }}" name="address_line_1" value="{{ old('address_line_1') }}" required>

                                @if ($errors->has('address_line_1'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('address_line_1') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="address_line_2" class="col-md-4 col-form-label text-md-right">{{ __('Line 2') }}</label>

                            <div class="col-md-6">
                                <input id="address_line_2" type="text" class="form-control{{ $errors->has('address_line_2') ? ' is-invalid' : '' }}" name="address_line_2" value="{{ old('address_line_2') }}" required>

                                @if ($errors->has('address_line_2'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('address_line_2') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="address_line_3" class="col-md-4 col-form-label text-md-right">{{ __('Line 3') }}</label>

                            <div class="col-md-6">
                                <input id="address_line_3" type="text" class="form-control{{ $errors->has('address_line_3') ? ' is-invalid' : '' }}" name="address_line_3" value="{{ old('address_line_3') }}" required>

                                @if ($errors->has('address_line_3'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('address_line_3') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="postal_town" class="col-md-4 col-form-label text-md-right">{{ __('Town') }}</label>

                            <div class="col-md-6">
                                <input id="postal_town" type="text" class="form-control{{ $errors->has('address_town') ? ' is-invalid' : '' }}" name="address_town" value="{{ old('address_town') }}" required>

                                @if ($errors->has('address_town'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('address_town') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="administrative_area_level_2" class="col-md-4 col-form-label text-md-right">{{ __('County') }}</label>

                            <div class="col-md-6">
                                <input id="administrative_area_level_2" type="text" class="form-control{{ $errors->has('address_county') ? ' is-invalid' : '' }}" name="address_county" value="{{ old('address_county') }}" required>

                                @if ($errors->has('address_county'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('address_county') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="postal_code" class="col-md-4 col-form-label text-md-right">{{ __('Postcode') }}</label>

                            <div class="col-md-6">
                                <input id="postal_code" type="text" class="form-control{{ $errors->has('address_postcode') ? ' is-invalid' : '' }}" name="address_postcode" value="{{ old('address_postcode') }}" required>

                                @if ($errors->has('address_postcode'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('address_postcode') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <script>
                            var placeSearch, autocomplete;

                            var componentForm = {
                                street_number: 'short_name',
                                route: 'long_name',
                                postal_town: 'long_name',
                                administrative_area_level_2: 'short_name',
                                postal_code: 'short_name',
                            };

                            function initAutocomplete() {
                                autocomplete = new google.maps.places.Autocomplete((document.getElementById('address')), {types: ['geocode'], componentRestrictions: {country: 'gb'}});

                                autocomplete.addListener('place_changed', fillInAddress);
                            };

                            function fillInAddress() {
                                var place = autocomplete.getPlace();

                                for (var component in componentForm) {
                                    document.getElementById(component).value = '';
                                    document.getElementById(component).disabled = false;
                                };

                                for (var i = 0; i < place.address_components.length; i++) {
                                    var addressType = place.address_components[i].types[0];

                                    if (componentForm[addressType]) {
                                        document.getElementById(addressType).value = place.address_components[i][componentForm[addressType]];
                                    }
                                };

                                document.getElementById('address_line_1').value = place.address_components[0]['long_name'] + ' ' + place.address_components[1]['long_name'];
                            }
                        </script>
                        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA5OWoCt2x2rjU9ZBXxezkAjQx51Opvu3E&libraries=places&callback=initAutocomplete"></script>

                        <hr>

                        <div class="form-group row">
                            <label for="vat_number" class="col-md-4 col-form-label text-md-right">{{ __('VAT Number') }}</label>

                            <div class="col-md-6">
                                <input id="vat_number" type="text" class="form-control{{ $errors->has('vat_number') ? ' is-invalid' : '' }}" name="vat_number" value="{{ old('vat_number') }}" required>

                                @if ($errors->has('vat_number'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('vat_number') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row justify-content-center">
                            <div class="col-md-8 text-center">
                                <label for="elements" class="col-form-label justify-self-center">{{ __('Credit / Debit Card') }}</label>

                                <div id="elements" class="form-control"></div>

                                <input id="stripe_token" type="hidden" name="stripe_token">

                                <strong>
                                    <div id="elementsErrors" class="alert alert-danger" role="alert"></div>
                                </strong>
                            </div>
                        </div>
                    
                        <script>
                            var stripe = Stripe('{{ env('STRIPE_KEY') }}');

                            var elements = stripe.elements();

                            var card = elements.create('card');

                            card.mount('#elements');

                            var errorElement = document.getElementById('elementsErrors');

                            errorElement.style.display = 'none';

                            card.addEventListener('change', function(event) {
                                if (event.error) {
                                    errorElement.style.display = 'block';
                                    errorElement.textContent = event.error.message;
                                } else {
                                    errorElement.style.display = 'none';
                                    errorElement.textContent = '';
                                }
                            });

                            var form = document.getElementById('form');
                            
                            form.addEventListener('submit', function(event) {
                                event.preventDefault();

                                stripe.createToken(card).then(function(result) {
                                    if (result.error) {
                                        errorElement.textContent = result.error.message;
                                    } else {
                                        document.getElementById('stripe_token').value = result.token.id;

                                        form.submit();
                                    }
                                });
                            });
                        </script>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Create Company') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
