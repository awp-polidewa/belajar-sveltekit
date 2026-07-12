<script>
	import SectionTitle from './SectionTitle.svelte';
	import SkillCard from './SkillCard.svelte';
</script>

<section id="skills">
	<div class="container">
		<header class="section-header">
			<!-- <p>My Skills</p> -->
			<SectionTitle Title="My Skills" />
			<h2>Teknology I use</h2>
			<p>
				Ini teknologi yang saya gunakan dalam membuat website modern, responsif, dan scalable untuk
				web
			</p>
		</header>

		<div class="skills-grid">
			<SkillCard />
			<SkillCard />
			<SkillCard />
			<SkillCard />
		</div>
	</div>
</section>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
	.skills-grid {
		display: grid;

		grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));

		gap: 24px;
	}
</style>
