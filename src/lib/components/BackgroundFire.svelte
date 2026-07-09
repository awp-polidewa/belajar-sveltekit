<script>
	import { onMount } from 'svelte';

	let canvasEl;
	let container;
	let rafId;
	let spawnTimer;

	// warna kembang api: orange brand + gold/white biar berasa "tahun baru"
	const palette = ['#ff5100', '#ffb700', '#ffffff', '#ff8a3d', '#ffd54a'];

	function launchFirework(ctx, width, height) {
		const particles = [];
		const startX = Math.random() * width;
		const startY = height;
		const targetY = height * (0.15 + Math.random() * 0.4); // ketinggian ledakan acak
		const color = palette[Math.floor(Math.random() * palette.length)];

		return {
			type: 'rocket',
			x: startX,
			y: startY,
			targetY,
			color,
			speed: 6 + Math.random() * 3,
			exploded: false,
			particles
		};
	}

	function explode(rocket) {
		const count = 40 + Math.floor(Math.random() * 30);
		for (let i = 0; i < count; i++) {
			const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
			const speed = 1.5 + Math.random() * 3.5;
			rocket.particles.push({
				x: rocket.x,
				y: rocket.y,
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed,
				alpha: 1,
				color: rocket.color,
				size: 1.5 + Math.random() * 1.5
			});
		}
		rocket.exploded = true;
	}

	onMount(() => {
		const ctx = canvasEl.getContext('2d');
		let width, height;
		let rockets = [];

		function resize() {
			width = container.clientWidth;
			height = container.clientHeight;
			canvasEl.width = width * devicePixelRatio;
			canvasEl.height = height * devicePixelRatio;
			canvasEl.style.width = width + 'px';
			canvasEl.style.height = height + 'px';
			ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
		}
		resize();

		const ro = new ResizeObserver(resize);
		ro.observe(container);

		function spawn() {
			rockets.push(launchFirework(ctx, width, height));
			spawnTimer = setTimeout(spawn, 550 + Math.random() * 700);
		}
		spawn();

		function tick() {
			// trail fade effect: nggak clearRect penuh, biar ada jejak cahaya dikit
			ctx.fillStyle = 'rgba(13, 13, 18, 0.22)';
			ctx.fillRect(0, 0, width, height);

			rockets.forEach((r) => {
				if (!r.exploded) {
					r.y -= r.speed;
					// trail garis roket naik
					ctx.beginPath();
					ctx.moveTo(r.x, r.y);
					ctx.lineTo(r.x, r.y + 10);
					ctx.strokeStyle = r.color;
					ctx.lineWidth = 2;
					ctx.globalAlpha = 0.9;
					ctx.stroke();

					if (r.y <= r.targetY) explode(r);
				} else {
					r.particles.forEach((p) => {
						p.x += p.vx;
						p.y += p.vy;
						p.vy += 0.045; // gravitasi
						p.alpha -= 0.014;

						if (p.alpha > 0) {
							ctx.globalAlpha = p.alpha;
							ctx.fillStyle = p.color;
							ctx.beginPath();
							ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
							ctx.fill();
						}
					});
					r.particles = r.particles.filter((p) => p.alpha > 0);
				}
			});
			ctx.globalAlpha = 1;

			rockets = rockets.filter((r) => !r.exploded || r.particles.length > 0);

			rafId = requestAnimationFrame(tick);
		}
		tick();

		return () => {
			cancelAnimationFrame(rafId);
			clearTimeout(spawnTimer);
			ro.disconnect();
		};
	});
</script>

<div class="fw-container" bind:this={container}>
	<canvas bind:this={canvasEl}></canvas>
</div>

<style>
	.fw-container {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		border-radius: inherit;
	}
	canvas {
		display: block;
	}
</style>
