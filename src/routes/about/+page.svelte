<script>
  let title = 'About';
</script>

<div class='title'>
  <a href='https://vc-test-robertleroy.vercel.app/' target='_blank' rel='noopener noreferrer'>Vercel App</a>
</div>

<h4>Load Events</h4>
<ol>
  <li>+layout.server.js load
    <ul>
      <li>if 'development' return ipData from static object or ipapi</li>
      <li>if 'production' return ipData from vercel headers</li>
      <li>Also returns dev and version</li>
    </ul>
  </li>

  <li>+layout.svelte onMount
    <ol>
      <li>if browser geolocation permission
        <div class="indent">set initial location to geoData</div>
      </li>
      <li>else
        <div class="indent">set initial location to ipData</div>
      </li>
    </ol>
    
  </li>
</ol>

<h4>Search Event</h4>
<ol>
  <li>+layout.svelte
    <div>form action="?/search"</div>
    <div>name="searchTerm"</div>
  </li>
  <li>+page.server.js
    <div>actions: search</div>
    <div>fetch(`api/tomtom`)</div>
    <div>return newLocation</div>
  </li>
  <li>+page.svelte
    <div>update store with form?.newLocation</div>
  </li>
</ol>

<h4>Notes</h4>
<ul>
  <li>Store navigator permission in cookies - eliminate the loading ipData then swapping</li>
</ul>

<style lang='postcss'>
  .title a { 
    text-decoration: underline dotted ;
    &:hover:not(:active) {
      text-decoration-style: solid;
    } 
  }
</style>