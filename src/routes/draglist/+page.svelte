<script>
  import Sortable from "sortablejs";
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { onMount, tick } from "svelte";
  import { location, savedLocations } from "$lib/store";
  import Delete from "$lib/components/Delete.svelte";

  export let form;

  let selectedItem, sortable, draglist;

  $: form?.newLocation && updateLocation();

  async function updateLocation() {
    $location = form?.newLocation;

    reorderList();
    await tick();
    $savedLocations.locales = [...$savedLocations.locales, form?.newLocation];
    $savedLocations.sortOrder = [
      ...$savedLocations.sortOrder,
      form?.newLocation.id,
    ];

    goto("/");
  }

  async function sort_order() {
    // if (!$sortOrder.length) return;
    await tick();
    $savedLocations.sortOrder = sortable.toArray();
  }

  function reorderList() {
    let arr = [];
    for (let i = 0; i < $savedLocations.sortOrder.length; i++) {
      const obj = $savedLocations.locales.find(
        (el) => el.id === $savedLocations.sortOrder[i]
      );
      arr.push(obj);
    }
    $savedLocations.locales = [...arr];
  }

  function deleteItem(id) {
    $savedLocations.locales = $savedLocations.locales.filter(
      (el) => el.id !== id
    );
    $savedLocations.sortOrder = $savedLocations.sortOrder.filter(
      (el) => el !== id
    );
    reorderList();
  }

  onMount(() => {
    sortable = Sortable.create(draglist, {
      animation: 300,
      touchStartThreshold: 3,
      filter: "input:focus",
      preventOnFilter: false,
      ghostClass: "ghostClass",
      direction: "vertical",
      store: {
        get: function () {
          return $savedLocations.sortOrder;
        },
        set: function () {
          sort_order();
        },
      },
    });
  });
</script>

<div class="page">
  <form method="POST" action="?/search" use:enhance>
    <input type="text" name="searchTerm" />
  </form>

  <div class="dragzone">
    {#if $savedLocations.locales?.length}
      <div bind:this={draglist}>
        {#each $savedLocations.locales as item (item.id)}
          <div
            data-id={item.id}
            class="item"
            on:keypress
            on:click={() => {
              selectedItem = item;
              console.log(item);
            }}
          >
            <div class="handle">&vellip;&vellip;</div>
            <!-- 				<div class="name">{item.name}</div> -->
            <div class="name">
              <!-- <input bind:value={item.name}> -->
              {item?.city}, {item?.region}
            </div>
            <Delete on:delete={deleteItem(item.id)} />
          </div>
        {/each}
      </div>
    {:else}
      <div
        style="text-align: center; line-height: 2.5; font-variant: small-caps; opacity: 0.6"
      >
        list
      </div>
    {/if}
  </div>

  <div class="debug">
    <div class="">
      {#each $savedLocations.locales as locale}
        <div class="">{locale.city}</div>
      {/each}
    </div>

    <div class="">
      {$savedLocations.sortOrder}
    </div>
  </div>
</div>

<style lang="postcss">
  .page {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    height: 100%;
  }
  .dragzone {
    background: hsl(0, 0%, 91%);
    border-radius: 0.5rem;
    overflow: hidden;
    min-height: 2.5em;
  }
  .item {
    display: flex;
    gap: 0 1rem;
    align-items: center;
    cursor: default;
    padding: 0.5rem;
    background-color: #fff;
    box-shadow: inset 0 -1px 0 #cccccc6f;
  }
  .name {
    flex: 1;
  }
  .handle {
    cursor: move;
  }

  .debug {
    position: absolute;
    bottom: 0;

    display: grid;
    grid-template-columns: 1fr max-content;
    gap: 0 2ch;

    max-width: 500px;
    min-height: 4em;
    margin: 0 auto;
  }
</style>
