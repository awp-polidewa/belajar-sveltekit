<script>
	// 5 Lensa
	// State   : props di-drive dari luar, tidak ada state internal selain hover (murni CSS) + glow (dari TiltCard)
	// Trigger : hover di gambar -> overlay muncul (CSS). hover di cert-body -> glow ikut kursor (TiltCard).
	// Effect  : dua hover-zone terpisah: gambar overlay, body glow -- keduanya independen, gak saling nyala
	// Edge    : title panjang harus wrap 2 baris rapi tanpa overflow; tags kosong -> baris tags disembunyikan total
	// Boundary: TiltCard cuma dipasang di sekitar cert-body, BUKAN di cert-image-frame, jadi hover gambar
	//           gak pernah trigger glow

	import TiltCard from './TiltCard.svelte';

	let {
		image,
		code,
		title,
		provider,
		tags = [],
		issuedOn,
		detailHref = '#',
		onExpand = () => {}
	} = $props();
</script>

<article class="cert-card">
	<a class="cert-image-frame" href={detailHref} aria-label={`Lihat detail ${title}`}>
		<img src={image} alt={title} loading="lazy" />
		<div class="cert-overlay">
			<span>View detail</span>
			<svg
				width="15"
				height="15"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.4"
			>
				<path d="M5 12h14M13 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</div>
	</a>

	<TiltCard class="cert-body">
		<span class="cert-code">{code}</span>
		<h3 class="cert-title">{title}</h3>
		<p class="cert-provider">{provider}</p>

		{#if tags.length}
			<div class="cert-tags">
				{#each tags as tag (tag)}
					<span class="tag">{tag}</span>
				{/each}
			</div>
		{/if}

		<div class="cert-footer">
			<span class="issued">ISSUED ON {issuedOn}</span>
			<a class="link-icon" href={detailHref} aria-label="Buka link sertifikat">
				<svg
					width="13"
					height="13"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						d="M10 13a5 5 0 007.07 0l1.93-1.93a5 5 0 00-7.07-7.07L10.5 5.5"
						stroke-linecap="round"
					/>
					<path
						d="M14 11a5 5 0 00-7.07 0L5 12.93a5 5 0 007.07 7.07L13.5 18.5"
						stroke-linecap="round"
					/>
				</svg>
			</a>
		</div>

		<button class="expand-btn" type="button" onclick={onExpand} aria-label="Expand">+</button>
	</TiltCard>
</article>

<style>
	.cert-card {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		min-width: 250px;
		border-radius: 22px;
		overflow: hidden;
		background: #17171e;
		/* padding-bottom: 1.6rem; */
	}

	/* --- image, inset frame with dark gap around it --- */
	.cert-image-frame {
		position: relative;
		display: block;
		/* margin: 10px 10px 0; */
		border-radius: 14px 14px 0 0;
		overflow: hidden;
		aspect-ratio: 4 / 3;
	}

	.cert-image-frame img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.4s ease;
	}

	.cert-card:hover .cert-image-frame img {
		transform: scale(1.04);
	}

	.cert-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		gap: 0.4rem;
		background: rgba(12, 12, 16, 0.55);
		color: #fff;
		font-size: 0.95rem;
		font-weight: 600;
		opacity: 0;
		transition: opacity 0.25s ease;
	}

	.cert-card:hover .cert-overlay {
		opacity: 1;
		align-items: center;
	}

	/* --- body ---
     note: .cert-body is now rendered by <TiltCard class="cert-body">, so this class
     is applied on TiltCard's own wrapper div (position:relative; overflow:hidden already
     comes from TiltCard's .tilt-glow class, this just adds the layout/spacing on top) */
	:global(.cert-body) {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		padding: 1.1rem 1.3rem 0;
	}

	.cert-code {
		font-size: 0.7rem;
		letter-spacing: 0.06em;
		color: #8f9be0;
		font-weight: 500;
	}

	.cert-title {
		margin: 0.1rem 0 0;
		font-size: 1.05rem;
		font-weight: 700;
		line-height: 1.35;
		color: #f4f4f7;
	}

	.cert-provider {
		margin: 0;
		font-size: 0.82rem;
		color: #86869c;
	}

	.cert-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.25rem;
	}

	.tag {
		padding: 0.32rem 0.85rem;
		border-radius: 999px;
		border: 1px solid #34344a;
		color: #b8b8cc;
		font-size: 0.72rem;
		font-weight: 500;
	}

	.cert-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0.7rem;
		padding: 0.85rem 0;
		border-top: 1px solid #26262f;
		border-bottom: 1px solid #26262f;
	}

	.issued {
		font-size: 0.68rem;
		letter-spacing: 0.05em;
		font-weight: 600;
		color: #c99a72;
	}

	.link-icon {
		display: flex;
		color: #6c6c82;
	}

	.expand-btn {
		align-self: flex-start;
		margin: 0.6rem 0 1rem;
		width: 1.9rem;
		height: 1.9rem;
		border-radius: 50%;
		border: 1px solid #34344a;
		background: #1c1c25;
		color: #6c6c82;
		font-size: 1rem;
		line-height: 1;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.expand-btn:hover {
		color: #b8b8cc;
		border-color: #4a4a63;
	}
</style>
