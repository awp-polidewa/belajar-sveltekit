<script>
	import SectionTitle from './SectionTitle.svelte';
	import ProjectCard from './ProjectCard.svelte';
</script>

<section id="skills">
	<div class="container">
		<header class="section-header">
			<!-- <p>My Skills</p> -->
			<SectionTitle Title="This Projek" />
			<h2>Teknik</h2>
			<p>
				Ini teknologi yang saya gunakan dalam membuat website modern, responsif, dan scalable untuk
				web
			</p>
		</header>

		<div class="projects-grid">
			<ProjectCard
				image="/images/projects/portofolio.png"
				code="P-001"
				title="Portfolio Website"
				provider="Personal Project"
				tags={['SvelteKit', 'Node.js']}
				issuedOn="2026"
				detailHref="https://github.com/awp-polidewa"
			/>
		</div>
	</div>
</section>
