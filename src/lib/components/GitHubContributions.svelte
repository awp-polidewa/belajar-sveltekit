<script>
	import { onMount } from 'svelte';

	let { username = 'AWP-CODE' } = $props();

	let contributions = $state([]);
	let total = $state(0);
	let loading = $state(true);
	let error = $state(null);

	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	async function loadData() {
		try {
			loading = true;
			const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
			if (!res.ok) throw new Error('Gagal ambil data GitHub');
			const data = await res.json();
			contributions = data.contributions;
			total = Object.values(data.total)[0] ?? 0;
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		loadData();
	});

	// susun data mentah (array harian) jadi kolom minggu, kayak layout asli GitHub
	function buildWeeks(days) {
		if (!days.length) return [];
		const weeks = [];
		let week = [];

		// padding di awal biar hari pertama jatuh di baris (0=Minggu) yg bener
		const firstDay = new Date(days[0].date).getDay();
		for (let i = 0; i < firstDay; i++) week.push(null);

		for (const day of days) {
			week.push(day);
			if (week.length === 7) {
				weeks.push(week);
				week = [];
			}
		}
		if (week.length) weeks.push(week);
		return weeks;
	}

	let weeks = $derived(buildWeeks(contributions));

	// stats turunan
	let bestDay = $derived(contributions.length ? Math.max(...contributions.map((d) => d.count)) : 0);
	let thisWeekCount = $derived(contributions.slice(-7).reduce((sum, d) => sum + d.count, 0));
	let average = $derived(contributions.length ? Math.round(total / contributions.length) : 0);

	// label bulan: taro di kolom minggu pertama tiap bulan baru muncul
	function monthLabels(weeks) {
		const labels = [];
		let lastMonth = -1;
		weeks.forEach((week, i) => {
			const firstValidDay = week.find((d) => d);
			if (!firstValidDay) return;
			const month = new Date(firstValidDay.date).getMonth();
			if (month !== lastMonth) {
				labels.push({ index: i, name: months[month] });
				lastMonth = month;
			}
		});
		return labels;
	}
	let labels = $derived(monthLabels(weeks));
</script>

<section class="github-section">
	<div class="container">
		<div class="contrib-card">
			<div class="contrib-header">
				<div>
					<h3>Contributions</h3>
					<p>A year of commits & debugging sessions <span class="handle">@{username}</span></p>
				</div>

				{#if !loading && !error}
					<div class="contrib-stats">
						<div><strong>{total.toLocaleString()}</strong><span>TOTAL</span></div>
						<div><strong>{thisWeekCount}</strong><span>THIS WEEK</span></div>
						<div><strong>{bestDay}</strong><span>BEST DAY</span></div>
						<div><strong>{average}</strong><span>AVG/DAY</span></div>
					</div>
				{/if}
			</div>

			{#if loading}
				<p class="status">Loading...</p>
			{:else if error}
				<p class="status error">{error}</p>
			{:else}
				<div class="grid-wrap">
					<div class="month-row">
						{#each labels as label (label.index)}
							<span class="month-label" style="grid-column:{label.index + 1}">{label.name}</span>
						{/each}
					</div>

					<div class="grid" style="grid-template-columns: repeat({weeks.length}, 1fr)">
						{#each weeks as week, weekIndex (weekIndex)}
							<div class="week-col">
								{#each week as day, dayIndex (day ? day.date : `${weekIndex}-${dayIndex}`)}
									<div
										class="cell level-{day ? day.level : -1}"
										title={day ? `${day.count} contributions on ${day.date}` : ''}
									></div>
								{/each}
							</div>
						{/each}
					</div>
				</div>

				<div class="legend">
					<span>Less</span>
					<div class="cell level-0"></div>
					<div class="cell level-1"></div>
					<div class="cell level-2"></div>
					<div class="cell level-3"></div>
					<div class="cell level-4"></div>
					<span>More</span>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.contrib-card {
		background: #0d0d12;
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 16px;
		padding: clamp(16px, 3vw, 32px);
		color: #e5e5e5;
	}
	.contrib-header {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}
	.contrib-header h3 {
		font-size: 1.6rem;
		margin: 0 0 4px;
	}
	.contrib-header p {
		color: #888;
		font-size: 0.85rem;
		margin: 0;
	}
	.handle {
		color: var(--color-primary, #ff5100);
	}
	.contrib-stats {
		display: flex;
		gap: 1.5rem;
	}
	.contrib-stats div {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.contrib-stats strong {
		font-size: 1.3rem;
		color: var(--color-primary, #ff5100);
	}
	.contrib-stats span {
		font-size: 0.6rem;
		letter-spacing: 0.08em;
		color: #777;
	}

	.grid-wrap {
		overflow-x: auto;
	}
	.month-row {
		display: grid;
		font-size: 0.7rem;
		color: #888;
		margin-bottom: 4px;
		min-width: 620px;
	}
	.grid {
		display: grid;
		gap: 3px;
		min-width: 620px;
	}
	.week-col {
		display: grid;
		grid-template-rows: repeat(7, 1fr);
		gap: 3px;
	}
	.cell {
		width: 100%;
		aspect-ratio: 1 / 1;
		border-radius: 2px;
		background: #1b1b23;
	}
	.level--1 {
		background: transparent;
	}
	.level-0 {
		background: #1b1b23;
	}
	.level-1 {
		background: color-mix(in srgb, var(--color-primary, #ff5100) 25%, #1b1b23);
	}
	.level-2 {
		background: color-mix(in srgb, var(--color-primary, #ff5100) 50%, #1b1b23);
	}
	.level-3 {
		background: color-mix(in srgb, var(--color-primary, #ff5100) 75%, #1b1b23);
	}
	.level-4 {
		background: var(--color-primary, #ff5100);
	}

	.legend {
		display: flex;
		align-items: center;
		gap: 4px;
		margin-top: 1rem;
		font-size: 0.7rem;
		color: #777;
	}
	.legend .cell {
		width: 12px;
		height: 12px;
	}
	.status {
		color: #777;
		font-size: 0.85rem;
	}
	.status.error {
		color: #ff5100;
	}
</style>
