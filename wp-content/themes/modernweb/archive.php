<?php 

// Template Name: Archive

global $post;

$page_slug = $post->post_name;
$page_title = $post->post_title;

?>
<?php get_header(); ?>

	<section id="<?php echo $page_slug; ?>" class="page-wrapper">
		<!-- Page Title -->
		<header class="page-title">

			<div class="container">
				<h1><?php echo $page_title; ?></h1>
			</div>
			
		</header>

		<!-- Page Content -->
		<div class="page-content">

			<?php get_template_part( 'content', $page_slug ); ?> 

		</div>

	</section><!-- END #<?php echo $page_slug; ?> -->

<?php  get_footer(); ?>