<script>
	import Button from '$lib/components/Button.svelte';
	import Eyes from '$lib/components/Eyes.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
</script>

<section id="about" class="about">
	<div class="container">
		<div class="about-animation">
			<div class="about-container">
				<Eyes />
			</div>
		</div>
		<div class="about-content">
			<SectionTitle Title="About me" />

			<h3>Fullstak Web Developer</h3>
			<p>Halo, saya agus wandi putera...</p>
			<p>
				Saya fokus membangun website modern menggunakan SvelteKit, Node.js, Express.js, dan MySQL.
			</p>

			<div class="about-info">
				<div>
					<h4>4+</h4>
					<p>Semester</p>
				</div>
				<div>
					<h4>15+</h4>
					<p>Projects</p>
				</div>
				<div>
					<h4>Fullstak</h4>
					<p>Web Developer</p>
				</div>
			</div>
			<Button text="Download Cv" color="#ff5100" />
		</div>
	</div>
</section>

<style>
	.about {
		align-items: center;
		min-height: 100vh;
	}
	.container {
		gap: 40px;
		display: flex;
		flex-direction: column;
		margin: auto;
	}
	.about-animation,
	.about-content {
		flex: 1 1 0%;
		min-width: 0;
		position: relative;
		/* background-color: blue; */
	}
	.about-container {
		width: 100%;
		position: relative;

		aspect-ratio: 1 / 1; /* kotak, ikut lebar parent-nya */
		max-height: 600px; /* biar di layar super lebar nggak raksasa */
	}

	.about-animation {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.about-content {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		align-items: flex-start;
	}
	.about-info {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 0.8rem;
	}

	h3 {
		font-size: 2rem;
	}

	/* khusus layar gede: about-content pindah ke kanan */
	@media (min-width: 1024px) {
		.container {
			flex-direction: row;
			align-items: center;
		}
	}
</style>
