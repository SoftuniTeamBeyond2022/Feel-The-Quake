<template>
  <main class="flex justify-center items-center h-full min-h-screen bg-blue-300">
    <div
      class="relative flex flex-col h-fit w-full pb-12 pt-16 px-6 mx-4 bg-white border-[1.5px] border-b-[6px] border-sky-200 shadow-lg rounded-xl">
      <button type="button" v-if="formIndex > 0 && formIndex < 4" @click="formIndex--"
        class="absolute top-2 left-3 flex items-center justify-center aspect-square rounded-full w-10 text-xl text-center text-cyan-600 border-[1px] border-neutral-200 shadow">
        <Icon icon="fa6-solid:chevron-left" />
      </button>
      <RouterLink v-else-if="formIndex < 4" to="/">
        <button type="button"
          class="absolute top-2 left-3 flex items-center justify-center aspect-square rounded-full w-10 text-xl text-center text-cyan-600 border-[1px] border-neutral-200 shadow">
          <Icon icon="fa6-solid:x" />
        </button>
      </RouterLink>
      <section v-show="formIndex == 0">
        <h1 class="text-3xl font-bold text-cyan-500 mb-12 text-center drop-shadow-sm">Какво е вашето местоположение?
        </h1>
        <form class="flex flex-col items-center">
          <div id="map" ref="mapRef" class="h-72 w-full z-10 mb-8"></div>
          <div class="absolute left-6 z-10 p-2 m-1 bg-white bg-opacity-40 rounded-lg text-teal-800 text-xs">
            Tiles &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors
          </div>
          <button type="button" @click="formIndex++"
            class="relative flex gap-2 rounded-xl py-2 px-6 border-2 border-sky-200 bg-sky-600 font-semibold text-white text-xl w-fit shadow-md"
            :class="{ 'invisible': markerLocation == null }">
            Напред
            <Icon class="my-auto" icon="fa6-solid:chevron-right" />
          </button>
        </form>
      </section>
      <section v-show="formIndex == 1">
        <h1 class="text-3xl font-bold text-cyan-500 mb-12 text-center drop-shadow-sm">Къде се намирахте?</h1>
        <form class="flex flex-col items-center">
          <div @click="selectionIndecies[1] = 1"
            :class="{ 'bg-teal-200': selectionIndecies[1] == 1, 'shadow-md': selectionIndecies[1] == 1 }"
            class="text-center bg-cyan-100 p-4 rounded-xl w-48 mb-5">
            <h2 class="text-xl font-semibold text-cyan-600 mb-2">На открито</h2>
          </div>
          <div @click="selectionIndecies[1] = 2"
            :class="{ 'bg-teal-200 ': selectionIndecies[1] == 2, 'shadow-md': selectionIndecies[1] == 2 }"
            class="text-center bg-cyan-100 p-4 rounded-xl w-48">
            <h2 class="text-xl font-semibold text-cyan-600 mb-2">В сграда</h2>
          </div>
          <div class="h-[0.10rem] w-1/2 bg-sky-100 my-8"></div>
          <button type="button" @click="formIndex++"
            class="relative flex gap-2 rounded-xl py-2 px-6 border-2 border-sky-200 bg-sky-600 font-semibold text-white text-xl w-fit shadow-md">
            Напред
            <Icon class="my-auto" icon="fa6-solid:chevron-right" />
          </button>
        </form>
      </section>
      <section v-show="formIndex == 2">
        <h1 class="text-3xl font-bold text-cyan-500 mb-8 text-center drop-shadow-sm">Колко силно почувствахте
          земетресението?</h1>
        <form class="flex flex-col items-center">
          <ul class="flex gap-3 w-fit mb-6">
            <li
              class="flex items-center justify-center aspect-square rounded-full w-10 text-2xl text-center font-bold text-cyan-700 border-[1px] border-neutral-200 shadow"
              @click="selectionIndecies[0] = 1" :class="{ 'bg-emerald-300': selectionIndecies[0] >= 1 }">1</li>
            <li
              class="flex items-center justify-center aspect-square rounded-full w-10 text-2xl text-center font-bold text-cyan-700 border-[1px] border-neutral-200 shadow"
              @click="selectionIndecies[0] = 2" :class="{ 'bg-teal-300': selectionIndecies[0] >= 2 }">2</li>
            <li
              class="flex items-center justify-center aspect-square rounded-full w-10 text-2xl text-center font-bold text-cyan-700 border-[1px] border-neutral-200 shadow"
              @click="selectionIndecies[0] = 3" :class="{ 'bg-sky-300': selectionIndecies[0] >= 3 }">3</li>
            <li
              class="flex items-center justify-center aspect-square rounded-full w-10 text-2xl text-center font-bold text-cyan-700 border-[1px] border-neutral-200 shadow"
              @click="selectionIndecies[0] = 4" :class="{ 'bg-blue-300': selectionIndecies[0] >= 4 }">4</li>
          </ul>
          <div class="text-center bg-cyan-100 p-4 rounded-xl min-h-[8rem]">
            <h2 class="text-xl font-semibold text-cyan-600 mb-2">{{ intensity[selectionIndecies[0]].title }}</h2>
            <p class="text-lg text-cyan-700">{{ intensity[selectionIndecies[0]].description }}</p>
          </div>
          <div class="h-[0.10rem] w-1/2 bg-sky-100 my-8"></div>
          <button type="button" @click="formIndex++"
            class="relative flex gap-2 rounded-xl py-2 px-6 border-2 border-sky-200 bg-sky-600 font-semibold text-white text-xl w-fit shadow-md">
            Напред
            <Icon class="my-auto" icon="fa6-solid:chevron-right" />
          </button>
        </form>
      </section>
      <section v-show="formIndex == 3">
        <h1 class="text-3xl font-bold text-cyan-500 mb-8 text-center drop-shadow-sm">Опишете състоянието на
          инфраструктурата около вас</h1>
        <form class="flex flex-col items-center">
          <ul class="flex gap-3 w-fit mb-6">
            <li
              class="flex items-center justify-center aspect-square rounded-full w-10 text-2xl text-center font-bold text-cyan-700 border-[1px] border-neutral-200 shadow"
              @click="selectionIndecies[3] = 1" :class="{ 'bg-emerald-300': selectionIndecies[3] >= 1 }">1</li>
            <li
              class="flex items-center justify-center aspect-square rounded-full w-10 text-2xl text-center font-bold text-cyan-700 border-[1px] border-neutral-200 shadow"
              @click="selectionIndecies[3] = 2" :class="{ 'bg-teal-300': selectionIndecies[3] >= 2 }">2</li>
            <li
              class="flex items-center justify-center aspect-square rounded-full w-10 text-2xl text-center font-bold text-cyan-700 border-[1px] border-neutral-200 shadow"
              @click="selectionIndecies[3] = 3" :class="{ 'bg-sky-300': selectionIndecies[3] >= 3 }">3</li>
            <li
              class="flex items-center justify-center aspect-square rounded-full w-10 text-2xl text-center font-bold text-cyan-700 border-[1px] border-neutral-200 shadow"
              @click="selectionIndecies[3] = 4" :class="{ 'bg-blue-300': selectionIndecies[3] >= 4 }">4</li>
          </ul>
          <div class="text-center bg-cyan-100 p-4 rounded-xl min-h-[8rem]">
            <h2 class="text-xl font-semibold text-cyan-600 mb-2">{{ damage[selectionIndecies[3]].title }}</h2>
            <p class="text-lg text-cyan-700">{{ damage[selectionIndecies[3]].description }}</p>
          </div>
          <div class="h-[0.10rem] w-1/2 bg-sky-100 my-8"></div>
          <button type="button" @click="formIndex++"
            class="relative rounded-xl py-2 px-6 border-2 border-sky-200 bg-sky-600 font-semibold text-white text-xl w-fit shadow-md">
            Предаване
          </button>
        </form>
      </section>
      <section v-show="formIndex == 4">
        <h1 class="text-3xl font-bold text-cyan-500 mb-8 text-center drop-shadow-sm">Формата е изпратена</h1>
        <form class="flex flex-col items-center">
          <div class="text-center bg-cyan-100 p-4 rounded-xl min-h-[8rem]">
            <h2 class="text-xl font-semibold text-cyan-600 mb-2">Благодарим за вашето съдействие!</h2>
            <p class="text-lg text-cyan-700">Вашите сведения ще бъдат използвани за научни и приложни цели за повишаване
              качеството на превантивните мерки.</p>
          </div>
          <div class="h-[0.10rem] w-1/2 bg-sky-100 mb-8 mt-16"></div>
          <RouterLink to="/">
            <button type="button" @click="turnInForm()"
              class="relative rounded-xl py-2 px-6 border-2 border-sky-200 bg-sky-600 font-semibold text-white text-xl w-fit shadow-md">
              Връщане обратно
            </button>
          </Routerlink>
        </form>
      </section>
      <div v-show="formIndex < 4" class="flex gap-2 absolute w-fit left-0 right-0 mx-auto top-[95%]">
        <div class="aspect-square w-[0.60rem] border-[1px] border-neutral-300 rounded-full"
          :class="{ 'bg-sky-300': formIndex >= 0 }"></div>
        <div class="aspect-square w-[0.60rem] border-[1px] border-neutral-300 rounded-full"
          :class="{ 'bg-sky-300': formIndex >= 1 }"></div>
        <div class="aspect-square w-[0.60rem] border-[1px] border-neutral-300 rounded-full"
          :class="{ 'bg-sky-300': formIndex >= 2 }"></div>
        <div class="aspect-square w-[0.60rem] border-[1px] border-neutral-300 rounded-full"
          :class="{ 'bg-sky-300': formIndex >= 3 }"></div>
      </div>
    </div>
  </main>
