<?php get_header(); ?>

	<section id="home" class="page-wrapper">

		<!-- Main banner -->
		<section id="main-banner">
			
			<div class="robots"></div>
			<div class="desc" >
				<h2 class="title">Modern Web Conference</h2>
				<p class="slogan">技術交流是促進產業進步的源頭</p>
				<p class="date">2015/5/15 ~ 2015/5/16</p>
				<p>在網站技術呈現爆炸性演進速度的潮流下，<br>我們從網站營運與行銷、網站開發、網站設計三大主軸，<br>邀請各領域具備真知灼見的前輩，現身說法分享大家渴望取得的寶貴經驗，<br>希望藉此技術交流促進台灣網路、軟體、行動應用與雲端產業的進步。<br>因此我們號召有志一同在新世代網站努力鑽研的網站開發工程師、DevOps、架構師、<br>設計師、技術主管、數位行銷等人員，以及對網路產業充滿熱情的你，<br>在ModernWeb殿堂一起探討現代化網站發展，激盪創新的火花！</p>
			</div>
			<a href="#" class="button">立刻報名</a>

		</section>
		
		<!-- Recommend Speaker -->
		<section id="recommend-speaker">

				<h2 class="section-title">推薦講師</h2>

				<div class="post-wrapper">

					<!-- Speaker 1 -->
					<article class="post-item speaker">
						
						<div class="speaker-img">
							<img src="<?php echo get_template_directory_uri(); ?>/css/img/recommend speakers/rasmus-lerdorf.jpg" alt="Rasmus Lerdorf">
						</div>

						<div class="speaker-intro">
							<header class="speaker-title">
								<h1>Rasmus Lerdorf</h1>
								<span>PHP之父</span>
							</header>
							<!-- <p>Rasmus Lerdorf出生於格陵蘭島凱凱塔蘇瓦克，是一個丹麥程式設計師，他擁有加拿大國籍。他也是程式語言PHP的創始人，其中PHP的頭兩個版本是由他編寫的，後來他也參與PHP後續版本的開發。勒多夫1988年畢業於安大略省金城中學，1993年畢業於滑鐵盧大學，獲得系統設計工程應用科學學士學位。2002年9月至2009年11月6日間，他在Yahoo!公司擔任基礎設施架構師。2010年，他加入WePay公司幫助開發其API。2011年起，他擔任創業顧問。
							</p> -->
						</div>

					</article>

					<!-- Speaker 2 -->
					<article class="post-item speaker">
						
						<div class="speaker-img">
							<img src="<?php echo get_template_directory_uri(); ?>/css/img/recommend speakers/brendan-eich.jpg" alt="Brendan Eich">
						</div>

						<div class="speaker-intro">
							<header class="speaker-title">
								<h1>Brendan Eich</h1>
									<span>Javascript之父</span>
							</header>
							<!-- <p>Rasmus Lerdorf出生於格陵蘭島凱凱塔蘇瓦克，是一個丹麥程式設計師，他擁有加拿大國籍。他也是程式語言PHP的創始人，其中PHP的頭兩個版本是由他編寫的，後來他也參與PHP後續版本的開發。勒多夫1988年畢業於安大略省金城中學，1993年畢業於滑鐵盧大學，獲得系統設計工程應用科學學士學位。2002年9月至2009年11月6日間，他在Yahoo!公司擔任基礎設施架構師。2010年，他加入WePay公司幫助開發其API。2011年起，他擔任創業顧問。
							</p> -->
						</div>

					</article>

					<!-- Speaker 3 -->
					<article class="post-item speaker">
						
						<div class="speaker-img">
							<img src="<?php echo get_template_directory_uri(); ?>/css/img/recommend speakers/tang-fong.jpg" alt="唐鳳">
						</div>

						<div class="speaker-intro">
							<header class="speaker-title">
								<h1>唐鳳</h1>
								<span>Haskell 與Perl 6 核心貢獻者</span>
							</header>
							<!-- <p>Rasmus Lerdorf出生於格陵蘭島凱凱塔蘇瓦克，是一個丹麥程式設計師，他擁有加拿大國籍。他也是程式語言PHP的創始人，其中PHP的頭兩個版本是由他編寫的，後來他也參與PHP後續版本的開發。勒多夫1988年畢業於安大略省金城中學，1993年畢業於滑鐵盧大學，獲得系統設計工程應用科學學士學位。2002年9月至2009年11月6日間，他在Yahoo!公司擔任基礎設施架構師。2010年，他加入WePay公司幫助開發其API。2011年起，他擔任創業顧問。
							</p> -->
						</div>

					</article>

				</div><!-- .post-wrapper -->
		
		</section>

		<section id="news">

			<h2 class="section-title">最新消息</h2>
			
			<div class="post-wrapper">

				<?php 

					$news_args =array(
						'post_type' 		=> 'post',
						'orderby' 			=> 'date',
						'order'				=> 'DESC',
						'posts_per_page' 	=> 3,
					);

					$news = new WP_Query( $news_args );

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
			</div><!-- .post-wrapper -->

		</section>

		<section id="sponsor">
			<h2 class="section-title">贊助廠商</h2>
			<ul>
				<h4>主辦單位</h4>
				<li>
					<a href="http://www.ithome.com.tw/" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/iThome.png" alt="iThome">
					</a>
				</li>
				<li>
					<a href="http://5xruby.tw" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/5xruby.png" alt="5xRuby">
					</a>
				</li>

			</ul>
			<ul>
				<h4>鑽石級</h4>
				<li>
					<a href="http://www.hinet.net/" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/chunghwa-telecom.png" alt="中華電信數據通信分公司">
					</a>
				</li>
				<li>
					<a href="http://www.fineart-tech.com/index.php/ch/" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/fineart.png" alt="精品科技">
					</a>
				</li>
				<li>
					<a href="http://www.armorize.com/" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/proofpoint.png" alt="阿碼證點">
					</a>
				</li>
				<li>
					<a href="http://www.trendmicro.tw/tw/index.html" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/trend.png" alt="趨勢科技">
					</a>
				</li>
			</ul>

			<ul>
				<h4>白金級</h4>
				<li>
					<a href="http://apac.ahnlab.com/site/main.do" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/ahnlab.png" alt="AhnLab">
					</a>
				</li>
				<li>
					<a href="http://www.air-watch.com/zh-hant/" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/air-watch.png" alt="Air-Watch">
					</a>
				</li>
				<li>
					<a href="http://www.arbornetworks.com/" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/arbor.png" alt="Arbor Networks">
					</a>
				</li>
				<li>
					<a href="https://www.bluecoat.com/" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/Blue-Coat.png" alt="Blue Coat">
					</a>
				</li>
			</ul>

			<ul>
				<h4>黃金級</h4>
				<li>
					<a href="https://www.barracuda.com/" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/barracuda.png" alt="Barracuda">
					</a>
				</li>
				<li>
					<a href="http://www.box-sol.com.tw/index.php/zh_tw/" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/box-solutions.png" alt="碩琦科技">
					</a>
				</li>
				<li>
					<a href="https://www.eset.tw/" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/ESET.png" alt="ESET">
					</a>
				</li>
				<li>
					<a href="http://www.sunwai.com/" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/f-secure.png" alt="F-Secure">
					</a>
				</li>
			</ul>

			<ul>
				<h4>銀級</h4>
				<li>
					<a href="http://www.checkpoint.com.tw/" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/check-point.png" alt="CheckPoint">
					</a>
				</li>
				<li>
					<a href="http://www.magg.com.tw/" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/gfi.png" alt="邁格行動(GFI)">
					</a>
				</li>
				<li>
					<a href="http://www.watchguard.com/" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/watchguard.png" alt="watchguard">
					</a>
				</li>
			</ul>

			<ul>
				<h4>特別感謝</h4>
				<li>
					<a href="http://www.most.gov.tw/" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/nsc.png" alt="行政院國家科學委員會">
					</a>
				</li>
				<li>
					<a href="http://www.citi.sinica.edu.tw/index_zh.php" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/citi.png" alt="中央研究院 資訊科技創新研究中心">
					</a>
				</li>
				<li>
					<a href="http://www.openfoundry.org/" target="_blank">
						<img src="<?php echo get_template_directory_uri(); ?>/css/img/logos/OSSF.png" alt="OpenFoundry">
					</a>
				</li>
			</ul>
		</section>
	</section><!-- #home -->



<?php  get_footer(); ?>