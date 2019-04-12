@extends('layouts.auth')

@section('title', 'Verify your Email Address')

@section('content')
<div class="card">
    <div class="card-body">
        <img class="auth-form__logo d-table mx-auto mb-3" src="/images/icon.png" alt="Itinify">

        <h5 class="auth-form__title text-center mb-4">Verify your Email Address</h5>

        @if (session('resent'))
            <div class="alert alert-success" role="alert">
                {{ __('A fresh verification link has been sent to your email address.') }}
            </div>
        @endif

        <p>
            Before proceeding, please check your email for a verification link.
        </p>

        <p>
            If you did not receive the email, <a href="{{ route('verification.resend') }}">click here to request another</a>.
        </p>
    </div>
</div>

<div class="auth-form__meta d-flex mt-4">
    <a class="mx-auto" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Log out</a>
    
    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
    </form>
</div>
@endsection
