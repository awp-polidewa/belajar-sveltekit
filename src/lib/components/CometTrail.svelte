<script>
	import { onMount } from 'svelte';

	// Mendefinisikan children sebagai snippet
	let { children } = $props();

	const DOT_COUNT = 14;
	const LERP = 0.35;

	let containerEl = $state();
	let dots = $state(Array.from({ length: DOT_COUNT }, () => ({ x: 0, y: 0 })));
	let mouse = { x: 0, y: 0 };
	let active = $state(false);
	let rafId;

	function handleMove(e) {
		if (!containerEl) return;
		const rect = containerEl.getBoundingClientRect();
		mouse.x = e.clientX - rect.left;
		mouse.y = e.clientY - rect.top;
		active = true;
	}

	function handleLeave() {
		active = false;
	}

	function tick() {
		dots[0].x += (mouse.x - dots[0].x) * LERP;
		dots[0].y += (mouse.y - dots[0].y) * LERP;

		for (let i = 1; i < dots.length; i++) {
			dots[i].x += (dots[i - 1].x - dots[i].x) * LERP;
			dots[i].y += (dots[i - 1].y - dots[i].y) * LERP;
		}

		rafId = requestAnimationFrame(tick);
	}

	onMount(() => {
		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	});
</script>

<div
	class="comet-area"
	bind:this={containerEl}
	role="presentation"
	onmousemove={handleMove}
	onmouseleave={handleLeave}
>
	{@render children?.()}

	<div class="comet-layer" class:visible={active}>
		{#each dots as dot, i (i)}
			<div
				class="comet-dot"
				style:transform="translate3d({dot.x}px, {dot.y}px, 0) translate(-50%, -50%)"
				style:width="{14 - i * 0.8}px"
				style:height="{14 - i * 0.8}px"
				style:opacity={1 - i / dots.length}
			></div>
		{/each}
	</div>
</div>

<style>
	.comet-area {
		position: relative;
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
	}

	.comet-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 9999;
		opacity: 0;
		transition: opacity 0.2s;
	}

	.comet-layer.visible {
		opacity: 1;
	}

	.comet-dot {
		position: absolute;
		border-radius: 50%;
		background: #ff5100;
		will-change: transform;
		box-shadow: 0 0 8px #ff5100;
	}
</style>
