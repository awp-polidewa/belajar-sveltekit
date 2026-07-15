<script>
	let count = $state(0);
	function tambah() {
		count++;
	}
</script>

<button onclick={tambah}>{count}</button>

<style>
	button {
		padding: 20px 15px;
		background-color: bisque;
		color: black;
	}
</style>
