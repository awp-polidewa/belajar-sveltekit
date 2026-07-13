<script>
	// 5 Lensa
	// State   : x, y (posisi kursor dalam %) + isActive -> $state, di-reset tiap mouseleave
	// Trigger : onmousemove di wrapper -> update x/y; onmouseleave -> matikan isActive
	// Effect  : glow (radial-gradient di ::before) mengikuti kursor lewat CSS custom properties
	// Edge    : wrapper ini TIDAK punya styling layout sendiri (padding/background) -- itu tanggung
	//           jawab elemen yang dibungkus lewat prop `class`, supaya TiltCard reusable di mana saja
	// Boundary: overflow: hidden wajib di wrapper ini biar glow (inset -40%) gak bocor keluar area body

	let { children, class: className = '' } = $props();

	let x = $state(50);
	let y = $state(50);
	let isActive = $state(false);

	function handleMouseMove(e) {
		const rect = e.currentTarget.getBoundingClientRect();
		x = ((e.clientX - rect.left) / rect.width) * 100;
		y = ((e.clientY - rect.top) / rect.height) * 100;
		isActive = true;
	}

	function handleMouseLeave() {
		isActive = false;
	}
</script>

<div
	class="tilt-glow {className}"
	class:is-active={isActive}
	style="--x: {x}%; --y: {y}%;"
	role="presentation"
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
>
	{@render children?.()}
</div>

<style>
	.tilt-glow {
		position: relative;
		overflow: hidden;
		border-radius: 24px;
	}

	.tilt-glow::before {
		content: '';
		position: absolute;
		inset: -40%;
		background: radial-gradient(
			640px circle at var(--x, 50%) var(--y, 50%),
			rgba(143, 142, 142, 0.22),
			transparent 65%
		);
		opacity: 0;
		transition: opacity 0.2s ease-out;
		pointer-events: none;
	}

	.tilt-glow.is-active::before {
		opacity: 1;
	}
</style>
