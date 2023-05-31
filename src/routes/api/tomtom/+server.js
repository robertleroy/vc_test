import { json } from "@sveltejs/kit";
const API_Key = "feVld2SMaP5XrzH9dVUvBZ3WXo5WOsG9";

// https://api.tomtom.com/search/2/search/123%20main%20st.json?key={Your_API_Key}
// https://api.tomtom.com/search/2/search/avon,co.json?key=API_KEY&radius=100&limit=1&lat=40.0426&lon=-106.3980&idxSet=Geo

export async function POST({ request, cookies }) {
  // const coords = url.searchParams.get('coords');
  const searchTerm = await request.json();
  const lat = await cookies.get('lat') ?? '40.0426';
  const lon = await cookies.get('lon') ?? '-106.3980';
  
  // console.log('coords',lat,lon);

  const res = await fetch(`https://api.tomtom.com/search/2/search/${searchTerm}.json?key=${API_Key}&limit=1&lat=${lat}&lon=${lon}&idxSet=Geo`);
  const data = await res.json();
  // console.log("data",formatTomtom(data?.results[0]))

  // const address = data.addresses[0].address;
  // const pos = data.addresses[0].position.split(',');

  // const location = {
  //   city: address?.municipality,
  //   region: address?.countrySubdivision,
  //   country: address?.countryCode,
  //   lat: pos[0],
  //   lon: pos[1]
  // };

  // return json({ location }, { status: 201 }); 

  const location = formatTomtom(data?.results[0])
  
  return json(location, { status: 201 }); 
}


function formatTomtom(data) {
  let obj = {};
  obj.origin = "searchData"
  obj.id = Date.now().toString(16).slice(-8);
  obj.city = data.address.municipalitySubdivision ?
    data.address.municipalitySubdivision :
    data.address.municipality ? data.address.municipality : '';
  obj.region = data.address.countrySubdivision ?
    data.address.countrySubdivision : '';

  obj.countryCode = data.address.countryCode;
  obj.lat = data.position.lat;
  obj.lon = data.position.lon;

  return obj;
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