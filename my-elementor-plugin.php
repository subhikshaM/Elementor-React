<?php
/*
Plugin Name: My Elementor Plugin
Description: Integrates a custom Elementor component with React.
Version: 1.0.0
Author: sid
Author URI: Your Website
*/

// Register a new category for your custom widget
add_action( 'elementor/elements/categories_registered', function( $elements_manager ) {
    $elements_manager->add_category(
        'my-custom-category',
        [
            'title' => 'My Custom Category',
            'icon' => 'fa fa-code',
        ]
    );
});

// Register a new widget
add_action( 'elementor/widgets/widgets_registered', function() {
    require_once plugin_dir_path( __FILE__ ) . 'my-elementor-widget.php';
    \Elementor\Plugin::instance()->widgets_manager->register_widget_type( new My_Elementor_Widget() );
});

// Enqueue your React component script
add_action( 'elementor/frontend/after_enqueue_scripts', function() {
    // Use a unique handle for the script to avoid conflicts
    wp_register_script(
        'my-elementor-react',
        plugins_url( 'my-elementor-component/build/static/js/main.c5f12480.js', __FILE__ ),
        array( 'jquery' ),
        '1.0.0',
        true
    );

    $localization_data = array(
        'ajax_url' => admin_url( 'admin-ajax.php' ), // Example: passing the AJAX URL to your React component
        // Add more data as needed to be used in the React component
    );
    wp_localize_script( 'my-elementor-react', 'myElementorData', $localization_data );
});

// Add your React component rendering code to the widget
add_action( 'elementor/frontend/widget/before_render_content', function( $widget ) {
    if ( 'my-elementor-widget' === $widget->get_name() ) {
        ?>
        <div id="myReactWidget"></div> <!-- This div is where the React component will be rendered -->
        <script>
            // Wrap your React component in an IIFE to avoid polluting the global namespace
            (function() {
                const root = document.getElementById('myReactWidget');
                const reactComponent = React.createElement(MyElementorComponent, { /* Pass props if needed */ });
                const reactRoot = ReactDOM.createRoot(root);
                reactRoot.render(reactComponent);
            })();
        </script>
        <?php
    }
});
