<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import autosize from 'autosize';
	import cx from 'clsx';

	export let defaultValue = '';
	export let placeholder = '';

	let className: string = '';
	export { className as class };

	const dispatch = createEventDispatcher();
	let value = defaultValue;
	let textbox: HTMLTextAreaElement;

	onMount(() => {
		if (textbox) {
			autosize(textbox);
			textbox.focus();
		}
	});

	function handleInput(event: Event) {
		value = (event.target as HTMLTextAreaElement).value;
	}

	function handleEditEnd() {
		dispatch('update', { value });
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === 'Escape') {
			event.preventDefault();
			event.stopImmediatePropagation();
			if (event.key === 'Escape') {
				value = defaultValue;
			}
			handleEditEnd();
		}
	}
</script>

<textarea
	class={cx('resize-none leading-tight focus:outline-none bg-transparent', className)}
	rows={1}
	bind:value
	on:input={handleInput}
	on:blur={handleEditEnd}
	on:keydown={handleKeyDown}
	bind:this={textbox}
	{placeholder}
/>
