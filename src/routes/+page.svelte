<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import MousePulsar from '$lib/components/MousePulsar.svelte';
	import About from '$lib/components/About.svelte';
	import GithubContributions from '$lib/components/GithubContributions.svelte';
</script>

<Navbar />

<MousePulsar>
	<Hero />
</MousePulsar>
<About />
<section class="github-section">
	<div class="container">
		<GithubContributions username="awp-polidewa" />
	</div>
</section>
