<?php 

$paged = ( get_query_var('paged') ) ? get_query_var('paged') : 1;

$speaker_args =array(
	'post_type' 		=> 'speaker',
	'orderby' 			=> 'menu_order',
	'order'				=> 'DESC',
	'posts_per_page' 	=> 8,
	'paged' 			=> $paged
);

$speakers = new WP_Query( $speaker_args );

?>

<div class="container">

	<?php 

		while ( $speakers->have_posts() ) : $speakers->the_post(); 

			
			$speaker_slogan		= get_field('slogan');
			$speaker_type		= get_field('type');
			
			$speaker_name 		= get_the_title();
			$speaker_content    = get_the_content();

	?>
	
		<article class="post-item speaker">

			<?php 

				if(get_the_post_thumbnail()!=null){
					echo get_the_post_thumbnail(); 
				}else{
					echo '<img src="'.get_template_directory_uri().'/img/speaker-default.png">';
				}

			?>

			<div class="speaker-name">
				<h2><?php echo $speaker_name; ?></h2>
				<h5><?php echo $speaker_slogan; ?></h5>
			</div>
			
			<div class="intro"><?php echo $speaker_content; ?></p>
			
		</article>
	
	<?php endwhile; ?>

</div>