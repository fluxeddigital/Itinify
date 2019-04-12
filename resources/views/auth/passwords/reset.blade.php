@extends('layouts.auth')

@section('title', 'Reset Password')

@section('content')
<div class="card">
    <div class="card-body">
        <img class="auth-form__logo d-table mx-auto mb-3" src="/images/icon.png" alt="Itinify">
        
        <h5 class="auth-form__title text-center mb-4">Reset Password</h5>

        <form method="POST" action="{{ route('password.update') }}">
            @csrf

            <input type="hidden" name="token" value="{{ $token }}">

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" placeholder="Enter new password" id="password" required>

                @if ($errors->has('password'))
                    <span class="invalid-feedback" role="alert">
                        {{ $errors->first('password') }}
                    </span>
                @endif
            </div>

            <div class="form-group">
                <input type="password" class="form-control" name="password_confirmation" placeholder="Confirm new password" required>
            </div>

            <button type="submit" class="btn btn-pill btn-accent d-table mx-auto">Reset Password</button>
        </form>
    </div>
</div>

<div class="auth-form__meta d-flex mt-4">
    <a class="mx-auto" href="{{ route('login') }}">Log in</a>
</div>
@endsection
