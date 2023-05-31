import { json } from "@sveltejs/kit";
const API_Key = "feVld2SMaP5XrzH9dVUvBZ3WXo5WOsG9";

// https://api.tomtom.com/search/2/reverseGeocode/35.6081965, -97.5676785.json?key=feVld2SMaP5XrzH9dVUvBZ3WXo5WOsG9&radius=100

export async function POST({ request }) {
  // const coords = url.searchParams.get('coords');
  const { lat, lon } = await request.json();
  
  // console.log('coords',lat, lon);

  const res = await fetch(`https://api.tomtom.com/search/2/reverseGeocode/${lat},${lon}.json?key=${API_Key}&radius=100`);
  const data = await res.json();
  // console.log("data",data.addresses[0])

  const address = data.addresses[0].address;
  const pos = data.addresses[0].position.split(',');

  const location = {
    city: address?.municipality,
    region: address?.countrySubdivision,
    country: address?.countryCode,
    lat: pos[0],
    lon: pos[1]
  };

  return json({ location }, { status: 201 }); 
}

// export async function GET() {
//   try {
//     const getIp = await fetch("http://ip-api.com/json?fields=57855");
//     const ipData = await getIp.json();
//     // console.log("ipData", ipData);

//     const location = await {
//       ip: ipData?.query,
//       city: ipData?.city,
//       region: ipData?.region,
//       country: ipData?.countryCode,
//       lat: ipData?.lat,
//       lon: ipData?.lon,
//     };

//     return json(location);
//   } catch (error) {
//     console.log("load error:", error);
//   }
// }