</template>

<script setup>
// Import the needed libraries
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { fromLonLat } from 'ol/proj';

// Variables for the form data and slide management
const formIndex = ref(0)
const selectionIndecies = ref([1, 0, 0, 1])
const intensity = ref({
  1: {
    title: 'Леко тресене',
    description: 'Вибрации подобни на преминаващ камион или леко раздрусване. Предмети могат да бъдат леко разклатени.'
  },
  2: {
    title: 'Средно тресене',
    description: 'Малки предмети биват местени или съборени. Стъклата се тресат.'
  },
  3: {
    title: 'Силно тресене',
    description: 'Ходенето или стоенето прав е трудно. Мебели и вещи биват местени.'
  },
  4: {
    title: 'Много силно тресене',
    description: 'Ходенето или стоенето прав е невъзможно. Хора и големи предмети биват съборени на земята.'
  }
})
const damage = ref({
  1: {
    title: 'Няма поражение',
    description: 'Няма видимо поражение по околната инфраструктура.'
  },
  2: {
    title: 'Малко поражение',
    description: 'Малки пукнатини са видими по околната инфраструктура. Пътищата могат да поддържат регулярен трафик.'
  },
  3: {
    title: 'Силно поражение',
    description: 'Големи пукнатини са видими по околната инфраструктура. Покриви са под риск от разпадане. Пътищата могат да поддържат ограничен трафик.'
  },
  4: {
    title: 'Катастрофално поражение',
    description: 'Сгради са частично или напълно разрушени. Пътищата са неподходящи или непроходими за трафик.'
  }
})

