<script lang="ts">
	import PlusCircle from '../icons/plus-circle.svelte';
</script>

<button
	class="
    text-neutral-500
    hover:text-neutral-950
    hover:bg-slate-100
    focus-visible:text-neutral-950
    focus-visible:bg-slate-200
    focus-visible:outline-none
    transition-colors
    duration-200 w-full
    inline-flex
    items-center
    gap-2
    px-2
    py-1
    rounded
  "
>
	<PlusCircle /> Add new task
</button>
