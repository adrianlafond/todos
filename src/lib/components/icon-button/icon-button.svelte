<script lang="ts">
	import cx from 'clsx';

	export let label: string;

	let className: string = '';
	export { className as class };
</script>

<button
	aria-label={label}
	class={cx('opacity-50 hover:opacity-100 transition-opacity duration-300 px-2 py-2', className)}
	on:click
>
	<slot />
</button>
