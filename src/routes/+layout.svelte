<script>
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';
  import { location, initialLocation } from '$lib/store';
  import './app.css';

  export let data;
  $location = data?.ipData;
  $initialLocation = data?.ipData;
  
  // export let form;
  // $: console.log(form?.newLocation);

  console.log(data?.dev ? "$app/environment: Development" : "$app/environment: Production" );
  // console.log("SK Version:", data?.version.name);
  

  let title = 'Home';
  const routes = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];
  
  function init() {
    let lat, lon;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        // console.log("COORDS: ", {lat, lon});

        const res = await fetch(`api/reverseTomtom`, {
          method: "POST",
          body: JSON.stringify({ lat, lon }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        // console.log('geoData',data?.location);
        // const geo = await data.location;
        $location = await {
          name: "geoData", 
          ...data.location
        };
        
        $initialLocation = {...$location};
      }, (err) => {
        console.log("Browser Geolocation not available");
      });
    } else {
      console.log("Geolocation is not supported by your browser");
    }
  }

  onMount(() => {
    init();
  });
</script>

<header class=''>
  <div class='flex'>
    <div class='title'>
      <a href='/'>{title}</a>
    </div>

    <form method="POST" action="?/search" use:enhance>
      <input type="text" name="searchTerm" />
    </form>

    <nav>
      {#each routes as route}
      <div class='route'>
        <a href={route.path}>{route.name}</a>
      </div>
      {/each}
    </nav>
  </div>
</header>

<main>
  <div class='router'><slot /></div>
</main>

<style lang='postcss'>
  header {
    border-bottom: 1px solid #ccc;
    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0 1rem;
      padding: 0.5rem 2rem;
      max-width: var(--max-width);
      margin: 0 auto;
    }
    /* a {  color: inherit;
       &:not(:hover:not(:active)) {
        text-decoration: none;
      }
    } */
    nav {
      display: flex;
      align-items: baseline;
      gap: 0 1rem;
    }
  } /* header */

  .router {  
    padding: 0.5rem 2rem;
    max-width: var(--max-width);
    margin: 0 auto;
  }
</style>