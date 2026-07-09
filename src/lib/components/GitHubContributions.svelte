<script>
	import { onMount } from 'svelte';
	import BackgroundFire from '$lib/components/BackgroundFire.svelte';

	let { username = 'AWP-CODE' } = $props();

	let contributions = $state([]);
	let total = $state(0);
	let loading = $state(true);
	let error = $state(null);
	let hoveredDay = $state(null);
	let tooltipPos = $state({ x: 0, y: 0 });

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

	function buildWeeks(days) {
		if (!days.length) return [];
		const weeks = [];
		let week = [];
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

	// Variabel Derived (Harus ada sebelum dipakai di HTML)
	let weeks = $derived(buildWeeks(contributions));
	let bestDay = $derived(contributions.length ? Math.max(...contributions.map((d) => d.count)) : 0);
	let thisWeekCount = $derived(contributions.slice(-7).reduce((sum, d) => sum + d.count, 0));
	let average = $derived(contributions.length ? Math.round(total / contributions.length) : 0);

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

	function formatDate(dateStr) {
		return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}

	function showTooltip(e, day) {
		if (!day) return;
		const rect = e.currentTarget.getBoundingClientRect();
		tooltipPos = { x: rect.left + rect.width / 2, y: rect.top };
		hoveredDay = day;
	}

	function hideTooltip() {
		hoveredDay = null;
	}
</script>

<div class="contrib-card">
	<BackgroundFire />
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
		<div class="grid-wrap custom-scrollbar">
			<div class="month-row" style="grid-template-columns: repeat({weeks.length}, 1fr)">
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
								class:has-data={!!day}
								role="presentation"
								onmouseenter={(e) => showTooltip(e, day)}
								onmouseleave={hideTooltip}
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

		{#if hoveredDay}
			<div class="cell-tooltip" style="left:{tooltipPos.x}px; top:{tooltipPos.y}px;">
				<strong>{hoveredDay.count}</strong> contributions on {formatDate(hoveredDay.date)}
			</div>
		{/if}
	{/if}
</div>

<style>
	.contrib-card {
		background: #0d0d12;
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 16px;
		padding: clamp(16px, 3vw, 32px);
		color: #e5e5e5;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow: hidden;
		gap: 2.5rem;

		/* background: #0d0d12; */
		/* border: 1px solid rgba(255, 255, 255, 0.06); */
		/* border-radius: 16px; */
		/* padding: clamp(16px, 3vw, 32px); */
		/* color: #e5e5e5; */
	}
	.contrib-header,
	.grid-wrap,
	.legend,
	.status {
		position: relative;
		z-index: 1;
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
		max-width: 100%;
		padding: 10px;
		margin: -10px;
	}
	.month-row {
		display: grid;
		font-size: 0.7rem;
		color: #888;
		margin-bottom: 4px;
	}
	.grid {
		display: grid;
		gap: 3px;
	}
	.week-col {
		display: grid;
		grid-template-rows: repeat(7, 1fr);
		gap: 3px;
	}
	.cell {
		width: 100%;
		aspect-ratio: 1 / 1;
		border-radius: 3px;
		background: #1e1e24;
		/* background: #1b1b23; */
		border: 1.5px solid transparent;
		box-sizing: border-box;
		cursor: pointer;
		transition: all 0.4s ease 0.1s;

		/* transition:
			transform 0.12s ease,
			box-shadow 0.12s ease,
			border-color 0.12s ease; */
	}
	.cell.has-data:hover {
		border-color: #fff;
		box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
		z-index: 2;
		position: relative;
		transform: none;

		filter: brightness(1.3); /* Membuat efek terang saat hover tanpa merubah size */
		border-color: rgba(255, 255, 255, 0.4);
		/* transition: all 0.2s ease; */
		transition: all 0.2s ease 0s;

		/* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5); */
	}

	.cell-tooltip {
		background: #0d0d12;
		border: 1px solid #333;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
		padding: 8px 14px;
		border-radius: 6px;
		font-weight: 500;

		position: fixed;
		transform: translate(-50%, calc(-100% - 10px));
		background: #1c1c22;
		color: #eee;
		font-size: 0.78rem;
		/* padding: 7px 12px; */
		/* border-radius: 8px; */
		white-space: nowrap;
		pointer-events: none;
		z-index: 50;
		/* box-shadow: 0 6px 16px rgba(0, 0, 0, 0.45); */
		/* border: 1px solid rgba(255, 255, 255, 0.08); */
	}
	.cell-tooltip::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 100%;
		transform: translateX(-50%);
		border: 6px solid transparent;
		border-top-color: #1c1c22;
	}
	.cell-tooltip strong {
		color: var(--color-primary, #ff5100);
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

	/* Styling scrollbar untuk Chrome, Safari, dan Edge */
	.custom-scrollbar::-webkit-scrollbar {
		height: 4px; /* Mengatur tinggi scrollbar menjadi tipis */
	}

	.custom-scrollbar::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05); /* Warna latar track (transparan gelap) */
		border-radius: 10px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(
			255,
			100,
			0,
			0.6
		); /* Warna batang scroll (sesuaikan dengan warna orange Anda) */
		border-radius: 10px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 100, 0, 0.9); /* Warna saat di-hover agar lebih jelas */
	}
</style>
