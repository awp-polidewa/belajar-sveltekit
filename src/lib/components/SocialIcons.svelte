<script>
	import Github from '$lib/icons/Github.svg';
	import Linkedin from '$lib/icons/Linkedin.svg';
	import Instagram from '$lib/icons/Instagram.svg';
	import Threads from '$lib/icons/Threads.svg';
	import Discord from '$lib/icons/Discord.svg';
</script>

<div class="icons">
	<a href="https://github.com/awp-polidewa">
		<img src={Github} alt="Github" class="svg" width="24" height="24" />
	</a>

	<a href="https://linkedin.com/in/...">
		<img src={Linkedin} alt="LinkedIn" class="svg" width="24" height="24" />
	</a>

	<a href="https://threads.net/@...">
		<img src={Threads} alt="Threads" class="svg" width="24" height="24" />
	</a>

	<a href="https://instagram.com/...">
		<img src={Instagram} alt="Instagram" class="svg" width="24" height="24" />
	</a>

	<a href="https://discord.gg/...">
		<img src={Discord} alt="Discord" class="svg" width="24" height="24" />
	</a>
</div>

<style>
	.icons {
		display: flex;
		align-items: center;
		justify-content: left;
		gap: 1rem;
	}

	img {
		/* Ini akan mengubah icon menjadi warna abu-abu netral */
		filter: invert(60%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%);
	}
</style>
