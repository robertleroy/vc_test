<script>
  import { location, initialLocation } from '$lib/store';
	// export let data;
  
  export let form;
  $: $location = form?.newLocation;
  // $: console.log("newLocation", form?.newLocation);
</script>



<div class="info">
  <div class='form_control'>
    <label>Initial Location</label>
    <pre>{JSON.stringify($initialLocation,0,2)}</pre>
  </div>
  <div class='form_control'>
    <label>Current Location</label>
    <pre>{JSON.stringify($location,0,2)}</pre>
  </div>
</div>

<h4>Notes</h4>
<ul>
  <li>Store navigator permission in cookies - eliminate the loading ipData then swapping</li>
</ul>