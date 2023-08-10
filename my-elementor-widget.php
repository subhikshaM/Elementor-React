<?php
class My_Elementor_Widget extends \Elementor\Widget_Base
{
    public function get_name()
    {
        return 'my-elementor-component'; // Use the same name as the one used in the React code
    }

    public function get_title()
    {
        return __('My Elementor Component', 'my-elementor-plugin');
    }

    public function get_icon()
    {
        return 'eicon-select';
    }

    protected function _register_controls()
    {
        // No additional controls needed for this widget
    }
    

    protected function render()
    {
        $settings = $this->get_settings_for_display();

        // Get the selected option from the widget settings or provide a default value
        $selected_option = isset($settings['selected_option']) ? $settings['selected_option'] : 'programDetail';

        // Enqueue the React script and pass data to the React component
        wp_enqueue_script(
            'my-elementor-react',
            plugins_url('my-elementor-component/build/static/js/main.c5f12480.js', __FILE__),
            array('jquery'),
            '1.0.0',
            true
        );

        $localization_data = array(
            'dropdown_options' => array(
                'programDetail' => 'Program Detail Info',
                'staffListing' => 'Staff Listing',
                'videoListing' => 'Video Listing',
                'programListing' => 'Program Listing',
            ),
            'selected_option' => $selected_option, // Pass the selected option to the React component
        );

        wp_localize_script('my-elementor-react', 'myElementorData', $localization_data);

        // Render the widget content
        ?>
        <div class="my-elementor-component">
            <?php
            if (is_admin()) {
                // Show the dropdown only inside the Elementor editor
            ?>
                <select id="my-dropdown">
                    <?php foreach ($localization_data['dropdown_options'] as $value => $label) : ?>
                        <option value="<?php echo esc_attr($value); ?>" <?php selected($selected_option, $value); ?>><?php echo esc_html($label); ?></option>
                    <?php endforeach; ?>
                </select>
            <?php
            }
            ?>

            <!-- This is where your React component will be rendered -->
            <div id="my-react-component"></div>
        </div>
        <?php
    }
}