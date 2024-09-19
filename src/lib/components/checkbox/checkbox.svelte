<script lang="ts">
	import CheckSquare from '../icons/check-square.svelte';
	import Square from '../icons/square.svelte';
	import cx from 'clsx';

	export let checked = false;

	let className: string = '';
	export { className as class };
</script>

<div class={cx('grid', className)}>
	<div class="icon-grid-area">
		{#if checked}
			<CheckSquare />
		{:else}
			<Square />
		{/if}
	</div>
	<input class="opacity-0 icon-grid-area" type="checkbox" on:change />
</div>

<style>
	.icon-grid-area {
		grid-area: 1 / 1;
	}
</style>
