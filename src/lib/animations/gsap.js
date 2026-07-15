<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	onMount(() => {
		gsap.from('.skills-card', {
			scrollTrigger: {
				trigger: '.skills-card',
				start: 'top 80%'
			},
			y: 80,
			opacity: 0,
			duration: 0.8
		});
	});
</script>