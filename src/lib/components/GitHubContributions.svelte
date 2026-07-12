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

	// index 0 = Senin ... index 6 = Minggu. Minggu sekarang dimulai dari Senin
	// (lihat penyesuaian firstDay di buildWeeks di bawah), jadi urutan label ini
	// harus ikut Senin -> Minggu, bukan Minggu -> Sabtu kayak default JS Date.
	const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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
		// getDay() balikin 0=Minggu...6=Sabtu. Karena minggu kita mau mulai dari
		// Senin, geser jadi 0=Senin...6=Minggu dulu sebelum dipakai buat padding.
		const rawFirstDay = new Date(days[0].date).getDay();
		const firstDay = (rawFirstDay + 6) % 7;
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

<section class="github-section">
	<div class="container">
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
				<div class="graph-row">
					<!-- kolom label hari, TIDAK ikut scroll horizontal -->
					<div class="day-labels">
						<span class="month-row-spacer"></span>
						<div class="day-label-col">
							{#each dayLabels as label, i (i)}
								<span class="day-label">{label}</span>
							{/each}
						</div>
					</div>

					<div class="grid-wrap custom-scrollbar">
						<div
							class="month-row"
							style="grid-template-columns: repeat({weeks.length}, var(--cell-size))"
						>
							{#each labels as label (label.index)}
								<span class="month-label" style="grid-column:{label.index + 1}">{label.name}</span>
							{/each}
						</div>

						<div
							class="grid"
							style="grid-template-columns: repeat({weeks.length}, var(--cell-size))"
						>
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
				</div>

				<div class="legend">
					<span>Sedikit</span>
					<div class="cell level-0"></div>
					<div class="cell level-1"></div>
					<div class="cell level-2"></div>
					<div class="cell level-3"></div>
					<div class="cell level-4"></div>
					<span>Gacor</span>
				</div>

				{#if hoveredDay}
					<div class="cell-tooltip" style="left:{tooltipPos.x}px; top:{tooltipPos.y}px;">
						<strong>{hoveredDay.count}</strong> contributions on {formatDate(hoveredDay.date)}
					</div>
				{/if}
			{/if}
		</div>
	</div>
</section>

<style>
	.contrib-card {
		--cell-size: 17px;

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

		max-width: 1200px;
		margin-inline: auto;
	}

	/* .container {
		display: flex;
		justify-content: center;
		align-items: center;
	} */

	/* layar kecil: cell lebih kecil biar muat lebih banyak sebelum harus discroll,
	   dan scrollbar-nya lebih tipis lagi */
	@media (max-width: 640px) {
		.contrib-card {
			--cell-size: 9px;
		}
		.day-labels {
			padding-right: 3px;
		}
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

	/* --- wrapper yang gabungin kolom label hari + area grid yang bisa discroll --- */
	.graph-row {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: flex-start;
		gap: 6px;
	}

	/* kolom label hari: fixed, gak ikut overflow-x scroll punya .grid-wrap */
	.day-labels {
		display: flex;
		justify-content: left;
		flex-direction: column;
		flex-shrink: 0;
		padding-right: 1rem;
	}
	.month-row-spacer {
		display: block;
		height: 0.7rem;
		line-height: 0.7rem;
		margin-bottom: 4px;
	}
	.day-label-col {
		display: grid;
		grid-template-rows: repeat(7, var(--cell-size));
		gap: 3px;
	}
	.day-label {
		font-size: 0.6rem;
		line-height: var(--cell-size);
		color: #777;
		text-align: right;
		padding-right: 2px;
		white-space: nowrap;
	}

	.grid-wrap {
		overflow-x: auto;
		max-width: 100%;
		flex: 1;
		min-width: 0; /* penting: biar flex child boleh menyusut lebih kecil dari content-nya, baru overflow-x jalan */
		padding: 10px 0;
		margin: -10px;
	}
	.month-row {
		display: grid;
		font-size: 0.7rem;
		line-height: 0.7rem;
		color: #888;
		margin-bottom: 4px;
	}
	.grid {
		display: grid;
		gap: 3px;
	}
	.week-col {
		display: grid;
		grid-template-rows: repeat(7, var(--cell-size));
		gap: 3px;
	}
	.cell {
		width: var(--cell-size);
		height: var(--cell-size);
		border-radius: 3px;
		background: #1e1e24;
		border: 1.5px solid transparent;
		box-sizing: border-box;
		cursor: pointer;
		transition: all 0.4s ease 0.1s;
	}
	.cell.has-data:hover {
		border-color: #fff;
		box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
		z-index: 2;
		position: relative;
		transform: none;

		filter: brightness(1.3); /* Membuat efek terang saat hover tanpa merubah size */
		border-color: rgba(255, 255, 255, 0.4);
		transition: all 0.2s ease 0s;
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
		white-space: nowrap;
		pointer-events: none;
		z-index: 50;
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

	@media (max-width: 640px) {
		.custom-scrollbar::-webkit-scrollbar {
			height: 3px;
		}
	}
</style>
