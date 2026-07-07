<script>
	let { text, color = 'yellow', disabled = true } = $props();
</script>

<!-- <button style="background: {color}; disabled={disabled}">{text}</button> -->
<button style={`background: ${color};`} {disabled}>
	{text}
</button>

<style>
	button {
		padding: 10px 20px;
		border: none;
		border-radius: 8px;
		color: white;
		font-size: 1.1rem;

		box-shadow:
			0 0 15px rgb(255 81 0 / 35%),
			0 0 35px rgb(255 81 0 / 25%);
	}
</style>
