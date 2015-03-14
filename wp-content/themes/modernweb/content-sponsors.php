<div class="container">
<?php 
	
	$sponsor_types = array('diamond-level'=>'鑽石級','platinum-level'=>'白金級','gold-level'=>'黃金級','silver-level'=>'銀級','special-thank'=>'特別感謝','private-sponsor'=>'個人贊助');
	$private_sponsor = array();
	
	foreach ($sponsor_types as $sponsor_type => $sponsor_type_label) :
			
		if( have_rows($sponsor_type) ): 

?>

		<ul id="<?php echo $sponsor_type; ?>" class="sponsor-group">

			<h4><?php echo $sponsor_type_label; ?></h4>

			<?php while( have_rows($sponsor_type) ): the_row(); 

				// vars
				$sponsor_logo 		= get_sub_field('sponsor_logo');
				$sponsor_name 		= get_sub_field('sponsor_name');
				$sponsor_name_en 	= get_sub_field('sponsor_name_en');
				$sponsor_url 		= get_sub_field('sponsor_url');
				$sponsor_intro	 	= get_sub_field('sponsor_intro');

				if($sponsor_type!=='private-sponsor'):

			?>

					<article class="post-item sponsor">

						<img src="<?php echo $sponsor_logo['url']; ?>" alt="<?php echo $sponsor_name; ?>">

						<div class="speaker-name">
							<h2><?php echo $sponsor_name; ?></h2>
							<h5><?php echo $sponsor_name_en; ?></h5>
						</div>
						
						<div class="intro"><?php echo $sponsor_intro; ?></p>
						<a class="button" href="<?php echo $sponsor_url; ?>">Website</a>
						
					</article>

				<?php else: ?>
					
					<article class="post-item sponsor">

						<div class="speaker-name">
							<h2><?php echo $sponsor_name; ?></h2>
							<h5><?php echo $sponsor_name_en; ?></h5>
						</div>
												
					</article>
					
				<?php endif; ?>

			<?php endwhile; ?>

		</ul>

		<?php endif; ?>

	<?php endforeach; ?>

</div><!-- .container -->