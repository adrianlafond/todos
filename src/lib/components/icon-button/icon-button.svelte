<script lang="ts">
	import cx from 'clsx';
	import { onMount } from 'svelte';

	export let label: string;
	export let tabindex: string | number = 0;
	export let autofocus = false;

	let className: string = '';
	export { className as class };

	let element: HTMLButtonElement;

	onMount(() => {
		if (autofocus) {
			element.focus();
		}
	});
</script>

<button
	aria-label={label}
	class={cx('opacity-50 hover:opacity-100 transition-opacity duration-300 px-2 py-2', className)}
	on:click
	tabindex={+tabindex}
	bind:this={element}
>
	<slot />
</button>
