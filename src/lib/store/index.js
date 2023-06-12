import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const location = writable();

const init = JSON.parse(browser && localStorage.getItem("savedLocations")) || {
  locales: [
    {
      origin: "searchData",
      id: "afe640c2",
      city: "Avon",
      region: "CO",
      countryCode: "US",
      lat: 39.635112,
      lon: -106.518868,
    },
    {
      origin: "searchData",
      id: "afe7e904",
      city: "Rancho Mirage",
      region: "CA",
      countryCode: "US",
      lat: 33.766656,
      lon: -116.417691,
    },
    {
      origin: "searchData",
      id: "b0671d32",
      city: "Edwards",
      region: "CO",
      countryCode: "US",
      lat: 39.626348,
      lon: -106.633719,
    },
  ],
  sortOrder: ["afe640c2", "afe7e904","b0671d32"],
};

export const savedLocations = writable(init);
savedLocations.subscribe(
  (val) =>
    browser && localStorage.setItem("savedLocations", JSON.stringify(val))
);


/*
import { browser } from "$app/environment";
import { writable } from "svelte/store";

const init = JSON.parse(browser && localStorage.getItem("savedLocations")) || {
  locales: [
    {
      origin: "searchData",
      id: "afe640c2",
      city: "Avon",
      region: "CO",
      countryCode: "US",
      lat: 39.635112,
      lon: -106.518868,
    },
    {
      origin: "searchData",
      id: "afe7e904",
      city: "Rancho Mirage",
      region: "CA",
      countryCode: "US",
      lat: 33.766656,
      lon: -116.417691,
    },
  ],
  sortOrder: ["fe7a7a1b", "19fc4fcb"],
};

export const savedLocations = writable(init);
savedLocations.subscribe(
  (val) =>
    browser && localStorage.setItem("savedLocations", JSON.stringify(val))
);
*/