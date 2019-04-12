@extends('layouts.auth')

@section('title', 'Register')

@section('content')
<div class="card">
    <div class="card-body">
        <img class="auth-form__logo d-table mx-auto mb-3" src="/images/icon.png" alt="Itinify">
        
        <h5 class="auth-form__title text-center mb-4">Register</h5>

        <form method="POST" action="{{ route('register') }}">
            @csrf

            <div class="row">
                <div class="form-group col">
                    <label for="first_name">First name</label>
                    <input type="text" class="form-control{{ $errors->has('first_name') ? ' is-invalid' : '' }}" name="first_name" value="{{ old('first_name') }}" placeholder="Enter first name" id="first_name" required autofocus>

                    @if ($errors->has('first_name'))
                        <span class="invalid-feedback" role="alert">
                            {{ $errors->first('first_name') }}
                        </span>
                    @endif
                </div>

                <div class="form-group col">
                    <label for="last_name">Last name</label>
                    <input type="text" class="form-control{{ $errors->has('last_name') ? ' is-invalid' : '' }}" name="last_name" value="{{ old('last_name') }}" placeholder="Enter last name" id="last_name" required>

                    @if ($errors->has('last_name'))
                        <span class="invalid-feedback" role="alert">
                            {{ $errors->first('last_name') }}
                        </span>
                    @endif
                </div>
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

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" placeholder="Enter password" id="password" required>

                @if ($errors->has('password'))
                    <span class="invalid-feedback" role="alert">
                        {{ $errors->first('password') }}
                    </span>
                @endif
            </div>

            <div class="form-group">
                <input type="password" class="form-control" name="password_confirmation" placeholder="Confirm password" required>
            </div>

            <div class="form-group mb-3 d-table mx-auto">
                <div class="custom-control custom-checkbox mb-1">
                    <input type="checkbox" class="custom-control-input" id="terms" name="remember" required>
                    <label class="custom-control-label" for="terms">I agree with the Terms & Conditions & Privacy Policy.</label>
                </div>
            </div>

            <button type="submit" class="btn btn-pill btn-accent d-table mx-auto">Register</button>
        </form>
    </div>
</div>

<div class="auth-form__meta d-flex mt-4">
    <a href="{{ route('password.request') }}">Forgot your password?</a>
    <a class="ml-auto" href="{{ route('login') }}">Log in</a>
</div>
@endsection
