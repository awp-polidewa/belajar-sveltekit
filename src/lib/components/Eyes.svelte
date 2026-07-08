<script>
	import { onMount } from 'svelte';

	let ballRefs = []; // Array untuk menyimpan referensi elemen

	function handleMouseMove(e) {
		ballRefs.forEach((ball) => {
			if (!ball) return;
			const eyeRect = ball.parentElement.getBoundingClientRect();
			const eyeCenterX = eyeRect.left + eyeRect.width / 2;
			const eyeCenterY = eyeRect.top + eyeRect.height / 2;

			const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);

			const ballRadiusX = ball.offsetWidth / 2;
			const ballRadiusY = ball.offsetHeight / 2;

			const translationX = (eyeRect.width / 2 - ballRadiusX) * Math.cos(angle);
			const translationY = (eyeRect.height / 2 - ballRadiusY) * Math.sin(angle);

			ball.style.transform = `translate(${translationX}px, ${translationY}px)`;
		});
	}
	// function handleMouseMove(e) {
	// 	ballRefs.forEach((ball) => {
	// 		if (!ball) return;
	// 		const eyeRect = ball.parentElement.getBoundingClientRect();
	// 		const eyeCenterX = eyeRect.left + eyeRect.width / 2;
	// 		const eyeCenterY = eyeRect.top + eyeRect.height / 2;

	// 		const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
	// 		const translationX = (eyeRect.width / 2 - ball.offsetWidth / 2) * Math.cos(angle);
	// 		const translationY = (eyeRect.height / 2 - 30) * Math.sin(angle);

	// 		ball.style.transform = `translate(${translationX}px, ${translationY}px)`;
	// 	});
	// }

	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	});
</script>

<div class="center">
	<div class="face">
		<div class="eye"><div class="ball" bind:this={ballRefs[0]}></div></div>
		<div class="eye"><div class="ball" bind:this={ballRefs[1]}></div></div>
	</div>
</div>

<style>
	.center {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	.face {
		width: 60%;
		height: 60%;
		max-width: 500px;
		max-height: 500px;
		border-radius: 50%;
		background: radial-gradient(
			circle at 60% 40%,
			var(--color-primary),
			var(--color-primary),
			var(--color-primary)
		);
		box-shadow: 0 0 80px 50px rgba(255, 0, 0, 0.788) inset;

		position: absolute;
		top: 50%; /* 50%, bukan 40% -> center vertikal beneran */
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.eye {
		width: 30%;
		height: 30%;
		background: radial-gradient(
			circle at 60% 40%,
			rgb(255, 255, 255),
			rgb(220, 220, 220),
			rgb(200, 200, 200)
		);
		border-radius: 50%;
		box-shadow: 0 0 25px 5px rgba(0, 0, 0, 0.2) inset;

		position: absolute;
		top: 20%;
		left: 15%;
	}
	.eye:nth-child(2) {
		left: auto;
		right: 15%;
	}
	.ball {
		position: absolute;
		width: 40%;
		height: 40%;
		background: radial-gradient(
			circle at 60% 40%,
			rgb(170, 170, 170),
			rgb(30, 30, 30),
			rgb(45, 45, 45)
		);
		border-radius: 50%;
		top: 30%;
		left: 30%;
		transition: 0.2s;
	}
	@media (min-width: 768px) {
		.face {
			width: 40%;
			height: 40%;
		}
	}
</style>
