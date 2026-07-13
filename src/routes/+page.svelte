<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import GitHubContributions from '$lib/components/GitHubContributions.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Navbar />
<Hero />
<About />
<Skills />
<GitHubContributions username="awp-polidewa" />
<Projects />
<Footer />
