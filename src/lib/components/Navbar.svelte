<script>
	let open = $state(false);
</script>

<nav>
	<h2>Aw<span class="logo-span">pC</span>ode</h2>
	<ul class:active={open}>
		<li><a href="/">Home</a></li>
		<li><a href="/about">About</a></li>
		<li><a href="/projects">Projects</a></li>
		<li><a href="/contact">Contact</a></li>
	</ul>
	<button
		type="button"
		class="humbergerMenu"
		class:active={open}
		onclick={() => (open = !open)}
		aria-label="Toggle menu"
	>
		<span class="spanX"></span>
		<span class="spanX"></span>
		<span class="spanX"></span>
	</button>
</nav>

<style>
	.logo-span {
		color: var(--color-primary);
	}
	nav {
		display: flex;
		justify-content: space-between;
		height: 70px;
		position: fixed;
		align-items: center;
		top: 0; /* Ubah dari 20px ke 0 agar menempel sempurna */
		right: 0;
		left: 0;
		padding: 0 5%;
		background-color: #0a0a0a; /* Warna solid */
		border-bottom: 2px solid var(--color-border);
		z-index: 1000; /* Penting agar selalu di atas */
	}

	h2 {
		font-family: var(--font-accent);
	}
	button {
		display: none;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
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
	button {
		background-color: none;
	}
	a {
		text-decoration: none;
		/* color: rgb(158, 158, 158); */
		color: var(--color-text);
	}
	a:hover {
		color: #8a8a8f;
	}

	@media (max-width: 768px) {
		ul {
			background-color: var(--color-bg);
			position: fixed;
			top: 70px;
			right: -100%;
			/* height: 100vh; */
			height: calc(100vh - 70px);

			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding-top: 40px;
			gap: 24px;

			transition: 0.3s;
		}
		ul.active {
			right: 0px;
		}

		button {
			display: flex;
			width: 25px;
			height: 20px;
			flex-direction: column;
			justify-content: space-between;
		}
		.spanX {
			height: 2px;
			transition: 0.3s ease;
			background-color: var(--color-primary);
		}
		.humbergerMenu.active .spanX:nth-child(1) {
			transform: translateY(9px) rotate(45deg);
		}

		.humbergerMenu.active .spanX:nth-child(2) {
			opacity: 0;
		}

		.humbergerMenu.active .spanX:nth-child(3) {
			transform: translateY(-9px) rotate(-45deg);
		}
	}

	@media (max-width: 480px) {
		ul {
			width: 80%;
		}
	}
</style>
