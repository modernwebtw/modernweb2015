<?php
/**
 * The Header for modernweb theme
 */
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php bloginfo('name'); ?><?php wp_title( '|', true, 'left' ); ?></title>
	<!--
	<link rel="icon" type="image/png" href="<?php bloginfo( 'stylesheet_directory' ); ?>/css/img/yowu-favicon.jpg">		
    -->
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->		
	<?php wp_head(); ?>
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />		
</head>
<body>
	<a href="#" class="fb-btn"></a>
	<div class="body-wrapper">

		<!-- Fixed navbar -->
		<header id="header" class="navbar navbar-default navbar-fixed-top">
			
			<div class="container">

				<nav id="nav">
					
					<div id="nav-branding">

						<a id="logo" href="<?php echo get_bloginfo('url') ?>">
			          		<img src="<?php echo get_template_directory_uri(); ?>/css/img/modern-web-logo.svg" alt="<?php echo get_bloginfo('name') ?>">
			          	</a>
						
						<a href="#nav-menu" id="mobile-btn">
							<span class="sr-only">Toggle navigation</span>
			            	<span class="icon-bar"></span>
			            	<span class="icon-bar"></span>
			            	<span class="icon-bar"></span>
						</a>

						
					</div><!-- #nav-branding -->

					<?php

						$defaults = array(
							'theme_location'  => 'main-menu',
							'container'       => 'div',
							'container_id'    => 'nav-menu',
							'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
						);

						wp_nav_menu( $defaults );

					?>

				</nav><!-- #nav -->

			</div><!-- .container -->

	    </header>

		<div class="content-wrapper">	



