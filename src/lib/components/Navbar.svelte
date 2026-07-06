<script>
	let open = $state(false);
</script>

<nav>
	<h2>AwpCode</h2>
	<ul class:active={open}>
		<li><a href="/">Home</a></li>
		<li><a href="/about">About</a></li>
		<li><a href="/projects">Projects</a></li>
		<li><a href="/contact">Contact</a></li>
	</ul>
	<div class="humbergerMenu" class:active={open} onclick={() => (open = !open)}>
		<span></span>
		<span></span>
		<span></span>
	</div>
	<!-- <p>{open}Halo</p> -->
</nav>

<style>
	nav {
		width: min(1100px, 90%);
		margin: auto;
		display: flex;
		justify-content: space-between;
		height: 70px;
		position: fixed;
		align-items: center;
		top: 20px;
		right: 0;
		left: 0;
		padding: 0 2%;

		background-color: #ff5100;

		backdrop-filter: blur(15px);
		-webkit-backdrop-filter: blur(15px);

		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 20px;
	}
	.humbergerMenu {
		display: none;
	}
	ul {
		display: flex;

		width: clamp(250px, 80vw, 350px);

		gap: 32px;
		justify-content: space-between;
		align-items: center;
	}
	li {
		list-style: none;
	}
	a {
		text-decoration: none;
		color: rgb(39, 39, 39);
	}
	a:hover {
		color: #8a8a8f;
	}

	@media (max-width: 768px) {
		ul {
			background-color: aqua;
			position: fixed;
			top: 70px;
			right: -100%;
			/* width: 50%; */
			height: calc(100vh - 90px);

			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding-top: 40px;
			gap: 24px;

			transition: 0.3s;
		}
		ul.active {
			right: 20px;
		}

		.humbergerMenu {
			display: flex;
			width: 20px;
			height: 20px;
			justify-content: space-between;
			flex-direction: column;
		}
		span {
			height: 2px;
			background-color: black;
			transition: 0.3s ease;
		}
		.active span:nth-child(1) {
			transform: translateY(9px) rotate(45deg);
		}

		.active span:nth-child(2) {
			opacity: 0;
			transform: scale(0);
		}

		.active span:nth-child(3) {
			transform: translateY(-9px) rotate(-45deg);
		}
	}

	@media (max-width: 480px) {
		ul {
			/* width: 80%; */
		}
	}
</style>
