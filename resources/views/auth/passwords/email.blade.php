@extends('layouts.auth')

@section('title', 'Reset Password')

@section('content')
<div class="card">
    <div class="card-body">
        <img class="auth-form__logo d-table mx-auto mb-3" src="/images/icon.png" alt="Itinify">

        <h5 class="auth-form__title text-center mb-4">Reset Password</h5>

        <form method="POST" action="{{ route('password.email') }}">
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

            <button type="submit" class="btn btn-pill btn-accent d-table mx-auto">Send Reset Request</button>
        </form>
    </div>
</div>

<div class="auth-form__meta d-flex mt-4">
    <a class="mx-auto" href="{{ route('login') }}">Log in</a>
</div>
@endsection
