<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title') - {{ config('app.name') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/portal/vendor.min.js') }}"></script>
    <script src="{{ asset('js/portal/main.js') }}"></script>
    <script src="{{ asset('js/portal/settings.min.js') }}"></script>
    <script src="{{ asset('js/portal/charts.js') }}"></script>
    <script>
    $( document ).ready(function() {
      $('input' ).change(function() {
        if ($(this).val()) {
          $(this).addClass('filled');
        };
      });
    });
    </script>

    <!-- Styles -->
    <link href="{{ asset('css/portal/vendor.min.css') }}" rel="stylesheet" type="text/css" media="all">
    <link href="{{ asset('css/portal/main.css') }}" rel="stylesheet" type="text/css" media="all">
    <link href="{{ asset('css/portal/color-settings.css') }}" rel="stylesheet" type="text/css" media="all" data-role="color-settings">
    <link href="{{ asset('css/portal/login-register.css') }}" rel="stylesheet" type="text/css" media="all">
    <link href="{{ asset('css/portal/frontend/itinify.css') }}" rel="stylesheet" type="text/css" media="all">

    @laravelPWA
</head>
@yield('content')
</html>
