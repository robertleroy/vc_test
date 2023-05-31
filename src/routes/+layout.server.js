// import { SEECRET } from '$env/static/private';
import { dev, version } from "$app/environment";
let ipData;

export async function load(event) {

  // if (event.cookies.get("geolocation")) return;

  if (dev) {
    // const res = await event.fetch('/api/ipapi');
    // ipData = await res.json();

    ipData = {
      ip: "107.207.41.105",
      city: "Oklahoma City",
      region: "OK",
      country: "US",
      lat: 35.4662,
      lon: -97.5168,
    };
    
  } else {
    ipData = {
      ip:      event.getClientAddress(),
      city:    decodeURIComponent(event.request.headers.get('x-vercel-ip-city') ?? 'unknown'),
      region:  decodeURIComponent(event.request.headers.get('x-vercel-ip-country-region') ?? 'unknown'),
      country: decodeURIComponent(event.request.headers.get('x-vercel-ip-country') ?? 'unknown'),
      lat:     decodeURIComponent(event.request.headers.get('x-vercel-ip-latitude') ?? 'unknown'),
      lon:     decodeURIComponent(event.request.headers.get('x-vercel-ip-longitude') ?? 'unknown'),
    }
  }
  

	return {
		ipData: { origin: "ipData", ...ipData},
    dev, version
	};
}