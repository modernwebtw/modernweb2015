<?php 

$paged = ( get_query_var('paged') ) ? get_query_var('paged') : 1;

$news_args =array(
	'post_type' 		=> 'post',
	'orderby' 			=> 'date',
	'order'				=> 'DESC',
	'posts_per_page' 	=> 8,
	'paged' 			=> $paged
);

$news = new WP_Query( $news_args );

?>

<div class="container">

	<?php 

		while ( $news->have_posts() ) : $news->the_post(); 

			$share_link 		= get_field('link_to');
			$permalink 			= get_permalink();

			$post_link 			= (in_category('share-link'))?$share_link:$permalink;
			
			$post_title 		= get_the_title();
			$post_the_excerpt 	= get_the_excerpt();
			$post_date			= get_the_date('M d, Y');

	?>
	
		<article class="post-item">
			<h2><a href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a></h2>
			<span class="date"><?php echo get_the_date('M d, Y'); ?></span>
			<div class="excerpt"><?php the_excerpt(); ?></p>
			<a href="<?php echo get_permalink(); ?>" class="button">Read more</a>
		</article>
	
	<?php endwhile; ?>

</div>