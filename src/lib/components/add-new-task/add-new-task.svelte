<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import PlusCircle from '../icons/plus-circle.svelte';
	import MultilineTextbox from '../multiline-textbox/multiline-textbox.svelte';

	const dispatch = createEventDispatcher();
	let editing = false;

	function toggleEditing() {
		editing = !editing;
	}

	function handleUpdate({ detail }: { detail: { value: string } }) {
		const { value } = detail;
		if (value) {
			dispatch('addNewTask', detail);
		}
		editing = false;
	}
</script>

<li
	class="
    text-neutral-500
    hover:text-neutral-950
    hover:bg-slate-100
    focus-within:text-neutral-950
    focus-within:bg-slate-200
    focus-within:outline-none
    rounded
  "
>
	{#if editing}
		<div class="inline-flex items-center gap-2 px-2 py-1">
			<PlusCircle />
			<MultilineTextbox placeholder="New reminder" on:update={handleUpdate} />
		</div>
	{:else}
		<button
			class="
        focus-visible:outline-none
        transition-colors
        duration-200 w-full
        inline-flex
        items-center
        leading-5
        gap-2
        px-2
        py-1
      "
			on:click={toggleEditing}
		>
			<PlusCircle /> Add new task
		</button>
	{/if}
</li>
