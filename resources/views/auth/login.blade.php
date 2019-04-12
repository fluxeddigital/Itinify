@extends('layouts.auth')

@section('title', 'Log in')

@section('content')
<div class="card">
    <div class="card-body">
        <img class="auth-form__logo d-table mx-auto mb-3" src="/images/icon.png" alt="Itinify">

        <h5 class="auth-form__title text-center mb-4">Log in to your Account</h5>

        <form method="POST" action="{{ route('login') }}">
            @csrf

            <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" placeholder="Enter email" id="email" required autofocus>

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

            <div class="form-group mb-3 d-table mx-auto">
                <div class="custom-control custom-checkbox mb-1">
                    <input type="checkbox" class="custom-control-input" id="remember" name="remember" {{ old('remember') ? 'checked' : '' }}>
                    <label class="custom-control-label" for="remember">Remember me</label>
                </div>
            </div>

            <button type="submit" class="btn btn-pill btn-accent d-table mx-auto">Log In</button>
        </form>
    </div>
</div>

<div class="auth-form__meta d-flex mt-4">
    <a href="{{ route('password.request') }}">Forgot your password?</a>
    <a class="ml-auto" href="{{ route('register') }}">Sign Up</a>
</div>
@endsection
