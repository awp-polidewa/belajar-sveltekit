<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import MousePulsar from '$lib/components/MousePulsar.svelte';
	import About from '$lib/components/About.svelte';
	import GitHubContributions from '$lib/components/GitHubContributions.svelte';
</script>

<Navbar />

<MousePulsar>
	<Hero />
</MousePulsar>
<About />
<section class="github-section">
	<div class="container">
		<GitHubContributions username="awp-polidewa" />
	</div>
</section>
