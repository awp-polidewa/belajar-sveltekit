<script>
	import CometTrail from './CometTrail.svelte';
	let { children } = $props(); // Svelte 5 slot baru
</script>

<div class="mouse-pulsar-wrapper">
	<CometTrail>
		{@render children?.()}
	</CometTrail>
</div>

<style>
	.mouse-pulsar-wrapper {
		position: relative;
		width: 100%;
		inset: 0;
		z-index: 10; /* Pastikan di atas konten tapi di bawah elemen interaktif penting */
	}
</style>
