<?php 

global $post;

$page_slug = $post->post_name;
$page_title = $post->post_title;

?>
<?php get_header(); ?>

	<section id="<?php echo $page_slug; ?>" class="page-wrapper">
		
		<!-- Page Title -->
		<header class="page-title">

			<div class="container">
				<h1>最新消息</h1>
			</div>
			
		</header>

		<!-- Page Content -->
		<div class="page-content">
			
			<?php while ( have_posts() ) : the_post(); ?>

				<?php get_template_part( 'content', 'single' ); ?>
				
			<?php endwhile; // end of the loop. ?>
		
		</div>

	</section><!-- END #<?php echo $page_slug; ?> -->

<?php  get_footer(); ?>