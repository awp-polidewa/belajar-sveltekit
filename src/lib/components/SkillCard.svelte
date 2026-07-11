<article class="skill-card">
	<div class="skill-icon"></div>
	<h3>Javascript</h3>
	<p>modern Javascript for building interactive web applications</p>
</article>

<style>
	.skill-card {
		position: relative;
		overflow: hidden;

		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 16px;

		padding: 24px;
		border-radius: 20px;

		background: var(--color-surface);
		border: 1px solid var(--color-border);

		cursor: pointer;
		transition:
			transform 0.3s ease,
			border-color 0.3s ease;
	}

	.skill-card:hover {
		transform: translateY(-6px);
		border-color: var(--color-primary);
	}

	.skill-card::after {
		content: '';
		position: absolute;
		top: 0;
		left: -60%;

		width: 50%;
		height: 100%;

		background: linear-gradient(
			to right,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.35) 50%,
			rgba(255, 255, 255, 0) 100%
		);

		transform: skewX(-18deg);
		transition: left 0.7s cubic-bezier(0.16, 1, 0.3, 1);

		pointer-events: none;
	}

	.skill-card:hover::after {
		left: 120%;
	}

	.skill-icon {
		width: 70px;
		aspect-ratio: 1;
		border-radius: 16px;
		background: var(--color-primary);
	}

	h3 {
		font-size: clamp(1.2rem, 2vw, 1.5rem);
	}

	p {
		line-height: 1.6;
		font-size: clamp(0.9rem, 1.5vw, 1rem);
	}
</style>
