<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- App API Keys -->
    <meta name="filestack-key" content="{{ env('FILESTACK_KEY') }}">
    <meta name="maps-key" content="{{ env('MAPS_KEY') }}">

    <!-- Authenticated Company & User Information -->
    <meta name="company-id" content="{{ Auth::user()->company_id }}">
    <meta name="company-logo" content="{{ Auth::user()->company->logo }}">
    <meta name="user-id" content="{{ Auth::id() }}">
    <meta name="user-name" content="{{ Auth::user()->first_name }} {{ Auth::user()->last_name }}">

    <title>Itinify</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body class="h-100">
    <div class="container-fluid">
        <div id="app" class="row"></div>
    </div>
</body>
</html>
