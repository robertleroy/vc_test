<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let showPopup = false;
  const event_name = "delete";

  function clickOutside(node) {
    const handleClick = (event) => {
      if (!node.contains(event.target)) {
        node.dispatchEvent(new CustomEvent("outclick"));
      }
    };
    document.addEventListener("click", handleClick, true);
    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  }
</script>

<div
  class="vellip"
  on:click|stopPropagation={() => (showPopup = !showPopup)}
  on:keypress
>
  <span>&vellip;</span>
  <div
    class="popup btn"
    class:showPopup
    use:clickOutside
    on:click|stopPropagation={() => {
      dispatch(event_name);
      showPopup = false;
    }}
    on:keypress
    on:outclick={() => (showPopup = false)}
  >
  🗙
  </div>
</div>

<style>
  .vellip {
    --popup_top: 0.1em;
    --popup_right: 0;
    --popup_bg: #fff;
    position: relative;
    display: inline-block;
    width: 1.5rem;
    text-align: center;
    padding: 0 var(--popup_right);
    cursor: pointer;
    user-select: none;
    z-index: 1000;
  }
  .vellip:active {
    color: transparent;
  }
  .popup {
    display: none;
    position: absolute;
    top: calc(var(--popup_top) * -1);
    right: -1px;
    font-size: 0.9em;
    padding: var(--popup_top) calc(var(--popup_top) * 4);
    background: var(--popup_bg);
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 0.3rem;
  }
  .showPopup {
    display: initial;
  }
  .showPopup:active {
    color: #ccc;
  }
</style>
