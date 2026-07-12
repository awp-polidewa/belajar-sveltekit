<script>
	const card = document.getElementById('tiltCard');

	card.addEventListener('mousemove', (e) => {
		const rect = card.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width; // 0..1
		const py = (e.clientY - rect.top) / rect.height; // 0..1

		card.style.setProperty('--x', `${px * 100}%`);
		card.style.setProperty('--y', `${py * 100}%`);
		card.classList.add('is-active');
	});

	card.addEventListener('mouseleave', () => {
		card.classList.remove('is-active');
	});
</script>

<div class="tilt-wrap">
	<article class="tilt-card" id="tiltCard">
		<h3>Gerakkan kursor di sini</h3>
		<p>
			Card ini miring mengikuti posisi kursor, dengan glow oranye yang ikut bergerak di baliknya.
		</p>
	</article>
</div>

<style>
	:root {
		--bg: #0f0f1a;
		--surface: #17171f;
		--border: #2a2a35;
		--accent: #ff5e13;
		--text: #e8e6e0;
		--muted: #8a8894;
	}

	* {
		box-sizing: border-box;
	}

	body {
		margin: 0;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg);
		font-family: -apple-system, 'Segoe UI', sans-serif;
	}

	.tilt-card {
		position: relative;
		width: 300px;
		padding: 2.25rem 1.75rem;
		border-radius: 18px;
		background: var(--surface);
		border: 1px solid var(--border);
		color: var(--text);
		overflow: hidden;
	}

	/* glow layer, follows cursor via --x/--y custom properties */
	.tilt-card::before {
		content: '';
		position: absolute;
		inset: -40%;
		background: radial-gradient(
			240px circle at var(--x, 50%) var(--y, 50%),
			rgba(255, 94, 19, 0.22),
			transparent 65%
		);
		opacity: 0;
		transition: opacity 0.2s ease-out;
		pointer-events: none;
	}

	.tilt-card.is-active::before {
		opacity: 1;
	}

	.tilt-card h3,
	.tilt-card p {
		position: relative;
		z-index: 1;
		margin: 0;
	}

	.tilt-card h3 {
		font-size: 1.1rem;
		margin-bottom: 0.6rem;
		color: var(--accent);
	}

	.tilt-card p {
		color: var(--muted);
		font-size: 0.875rem;
		line-height: 1.55;
	}
</style>
