<script>
	import SocialIcons from './SocialIcons.svelte';
	import TiltCard from './TiltCard.svelte';
</script>

<footer>
	<TiltCard class="cert-bdoy">
		<div class="container">
			<div class="footer-header">
				<div class="footer-header1">
					<span>Agus Wandi Putera</span>
					<p>the only way to do great work is to love what you do. - Steve Jobs</p>
					<SocialIcons />
				</div>
				<div id="footer-header">
					<div class="footer-header2">
						<h4>Pages</h4>
						<a href="/">Home</a>
						<a href="/">About</a>
						<a href="/">Blog</a>
						<a href="/">Contact</a>
					</div>
					<div class="footer-header3">
						<h4>Explore</h4>
						<a href="/">Portofolio</a>
						<a href="/">Guestbook</a>
						<a href="/">Service Status</a>
						<a href="/">Dibalik Layar</a>
					</div>
					<div class="footer-header4">
						<h4>Insights</h4>
						<a href="/">Statistik</a>
						<a href="/">My Setup</a>
						<a href="/">Usefu l Status</a>
						<a href="/">Links</a>
					</div>
				</div>
			</div>
			<div class="footer-body">
				<p>awpcode.<span>©2026</span></p>
			</div>
		</div>
	</TiltCard>
</footer>

<style>
	footer {
		margin-bottom: 3rem;
		padding: 2rem 2rem 0 2rem;
		height: 400px;
		border-radius: 24px;
		clip-path: inset(0 round 24px);
		overflow: hidden;
	}
	.container {
		height: 400px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		background-color: rgb(15, 15, 15);
		border-radius: 24px;
		padding: 2rem 2rem 0 2rem;
		flex-direction: column;
		overflow: hidden;
	}
	h4 {
		margin-bottom: 1rem;
		font-size: 1.5rem;
		color: var(--color-heading);
	}
	a {
		text-decoration: none;
		color: var(--color-text);
	}
	span {
		font-size: 3.5rem;
		font-weight: 700;
		/* background-color: blue; */
		line-height: 38px;
	}
	.footer-header {
		display: flex;
		gap: 1rem;
		position: relative;
		justify-content: space-between;
		width: 100%;
		/* background-color: azure; */
	}
	#footer-header {
		display: flex;
		/* background-color: aqua; */
		flex: 1;
		gap: 1rem;
	}
	#footer-header {
		/* background-color: blue; */
		justify-content: space-around;
		/* padding: 0 1rem; */
	}
	.footer-header1 {
		flex: 1;
		justify-content: space-between;
		display: flex;
		flex-direction: column;
	}

	/* .footer-header1, */
	.footer-header2,
	.footer-header3,
	.footer-header4 {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}

	.footer-body p {
		font-size: 10rem;
		font-weight: 800;
	}
	.footer-body p span {
		font-size: 2rem;
	}
</style>
