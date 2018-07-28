let mix = require('laravel-mix');
const webpack = require('webpack');

/*
 |--------------------------------------------------------------------------
 | Mix Back Panel Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    plugins: [
        // Ignore all locale files of moment.js
        // new webpack.IgnorePlugin(
        //     /^\.\/locale$/, /moment$/,
        //     /^\.\/locale$/, /fullcalendar$/
        // )
        new webpack.ContextReplacementPlugin(
            // The path to directory which should be handled by this plugin
            /moment[\/\\]locale/,
            /fullcalendar[\/\\]dist[\/\\]locale/,
        )
    ],
});

mix.js('resources/assets/backend/js/app.js', 'public/js')
    .js([
        'resources/assets/backend/js/site-dashboard.js',
    ], 'public/js/site-dashboard.js')
    .js([
        'resources/assets/backend/js/dashboard.js',
    ], 'public/js/dashboard.js')
    .js([
        'resources/assets/backend/js/adminlte.js',
        'resources/assets/backend/js/theme_settings.js',
        'resources/assets/backend/js/bootstrap-datetimepicker.min.js'
    ], 'public/js/theme.js')
    .extract([
        'jquery', 'bootstrap', 'icheck', 'jquery-validation', 'slimscroll', 'fastclick',
        'datatables.net', 'datatables.net-bs', 'datatables.net-responsive-bs',
    ])
    .sass('resources/assets/backend/sass/app.scss', 'public/css')
    .sass('resources/assets/backend/sass/vendor.scss', 'public/css')
    .styles([
        'resources/assets/backend/css/AdminLTE.css',
        'resources/assets/backend/css/_all-skins.css',
        'resources/assets/backend/css/bootstrap3-wysihtml5.min.css',
        'resources/assets/backend/css/bootstrap-datetimepicker.min.css'
    ], 'public/css/theme.css')
    .styles('resources/assets/backend/css/site-dashboard.css', 'public/css/site-dashboard.css')
    .autoload({
        jquery: ['$', 'window.jQuery', 'jQuery', 'jquery'],
        moment: ['window.moment', 'moment'],
    });


mix.options({
    processCssUrls: true,
    // uglify: {},
    purifyCss: false,
    // purifyCss: {},
    clearConsole: false
});


// copy non processing files to public path
mix.copy('resources/assets/backend/js/bootstrap3-wysihtml5.all.min.js', 'public/js/editor.js');
mix.copyDirectory('resources/assets/backend/images', 'public/images');



if (mix.inProduction()) {
    mix.version();
    mix.sourceMaps();
}

mix.browserSync({
    proxy: 'l5.school.test'
});