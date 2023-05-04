<template>
  <div class="relative">
    <nav class="h-24 pt-6 pr-8 bg-green-100 relative text-emerald-400 flex justify-end">
      <Icon class="text-5xl absolute top-6 left-6 transition-transform duration-300" icon="fa6-solid:bars"
        @click="isNavVisible = !isNavVisible" :class="{ 'rotate-180': isNavVisible }" />
      <RouterLink to="/quake-form">
        <button type="button"
          class="bg-emerald-500 border-2 border-emerald-400 text-white font-bold h-fit p-3 rounded-xl">Усетих
          трус
        </button>
      </RouterLink>
    </nav>
    <transition name="fade">
      <aside v-show="isNavVisible" class="absolute z-50 h-screen w-screen bg-white opacity-90">
        <div class="flex flex-col gap-6 text-3xl text-center pt-14">
          <span class="border-b-2 pb-4">Lorem</span>
          <span class="border-b-2 pb-4">Ipsum</span>
          <span class="border-b-2 pb-4">Dolor</span>
          <span class="border-b-2 pb-4">Sit</span>
        </div>
      </aside>
    </transition>
    <main class="flex justify-between h-full min-h-screen bg-green-100">
      <ol-map class="w-full" :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true">
        <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

        <ol-tile-layer>
          <ol-source-osm />
        </ol-tile-layer>

        <ol-vector-layer>
          <ol-source-vector :url="url" :format="geoJson"></ol-source-vector>
          <ol-style>
            <ol-style-circle radius="15">
              <ol-style-fill :color="'rgba(147, 197, 253, 0.8)'"></ol-style-fill>
              <ol-style-stroke color="white" :width="1"></ol-style-stroke>
            </ol-style-circle>
          </ol-style>
          <ol-interaction-select :condition="ol.events.condition.click">
            <template #select>
              <ol-popup ref="popup">
                <div>{{ selectedFeature.get('name') }}</div>
              </ol-popup>
            </template>
          </ol-interaction-select>
        </ol-vector-layer>
      </ol-map>
      <section
        class="absolute transition-transform duration-500 z-40 left-0 right-0 flex flex-col gap-10 h-screen w-full py-12 px-3 bg-white border-[1.5px] border-t-[6px] border-emerald-400 shadow-lg rounded-xl"
        :class="{ 'translate-y-[40rem]': !isTableVisible }">
        <div
          class="absolute flex justify-center -top-6 left-0 right-0 mx-auto rounded-full w-24 text-4xl font-bold text-cyan-700 border-2 border-emerald-400 bg-white shadow"
          @click="isTableVisible = !isTableVisible">
          <Icon class="mb-1 transition-transform duration-200" icon="fa6-solid:chevron-up"
            :class="{ 'rotate-180': isTableVisible }" />
        </div>
        <h1 class="text-teal-500 font-bold text-4xl text-center drop-shadow-md">Последни земетресения</h1>
        <table class="text-xs text-center">
          <tr class="h-10">
            <th>№</th>
            <th>Час/дата (GMT)</th>
            <th>Магнитуд</th>
            <th>Lat°</th>
            <th>Lon°</th>
            <th>Дълб.</th>
          </tr>
          <tr class="h-12 border-y-[1px]" v-for="(quake, index) in quakeData" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ quake.dateTime }}</td>
            <td>{{ quake.magnitude }}</td>
            <td>{{ quake.latitude }}</td>
            <td>{{ quake.longitude }}</td>
            <td>{{ quake.depth }}</td>
          </tr>
        </table>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { Icon } from '@iconify/vue'
import { Geolocation } from '@capacitor/geolocation';
import * as olProj from 'ol/proj';

const isNavVisible = ref(false)
const isTableVisible = ref(false)
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
  }
])

const center = ref([0, 0]);
const projection = ref("EPSG:3857");
const zoom = ref(8);
const rotation = ref(0);
const format = inject("ol-format");
const geoJson = new format.GeoJSON();

const url = ref(
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"
);

onMounted(() => {
  const currentPosition = async () => {
    return await Geolocation.getCurrentPosition();
  }

  currentPosition()
    .then((position) => {
      center.value = olProj.fromLonLat([position.coords.longitude, position.coords.latitude])
    });
})
</script>
