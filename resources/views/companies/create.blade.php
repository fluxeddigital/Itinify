@extends('layouts.auth')

@section('title', 'Create Company')

@section('content')
<div class="card">
    <div class="card-body">
        <img class="auth-form__logo d-table mx-auto mb-3" src="/images/icon.png" alt="Itinify">
        
        <h5 class="auth-form__title text-center mb-4">Create Company</h5>

        <form method="POST" action="{{ route('companies.store') }}">
            @csrf

            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" value="{{ old('name') }}" placeholder="Enter name" id="name" required>

                @if ($errors->has('name'))
                    <span class="invalid-feedback" role="alert">
                        {{ $errors->first('name') }}
                    </span>
                @endif
            </div>

            <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" placeholder="Enter email" id="email" required>

                @if ($errors->has('email'))
                    <span class="invalid-feedback" role="alert">
                        {{ $errors->first('email') }}
                    </span>
                @endif
            </div>

            <div class="form-group justify-content-center">
                <label for="elements">Payment Method</label>
                
                <div id="elements" class="form-control"></div>

                <input id="stripe_token" type="hidden" name="stripe_token">

                <strong>
                    <div id="elementsErrors" class="alert alert-danger" role="alert"></div>
                </strong>
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

            <p>By clicking the button below, a setup fee of £300.00 will be charged to your account and a monthly subscription set up.</p>

            <button type="submit" class="btn btn-pill btn-accent d-table mx-auto">Create Company</button>
        </form>
    </div>
</div>

<div class="auth-form__meta d-flex mt-4">
    <a class="ml-auto" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Log out</a>
    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">@csrf</form>
</div>
@endsection
