<div class="container">
	
	<article id="post-<?php the_ID(); ?>" <?php post_class("page_main_section"); ?>>
		
		<header>
			<h3><?php the_title(); ?></h3>
		</header>
		
		<div class="post-meta">
			<span class="post-date">
				<i class="fa fa-clock-o"></i>
				<?php echo get_the_date('M d, Y'); ?>
			</span>
			
			<?php

				$posttags = get_the_tags();
				if ($posttags) :
			?>
					<span class="post-tags">
						<i class="fa fa-tag"></i>Tags: 
			
			<?php 

				foreach($posttags as $tag) {
					echo $tag->name; 
				} 

			?>
				</span>
				    
				<?php endif; ?>

			</span>
		</div>

		<div class="post-content">
			<?php the_content(); ?>
		</div>
		<hr>
		<footer class="post-footer">
				
			<div id="article-btn" class="row">
				<div class="col-xs-4 ">
					<?php previous_post('% &nbsp ',
					'<i class="fa fa-arrow-circle-left"></i> Previous ', 'no'); ?>
				</div>
				
				<div class="col-xs-4 text-center">
					<a class="back-btn" href="<?php echo esc_url( home_url( '/' ) ); ?>news/" title="Back"><i class="fa fa-th-large"></i></a>
				</div>

				<div class="col-xs-4 text-right">
					<?php next_post ('&nbsp %',
					'Next <i class="fa fa-arrow-circle-right"></i>', 'no'); ?>
				</div>
			</div>

		</footer>
	
	</article>

</div>