<script>
	import Button from '$lib/components/Button.svelte';

	import MousePulsar from '$lib/components/MousePulsar.svelte';
	import CometTrail from '$lib/components/CometTrail.svelte';
</script>

<MousePulsar>
	<CometTrail>
		<section id="home" class="hero" aria-labelledby="hero-title">
			<div class="container">
				<div class="hero-content1">
					<p class="hero-badge">// AVAILABLE FOR WORK</p>

					<header class="hero-header">
						<p class="hero-greeting">Hi, I'm</p>

						<h1 id="hero-title">Agus Wandi <span class="span-putera">Putera</span></h1>

						<h2 class="hero-role">
							Full Stack Web Developer
							<span>&</span>
							AI Automation Engineer
						</h2>
					</header>

					<p class="hero-description">
						Saya membangun website modern, cepat, aman, dan scalable menggunakan SvelteKit, Node.js,
						Prisma, dan AI Automation.
					</p>

					<div class="hero-actions">
						<Button text="Get started" color="#ff5100" />
						<!-- Button -->
						<!-- Button -->
					</div>

					<nav class="hero-social" aria-label="Social media links">
						<!-- GitHub -->
						<!-- LinkedIn -->
						<!-- Email -->
					</nav>
				</div>
				<div class="hero-content2">
					<div class="pin-wrap">
						<div class="pulse-ring"></div>
						<div class="pulse-ring"></div>
						<div class="pulse-ring"></div>

						<!-- wrapper ini yg megang animasi bob, jadi text + pin naik turun bareng -->
						<div class="bob-group">
							<!-- SVG teks muter ngelilingin pin -->
							<svg class="orbit-text-svg" width="200" height="200" viewBox="0 0 200 200">
								<defs>
									<path
										id="orbitCirclePalopo"
										d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
										fill="none"
									/>
								</defs>
								<text class="orbit-text">
									<textPath href="#orbitCirclePalopo" startOffset="0%">
										PALOPO • PALOPO • PALOPO • PALOPO • PALOPO
									</textPath>
								</text>
							</svg>

							<svg
								class="pin-svg"
								width="120"
								height="170"
								viewBox="0 0 120 170"
								xmlns="http://www.w3.org/2000/svg"
							>
								<defs>
									<linearGradient id="pinBody" x1="0%" y1="0%" x2="100%" y2="100%">
										<stop offset="0%" stop-color="#ff5100" />
										<stop offset="45%" stop-color="#ff5100" />
										<stop offset="100%" stop-color="#ff5100" />
									</linearGradient>
									<radialGradient id="pinHighlight" cx="35%" cy="25%" r="60%">
										<stop offset="0%" stop-color="#000000" stop-opacity="0.55" />
										<stop offset="100%" stop-color="#00000" stop-opacity="0" />
									</radialGradient>
									<linearGradient id="holeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
										<stop offset="0%" stop-color="#000000" />
										<stop offset="100%" stop-color="#00000" />
									</linearGradient>
									<radialGradient id="holeShade" cx="50%" cy="70%" r="70%">
										<stop offset="60%" stop-color="#000000" />
										<stop offset="100%" stop-color="#00000033" />
									</radialGradient>
								</defs>
								<path
									d="M60 5 C29 5 5 29 5 60 C5 100 60 160 60 160 C60 160 115 100 115 60 C115 29 91 5 60 5 Z"
									fill="url(#pinBody)"
								/>
								<path
									d="M60 5 C29 5 5 29 5 60 C5 100 60 160 60 160 C60 160 115 100 115 60 C115 29 91 5 60 5 Z"
									fill="url(#pinHighlight)"
								/>
								<circle cx="60" cy="58" r="26" fill="url(#holeGrad)" />
								<circle cx="60" cy="58" r="26" fill="url(#holeShade)" />
							</svg>
						</div>
					</div>

					<p class="content2-span">
						Currently Building AWPCode Modern Web Platform with AI Automation Status ● In Progress
					</p>
				</div>
			</div>
		</section>
	</CometTrail>