// Variables for the map instance and user location
const mapRef = ref(null);
const markerLocation = ref(null);

// The onMounted hook is called when the component is mounted to the website DOM
// it allows us to access the DOM (HTML) elements and initialize the map
onMounted(() => {
  // Create a new map instance
  const map = new Map({
    // Reference the mapRef variable in the template to set the map target
    target: mapRef.value,
    // The layers array holds the map data and markers
    layers: [
      // Create a new map tile layer from the OpenStreetMap source
      new TileLayer({
        source: new OSM()
      }),
    ],
    // The view defines the center and zoom level of the map
    // We also center the map on Bulgaria,
    // and remove any default controls (zoom, rotate, etc.)
    view: new View({
      center: fromLonLat([23, 43]),
      zoom: 5,
    }),
    controls: []
  });

  // Add a new layer for the markers
  let markerLayer = new VectorLayer({
    source: new VectorSource(),
  });
  map.addLayer(markerLayer);

  // Add an event listener to the map for a click event
  map.on('click', function (event) {
    // Get the coordinates of the click event and set them to the marker location
    const coords = event.coordinate;
    markerLocation.value = coords;

    // Get the features (markers) from the marker layer
    const markerSource = markerLayer.getSource();
    const features = markerSource.getFeatures();

    // If there are no features i.e markers, add a new one
    if (features.length === 0) {
      const newMarker = new Feature({
        geometry: new Point(event.coordinate),
      });
      markerSource.addFeature(newMarker);
    } else {
      // If there is a feature, update its geometry to the new position
      const marker = features[0];
      marker.setGeometry(new Point(event.coordinate));
    }
  });
});
</script>
 
