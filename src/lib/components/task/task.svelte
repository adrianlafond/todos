<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Delete from '../icons/delete.svelte';
	import Edit from '../icons/edit.svelte';
	import Up from '../icons/up.svelte';
	import Down from '../icons/down.svelte';
	import { IconButton } from '../icon-button';
	import ThreeDotsVertical from '../icons/three-dots-vertical.svelte';
	import X from '../icons/x.svelte';
	import cx from 'clsx';
	import MultilineTextbox from '../multiline-textbox/multiline-textbox.svelte';

	const dispatch = createEventDispatcher();

	export let id: string;
	export let title: string;
	export let checked = false;

	let editing = false;
	let settingsOpen = false;
	let settingsTimeout = 0;

	function handleChange(event: Event) {
		dispatch('change', { id, checked: (event.target as HTMLInputElement).checked });
	}

	function handleEditStart() {
		editing = true;
		handleSettingsClose();
	}

	function handleSettingsOpen() {
		settingsOpen = true;
		settingsTimeout = setTimeout(handleSettingsClose, 5000);
	}

	function handleSettingsClose() {
		settingsOpen = false;
		clearTimeout(settingsTimeout);
	}

	function handleTitleUpdate({ detail }: { detail: { value: string } }) {
		editing = false;
		dispatch('titleChange', { id, title: detail.value });
	}
</script>

<li
	class="relative inline-flex w-96 max-w-96 pl-2 pt-2 pb-2 pr-8 rounded bg-white hover:bg-slate-100 transition-colors duration-200"
>
	<label class="flex items-start">
		<input class="mr-1 mt-1" bind:checked type="checkbox" on:change={handleChange} />
		{#if !editing}<span class="inline-block leading-tight">{title}</span>{/if}
	</label>
	{#if editing}
		<MultilineTextbox defaultValue={title} on:update={handleTitleUpdate} />
	{/if}
	<div class="absolute right-0 top-0 h-9 items-center inline-flex">
		{#if settingsOpen && !editing}
			<div class="inline-flex items-center justify-between gap-1 rounded bg-white mr-0.5">
				<IconButton label="edit task title" on:click={handleEditStart}><Edit /></IconButton>
				<IconButton label="move task up" on:click={() => dispatch('moveUp', { id })}>
					<Up />
				</IconButton>
				<IconButton label="move task down" on:click={() => dispatch('moveDown', { id })}>
					<Down />
				</IconButton>
				<IconButton label="delete task" on:click={() => dispatch('delete', { id })}>
					<Delete />
				</IconButton>
				<IconButton label="close task settings" on:click={handleSettingsClose}>
					<X />
				</IconButton>
			</div>
		{:else if !editing}
			<IconButton label="open task settings" on:click={handleSettingsOpen}>
				<ThreeDotsVertical />
			</IconButton>
		{/if}
	</div>
</li>
