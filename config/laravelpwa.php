<?php

return [
    'name' => 'Itinify',
    'manifest' => [
        'name' => env('APP_NAME'),
        'short_name' => 'Itinify',
        'start_url' => '/portal',
        'background_color' => '#ffffff',
        'theme_color' => '#000000',
        'display' => 'standalone',
        'orientation'=> 'any',
        'icons' => [
            '72x72' => '/img/icon-72x72.png',
            '96x96' => '/img/icon-96x96.png',
            '128x128' => '/img/icon-128x128.png',
            '144x144' => '/img/icon-144x144.png',
            '152x152' => '/img/icon-152x152.png',
            '192x192' => '/img/icon-192x192.png',
            '384x384' => '/img/icon-384x384.png',
            '512x512' => '/img/icon-512x512.png'
        ],
        'splash' => [
            '640x1136' => '/img/splash-640x1136.png',
            '750x1334' => '/img/splash-750x1334.png',
            '828x1792' => '/img/splash-828x1792.png',
            '1125x2436' => '/img/splash-1125x2436.png',
            '1242x2208' => '/img/splash-1242x2208.png',
            '1242x2688' => '/img/splash-1242x2688.png',
            '1536x2048' => '/img/splash-1536x2048.png',
            '1668x2224' => '/img/splash-1668x2224.png',
            '1668x2388' => '/img/splash-1668x2388.png',
            '2048x2732' => '/img/splash-2048x2732.png',
        ]
    ]
];
