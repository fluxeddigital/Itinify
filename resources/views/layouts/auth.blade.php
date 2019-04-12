<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title') - Itinify</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="https://js.stripe.com/v3/"></script>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body class="h-100">
    <div class="container-fluid icon-sidebar-nav h-100">
        <div class="row h-100">
            <main class="main-content col pl-0">
                <div class="main-content-container container-fluid px-4 my-auto h-100">
                    <div class="row no-gutters h-100">
                        <div class="col-lg-3 col-md-5 auth-form mx-auto my-auto">
                            @yield('content')
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</body>
</html>
