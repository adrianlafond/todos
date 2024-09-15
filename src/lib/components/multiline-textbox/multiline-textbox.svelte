<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import autosize from 'autosize';

	export let defaultValue = '';

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
			if (event.key === 'Escape') {
				value = defaultValue;
			}
			handleEditEnd();
		}
	}
</script>

<textarea
	class="resize-none flex-1 leading-tight"
	rows={1}
	bind:value
	on:input={handleInput}
	on:blur={handleEditEnd}
	on:keydown={handleKeyDown}
	bind:this={textbox}
/>
