<?php
	/**
	 * Enqueues scripts and styles for front end.
	 *
	 * @since modernweb 1.0
	 *
	 * @return void
	 */

	/**** 
	*
	*	enqueue js files
	*  
	****/ 
	function add_js_method() {
		wp_enqueue_script('jquery');
		wp_enqueue_script('flexslider', get_template_directory_uri().'/plugin/flexslider/jquery.flexslider-min.js','2.4.0');
		wp_enqueue_script('bootstrap', get_template_directory_uri().'/plugin/bootstrap/js/bootstrap.min.js','3.3.2');
		wp_enqueue_script('headhesive', get_template_directory_uri().'/plugin/headhesive/headhesive.min.js','1.1.1');
	}
	add_action( 'wp_enqueue_scripts', 'add_js_method' );

	/**** 
	*
	*	register wordpress menu
	*  
	****/
	function register_my_menus() {
	  register_nav_menus(
	    array(
	      'main-menu' => __( 'Main Menu' ),
	      'footer-menu' => __( 'Footer Menu' ),
	    )
	  );
	}
	add_action( 'init', 'register_my_menus' );

	/**** 
	*
	*	register custom post type
	*  
	****/	
	function create_posttype() {
		// register_post_type( 'ads',
		// 	array(
		// 		'labels' => array(
		// 			'name' => __( 'Ads' ),
		// 			'singular_name' => __( '廣告' )
		// 		),
		// 		'taxonomies' => array('category'),
		// 		'public' => true,
		// 		'has_archive' => true,
		// 		'menu_icon' => '',
		// 		'supports' => array( 'title', 'editor', 'thumbnail'),
		// 		'rewrite' => array('slug' => 'ads'),
		// 	)
		// );				
	}
	add_action( 'init', 'create_posttype' );

	/**** 
	*
	*	register custom post type - speaker
	*  
	****/	
	function create_speaker() {
		register_post_type( 'speaker',
			array(
				'labels' => array(
					'name' => __( '講師' ),
					// 'singular_name' => __( '' )
				),
				'taxonomies' => array('category'),
				'public' => true,
				'has_archive' => true,
				'menu_icon' => 'dashicons-businessman',
				'supports' => array( 'title', 'editor', 'thumbnail'),
				'rewrite' => array('slug' => 'speaker'),
			)
		);				
	}
	add_action( 'init', 'create_speaker' );

	/**** 
	*
	*	register custom post type - sponsor
	*  
	****/	
	function create_sponsor() {
		register_post_type( 'sponsor',
			array(
				'labels' => array(
					'name' => __( '贊助商' ),
					// 'singular_name' => __( '' )
				),
				'taxonomies' => array('category'),
				'public' => true,
				'has_archive' => true,
				'menu_icon' => 'dashicons-megaphone',
				'supports' => array( 'title', 'editor', 'thumbnail'),
				'rewrite' => array('slug' => 'sponsor'),
			)
		);				
	}
	add_action( 'init', 'create_sponsor' );
	/**** 
	*
	*	custom post type support thumbnail
	*  
	****/	
	add_theme_support('post-thumbnails');

	/**** 
	*
	*	register custom taxonomy
	*  
	****/

	function texonomy_init() {
		// create taxonomy
		// register_taxonomy(
		// 	'new-arrival',
		// 	'products',
		// 	array(
		// 		'label' => __( '新品新貌' ),
		// 		'rewrite' => array( 'slug' => 'new-arrival' ),
		// 		'update_count_callback' => '_update_post_term_count',			
		// 	)
		// );												
	}
	add_action( 'init', 'texonomy_init' );

	/**** 
	*
	*	font-awesome for dashboard icon
	*  
	****/	
	function fontawesome_dashboard() {
	   wp_enqueue_style('fontawesome', get_template_directory_uri().'/plugin/fontawesome/css/font-awesome.min.css', '', '4.0.3', 'all');
	}
	 
	add_action('admin_init', 'fontawesome_dashboard');

	function fontawesome_icon_dashboard() {
	   // echo "<style type='text/css' media='screen'>
	   //         icon16.icon-media:before, #adminmenu .menu-icon-ads div.wp-menu-image:before {
	   //         font-family: Fontawesome !important;
	   //         content: '\\f1ea';
    //  		}    		
	   //       </style>";
	}
	add_action('admin_head', 'fontawesome_icon_dashboard');
	
	/**** 
	*
	*	style login screen
	*  
	****/

	function my_login_screen() { ?>
	    <style type="text/css">
	        body.login{
	        	background: url(<?php echo get_stylesheet_directory_uri(); ?>/css/img/modernweb-dashboard-login.png) no-repeat center center fixed;
			    -webkit-background-size: cover;
			    -moz-background-size: cover;
			    -o-background-size: cover;
			    background-size: cover;       	
	        }
	        body.login div#login h1{
	        	background: rgba(0,0,0,0.2);
	        }
	        body.login div#login h1 a {
	            background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/css/img/modernweb-logo.png);
			    background-size: 170px 80px;
			    width: 170px;
			    height: 80px;
	        }
	        body.login div#login p a{
	        	color: #0075a9;
	        	font-weight: bold;
	        }
	        body.login div#login p a:hover{
	        	color: #0075a9;
	        	text-decoration: underline;
	        }	
	        body.login div#login #loginform{
	        	background-color: rgba(255,255,255,0.7);
	        }
	        body.login div#login #loginform input:focus{
	        	border-color: #0075a9;
	        }
	        body.login div#login #loginform .submit #wp-submit{
	        	border-radius: 0px;
	        	background-color: #0075a9;
	        	border: none;
	        }
	        body.login div#login #loginform .submit #wp-submit:hover{
	        	color: #000;
	        }	                
	    </style>
	<?php }
	add_action( 'login_enqueue_scripts', 'my_login_screen' );

	/* ====================
	 * Replaces the excerpt "more" text by a link
	 * ==================== */
	function new_excerpt_more($more) {
	       global $post;
		return '...';
	}
	add_filter('excerpt_more', 'new_excerpt_more');

	/* ====================
	 * Control Excerpt Length using Filters
	 * ==================== */
	function custom_excerpt_length( $length ) {
		return 55;
	}
	add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );
?>