</MousePulsar>

<style>
	.hero {
		min-height: 100vh;

		display: flex;
		align-items: center;

		padding-top: 6rem;
		padding-bottom: 4rem;
	}
	.container {
		width: min(90%, 1200px);
		margin-inline: auto;
		display: flex;
	}
	.hero-content1 {
		max-width: 620px;

		display: flex;
		flex-direction: column;
		gap: 1.3rem;
		margin: 0 auto;
		flex: 3;
	}
	.hero-content2 {
		flex: 3;
		position: relative;
		flex-direction: column;
		gap: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.content2-span {
		/* position: absolute; */
		bottom: 50px;
		left: 0;
		padding-left: 5px;
		border-left: 2px solid var(--color-primary);
	}

	h1 {
		color: var(--color-heading);
		font-size: 87px;
		line-height: 80px;
		margin: 1rem 0;
	}
	.span-putera {
		color: var(--color-primary);
		text-shadow: 0 0 8px rgb(255 81 0 / 60%);
		/* 0 0 16px rgb(255 81 0 / 40%); */
		/* 0 0 32px rgb(255 81 0 / 20%); */
	}

	/* lokasi pulsar */
	.pin-wrap {
		position: relative;
		width: 200px;
		height: 260px;
		margin: 0 auto;
	}

	.pulse-ring {
		position: absolute;
		left: 50%;
		bottom: 18px;
		width: 60px;
		height: 20px;
		border-radius: 50%;
		background: var(--color-primary);
		transform: translateX(-50%) scale(1);
		opacity: 0.6;
		animation: pulse 2s ease-out infinite;
	}
	.pulse-ring:nth-child(2) {
		animation-delay: 0.6s;
	}
	.pulse-ring:nth-child(3) {
		animation-delay: 1.2s;
	}

	@keyframes pulse {
		0% {
			transform: translateX(-50%) scale(1);
			opacity: 0.55;
		}
		100% {
			transform: translateX(-50%) scale(3.2);
			opacity: 0;
		}
	}

	/* wrapper baru: pegang animasi bob, isinya text-orbit + pin */
	.bob-group {
		position: absolute;
		left: 50%;
		bottom: 8px;
		transform: translateX(-50%);
		animation: bob 2.4s ease-in-out infinite;
	}

	@keyframes bob {
		0%,
		100% {
			transform: translateX(-50%) translateY(0);
		}
		50% {
			transform: translateX(-50%) translateY(-8px);
		}
	}

	/* svg teks yg muter ngelilingin pin */
	.orbit-text-svg {
		position: absolute;
		left: 50%;
		bottom: -15px;
		transform: translateX(-50%);
		animation: spin-orbit 12s linear infinite;
		pointer-events: none;
	}

	@keyframes spin-orbit {
		from {
			transform: translateX(-50%) rotate(0deg);
		}
		to {
			transform: translateX(-50%) rotate(360deg);
		}
	}

	.orbit-text {
		fill: #ff5100;
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 3px;
		font-family: sans-serif;
	}

	.pin-svg {
		position: relative;
		filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.35));
		/* animasi bob dipindah ke .bob-group, jangan taro di sini lagi */
	}

	/* responsif */
	@media (max-width: 768px) {
		.container {
			flex-direction: column;
		}
		.hero-content2 {
			flex-direction: column;
		}
		.content2-span {
			position: static;
			bottom: 0px;
		}
	}

	@media (max-width: 480px) {
		#hero-title {
			font-size: 3rem;
			line-height: 50px;
			text-align: center;
		}
		.hero-role {
			font-size: 16px;
			font-weight: 700;
		}
		.hero-description {
			font-size: 14px;
		}
		.pin-wrap {
			height: 210px;
		}
		.hero-badge {
			font-size: 12px;
		}
		.content2-span {
			font-size: 13px;
			margin-top: 1rem;
		}
		section {
			margin-bottom: 1rem;
		}
	}
</style>
