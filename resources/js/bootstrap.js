window._ = require('lodash');

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

require('chart.js');

require('shards-ui/dist/js/shards.min');
require('./shards-dashboards.1.3.1.min');

require('react-bootstrap-table-next/dist/react-bootstrap-table2.min.css');
require('react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css');
require('react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css');

require('tinymce/tinymce');
require('tinymce/themes/silver/theme');
require('tinymce/plugins/print');
require('tinymce/plugins/preview');
require('tinymce/plugins/fullpage');
require('tinymce/plugins/searchreplace');
require('tinymce/plugins/autolink');
require('tinymce/plugins/directionality');
require('tinymce/plugins/visualblocks');
require('tinymce/plugins/visualchars');
require('tinymce/plugins/fullscreen');
require('tinymce/plugins/image');
require('tinymce/plugins/link');
require('tinymce/plugins/media');
require('tinymce/plugins/template');
require('tinymce/plugins/codesample');
require('tinymce/plugins/table');
require('tinymce/plugins/charmap');
require('tinymce/plugins/hr');
require('tinymce/plugins/pagebreak');
require('tinymce/plugins/nonbreaking');
require('tinymce/plugins/anchor');
require('tinymce/plugins/toc');
require('tinymce/plugins/insertdatetime');
require('tinymce/plugins/advlist')
require('tinymce/plugins/lists');
require('tinymce/plugins/wordcount');
require('tinymce/plugins/imagetools');
require('tinymce/plugins/textpattern');
require('tinymce/plugins/help');
require('tinymce/plugins/code');