<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let id: string;
	export let title: string;
	export let checked = false;

	let editing = false;
	let textbox: HTMLInputElement;

	function handleChange(event: Event) {
		dispatch('change', { id, checked: (event.target as HTMLInputElement).checked });
	}

	function handleEditStart() {
		editing = true;
	}

	function handleEditEnd() {
		editing = false;
		dispatch('titleChange', { id, title: textbox.value });
	}
</script>

<li>
	<label>
		<input bind:checked type="checkbox" on:change={handleChange} />
		{#if !editing}<span>{title}</span>{/if}
	</label>
	{#if editing}
		<form class="inline-block" on:submit={handleEditEnd}>
			<!-- svelte-ignore a11y-autofocus -->
			<input autofocus type="text" value={title} on:blur={handleEditEnd} bind:this={textbox} />
		</form>
	{:else}
		<button aria-label="edit" on:click={handleEditStart}>x</button>
	{/if}
</li>
