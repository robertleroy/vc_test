<script>
  import { location } from '$lib/store';
	// export let data;
  
  // export let form;

  // $: form?.newLocation && updateLocation();

  // function updateLocation() {
  //   $location = form?.newLocation;
  // }
  // $: $location = form?.newLocation;
  // $: console.log("newLocation", form?.newLocation);
</script>



<div class="info">
  <!-- <div class='form_control'>
    <div class="label">Initial Location</div>
    <pre>{JSON.stringify($initialLocation,0,2)}</pre>
  </div> -->
  <div class='form_control'>
    <div class="label">Location</div>
    <pre>{JSON.stringify($location,0,2)}</pre>
  </div>
</div>
