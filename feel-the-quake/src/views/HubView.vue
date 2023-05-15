<template>
  <div class="relative">
    <nav class="h-24 pt-6 pr-8 pl-4 bg-green-100 relative text-emerald-400 flex justify-between">
      <div class="flex gap-3">
        <img class="w-10 h-fit shrink-0" src="@/assets/logo-squared.png" />
        <div class="w-36 text-xs ">
          <h1 class="font-bold">НИГГА-БАН | Секция Сеизмология</h1>
          <p>Сеизмични събития</p>
        </div>
      </div>
      <RouterLink to="/quake-form">
        <button type="button"
          class="bg-emerald-500 border-2 border-emerald-400 text-white font-bold h-fit p-3 rounded-xl">Усетих
          трус
        </button>
      </RouterLink>
    </nav>
    <main class="flex justify-between h-full min-h-screen bg-green-100">
      <div id="map" ref="mapRef" class="w-full" :class="{ 'invisible': isLoading }"></div>
      <div id="overlay" ref="overlayRef" :class="{ 'invisible': isLoading }">
        <div class="bg-white text-sky-900 text-xs rounded-lg p-2 w-[13rem] grid grid-cols-3 gap-1">
          <div class="col-span-1 flex items-center justify-center">
            <p class="flex items-center justify-center aspect-square rounded-full text-center text-sm p-3 font-bold text-cyan-700 border-[1px] border-neutral-200 shadow"
              :style="{ 'background-color': getColorClass(overlayContent.mag) }">
              {{ overlayContent.mag.toFixed(1) }}
            </p>
          </div>
          <div class="col-span-2">
            <h1 class="text-bold text-cyan-500 mb-1">{{ overlayContent.place }}</h1>
            <p>{{ overlayContent.date }}</p>
          </div>
        </div>
      </div>
      <div class="absolute p-2 m-1 bg-white bg-opacity-40 rounded-lg text-teal-800 text-sm">
        Tiles &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors<br>
        Data &copy; <a href="https://earthquake.usgs.gov/">USGS</a>
      </div>
      <section
        class="absolute transition-transform duration-500 z-40 left-0 right-0 flex flex-col gap-10 h-[64rem] w-full py-6 px-3 bg-white border-[1.5px] border-t-[6px] border-emerald-400 shadow-lg rounded-xl"
        :style="{ transform: !isTableVisible ? 'translateY(calc(100vh - 10.5rem))' : 'none' }">
        <div
          class="absolute flex justify-center -top-6 left-0 right-0 mx-auto rounded-full w-24 text-4xl font-bold text-cyan-700 border-2 border-emerald-400 bg-white shadow"
          @click="isTableVisible = !isTableVisible">
          <Icon class="mb-1 transition-transform duration-200" icon="fa6-solid:chevron-up"
            :class="{ 'rotate-180': isTableVisible }" />
        </div>
        <h1 class="text-teal-500 font-bold text-xl text-center drop-shadow-md">Последни земетресения</h1>
        <div class=" overflow-auto" style="height: calc(100vh - 13.5rem)">
          <table class="text-xs text-center w-full">
            <thead class="h-10 sticky top-0 bg-white">
              <th>№</th>
              <th>Час/дата (GMT)</th>
              <th>Магнитуд</th>
              <th>Lat°</th>
              <th>Lon°</th>
              <th>Дълб.</th>
            </thead>
            <tbody>
              <tr class="h-12 w-full border-y-[1px]" v-for="(quake, index) in quakeData" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ quake.dateTime }}</td>
                <td>{{ quake.magnitude }}</td>
                <td>{{ quake.latitude }}</td>
                <td>{{ quake.longitude }}</td>
                <td>{{ quake.depth }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
// Import the needed libraries
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { Geolocation } from '@capacitor/geolocation';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Overlay from 'ol/Overlay';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';

// Variables for the table, which displays earthquake data
// and the isLoading variable, which hides the map until it loads
const isLoading = ref(true);
const isTableVisible = ref(false);
const quakeData = ref([
  {
    dateTime: '13:11 26/02/2023',
    magnitude: 'M=3.0',
    latitude: '45.14°N',
    longitude: '27.50°E',
    depth: '2.0 км.'
  },
  {
    dateTime: '13:11 26/02/2023',
    magnitude: 'M=3.0',
    latitude: '45.14°N',
    longitude: '27.50°E',
    depth: '2.0 км.'
  },
  {
    dateTime: '13:11 26/02/2023',
    magnitude: 'M=3.0',
    latitude: '45.14°N',
    longitude: '27.50°E',
    depth: '2.0 км.'
  },
  {
    dateTime: '13:11 26/02/2023',
    magnitude: 'M=3.0',
    latitude: '45.14°N',
    longitude: '27.50°E',
    depth: '2.0 км.'
  },
  {
    dateTime: '13:11 26/02/2023',
    magnitude: 'M=3.0',
    latitude: '45.14°N',
    longitude: '27.50°E',
    depth: '2.0 км.'
  },
  {
    dateTime: '13:11 26/02/2023',
    magnitude: 'M=3.0',
    latitude: '45.14°N',
    longitude: '27.50°E',
    depth: '2.0 км.'
  },
  {
    dateTime: '13:11 26/02/2023',
    magnitude: 'M=3.0',
    latitude: '45.14°N',
    longitude: '27.50°E',
    depth: '2.0 км.'
  },
  {
    dateTime: '13:11 26/02/2023',
    magnitude: 'M=3.0',
    latitude: '45.14°N',
    longitude: '27.50°E',
    depth: '2.0 км.'
  },
  {
    dateTime: '13:11 26/02/2023',
    magnitude: 'M=3.0',
    latitude: '45.14°N',
    longitude: '27.50°E',
    depth: '2.0 км.'
  },
  {
    dateTime: '13:11 26/02/2023',
    magnitude: 'M=3.0',
    latitude: '45.14°N',
    longitude: '27.50°E',
    depth: '2.0 км.'
  },
  {
    dateTime: '13:11 26/02/2023',
    magnitude: 'M=3.0',
    latitude: '45.14°N',
    longitude: '27.50°E',
    depth: '2.0 км.'
  },
  {
    dateTime: '13:11 26/02/2023',
    magnitude: 'M=3.0',
    latitude: '45.14°N',
    longitude: '27.50°E',
    depth: '2.0 км.'
  },
  {
    dateTime: '13:11 26/02/2023',
    magnitude: 'M=3.0',
    latitude: '45.14°N',
    longitude: '27.50°E',
    depth: '2.0 км.'
  },
  {
    dateTime: '13:11 26/02/2023',
    magnitude: 'M=3.0',
    latitude: '45.14°N',
    longitude: '27.50°E',
    depth: '2.0 км.'
  },
  {
    dateTime: '13:11 26/02/2023',
    magnitude: 'M=3.0',
    latitude: '45.14°N',
    longitude: '27.50°E',
    depth: '2.0 км.'
  },
  {
    dateTime: '13:11 26/02/2023',
    magnitude: 'M=3.0',
    latitude: '45.14°N',
    longitude: '27.50°E',
    depth: '2.0 км.'
  },
]);

// Variables for the map and overlay instance,
// along with the overlay content object, which holds:
// the place name, magnitude and time of the earthquake
const mapRef = ref(null);
const overlayRef = ref(null);
const overlayContent = ref({
  place: '',
  mag: 0,
  time: new Date().toLocaleString()
});

// Function to get the color class for the earthquake marker,
// based on its magnitude
function getColorClass(mag) {
  if (mag <= 2.0) {
    return '#bbf7d0';
  } else if (mag <= 3.0) {
    return '#a7f3d0';
  } else if (mag <= 4.0) {
    return '#99f6e4';
  } else if (mag <= 5.0) {
    return '#bae6fd';
  } else if (mag <= 6.0) {
    return '#c7d2fe';
  } else {
    return '#fecdd3';
  }
}

// The onMounted hook runs when the component is mounted to the website DOM,
// it allows us to access the DOM (HTML) elements and initialize the map
onMounted(() => {
  // Using the Capacitor Geolocation API to get the current position of the user
  const currentPosition = async () => {
    return await Geolocation.getCurrentPosition();
  }

  // When the current position is retrieved, we can initialize the map
  currentPosition().then(position => {
    // Stop the loading and initialize the map
    isLoading.value = false;
    const map = new Map({
      // Reference the mapRef variable in the template to set the map target
      target: mapRef.value,
      // The layers array holds the map data and markers
      layers: [
        // Create a new map tile layer from the OpenStreetMap source
        new TileLayer({
          source: new OSM()
        }),
        // Create a new vector layer from the GeoJSON source,
        // which holds the earthquake data and marker descriptions
        // The style function sets the marker radius and color
        new VectorLayer({
          source: new VectorSource({
            url: 'https://www.seismicportal.eu/fdsnws/event/1/query?limit=300&minlat=36.351437&maxlat=45.919546&minlon=18.819906&maxlon=33.260681&format=json',
            format: new GeoJSON(),
          }),
          style: function (feature) {
            const mag = feature.get('mag');
            const radius = 5 + (mag / 10) * 20;
            const colorClass = getColorClass(mag);
            return new Style({
              image: new CircleStyle({
                radius: radius,
                fill: new Fill({
                  color: colorClass,
                }),
                stroke: new Stroke({
                  color: 'white',
                  width: 2,
                  opacity: 0.5
                }),
              }),
            });
          },
        }),
      ],
      // The view defines the center and zoom level of the map
      // We also use the current position of the user to center the map,
      // and remove any default controls (zoom, rotate, etc.)
      view: new View({
        center: fromLonLat([position.coords.longitude, position.coords.latitude]),
        zoom: 5,
      }),
      controls: []
    });

    // Create a new overlay instance, which will display the earthquake info,
    // when a marker is clicked
    const overlay = new Overlay({
      element: overlayRef.value,
      offset: [-105, 25],
    });

    // Add the instance to the map
    map.addOverlay(overlay);

    // When a marker is clicked, get its properties and display them in the overlay
    map.on('singleclick', (event) => {
      // Hide the overlay by default,
      // in case the user clicks on the map, instead of a marker
      overlay.setPosition(undefined);

      // Get the features (markers) at the clicked position
      map.forEachFeatureAtPixel(event.pixel, (feature) => {
        // If there is a feature found at the clicked position
        if (feature) {
          // Center the map view on the clicked feature
          const view = map.getView();
          view.animate({
            center: feature.getGeometry().getCoordinates(),
            duration: 1000
          });

          // Get the feature properties
          const { flynn_region, mag, time } = feature.getProperties();

          // If there is no place, magnitude or time,
          // we don't want to display the overlay
          if (!flynn_region || !mag || !time)
            return;

          // Display the overlay and set its content
          overlay.setPosition(event.coordinate);
          overlayContent.value.place = flynn_region;
          overlayContent.value.mag = mag;
          overlayContent.value.date = new Date(time).toLocaleDateString();
        }
      });
    });

    // Create a new source for vector markers,
    // and add a marker at the current position of the user
    const markerSource = new VectorSource();
    const marker = new Feature({
      geometry: new Point(fromLonLat([position.coords.longitude, position.coords.latitude])),
    });
    markerSource.addFeature(marker);

    // Create a new layer for the marker,
    // and add it to the map
    const markerLayer = new VectorLayer({
      source: markerSource,
    });

    map.addLayer(markerLayer);
  });
});
</script>
