export const actions = {
  search: async ({ fetch, request }) => {
    const formData = await request.formData();
    const searchTerm = formData.get('searchTerm');
    // const { searchTerm } = Object.fromEntries(await request.formData());
    // console.log("formData", searchTerm);

    const res = await fetch(`api/tomtom`, {
      method: "POST",
      body: JSON.stringify(searchTerm),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newLocation = await res.json();
    // console.log('geoData',await newLocation);
    return { newLocation: await newLocation };
  },

};