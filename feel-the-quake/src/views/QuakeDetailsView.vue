<template>
    <div class="relative">
        <main class="flex h-full min-h-screen bg-green-100">
            <div id="map" ref="mapRef" class="w-full"></div>
            <!-- <div class="absolute top-12 left-2 p-2 m-1 bg-white bg-opacity-40 rounded-lg text-teal-800 text-sm">
                Tiles &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors<br>
                Data &copy; <a href="https://earthquake.usgs.gov/">USGS</a>
            </div> -->
            <section class="grid grid-cols-3 absolute bottom-0 h-36 w-full bg-white rounded-t-2xl border-t-4">
                <div class="col-span-1 flex items-center justify-center" :class="{'invisible': isLoading}">
                    <p class="flex items-center justify-center aspect-square rounded-full text-center text-2xl p-6 font-bold text-cyan-700 border-[1px] border-neutral-200 shadow"
                        :style="{ 'background-color': getColorClass(overlayContent.mag) }">
                        {{ overlayContent.mag.toFixed(1) }}
                    </p>
                </div>
                <div class="col-span-2 text-left flex flex-col justify-center" :class="{'invisible': isLoading}">
                    <h1 class="text-bold text-cyan-500 mb-1 ml-2 text-xl">{{ overlayContent.place }}</h1>
                    <p class="ml-2">{{ overlayContent.date }}</p>
                </div>
                <div class="col-span-3 flex justify-center" :class="{'invisible': isLoading}">
                    <!-- divider element -->
                    <div class="w-full h-[0.10rem] mt-4 rounded-full mx-12 bg-neutral-100"></div>
                </div>
            </section>
            <RouterLink to="/hub">
                <button type="button"
                    class="absolute top-6 left-6 bg-white flex items-center justify-center aspect-square rounded-full w-10 text-xl text-center text-emerald-600 border-[1px] border-neutral-200 shadow">
                    <Icon icon="fa6-solid:chevron-left" />
                </button>
            </RouterLink>
            <RouterLink to="/quake-form">
                <button type="button"
                    class="absolute top-6 right-6 bg-emerald-500 border-2 border-emerald-400 text-white text-sm font-bold h-fit w-36 p-3 rounded-xl">
                    Споделете ваши сведения
                </button>
            </RouterLink>
        </main>
    </div>
</template>

<script setup>
// Import the needed libraries
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
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


const route = useRoute();
const isLoading = ref(true);
const quakeId = ref(route.params.id);
const mapRef = ref(null);
const overlayContent = ref({
    place: '',
    mag: 0,
    time: new Date().toLocaleString()
});

console.log(`https://www.seismicportal.eu/fdsnws/event/1/query?limit=10&eventid=${quakeId.value}&format=json`)

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

onMounted(() => {
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
                    url: `https://www.seismicportal.eu/fdsnws/event/1/query?limit=10&eventid=${quakeId.value}&format=json`,
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
            center: fromLonLat([0, 0]),
            zoom: 5,
        }),
        controls: []
    });

    // Get the vector source of the GeoJSON layer
    const vectorSource = map.getLayers().item(1).getSource();

    // Wait for the vector source to load the features
    vectorSource.once('change', () => {
        // Get the features from the vector source
        const features = vectorSource.getFeatures();

        // Check if there is at least one feature
        if (features.length > 0) {
            // Get the geometry of the first feature
            const geometry = features[0].getGeometry();
            const coordinate = geometry.getCoordinates();

            // Get the feature properties
            const { flynn_region, mag, time } = features[0].getProperties();

            // If there is no place, magnitude or time,
            // we don't want to display the overlay
            if (!flynn_region || !mag || !time)
                return;

            // Set the overlay content
            overlayContent.value.place = flynn_region;
            overlayContent.value.mag = mag;
            overlayContent.value.date = new Date(time).toLocaleDateString();

            isLoading.value = false;

            // Center the map on the coordinates of the first feature
            map.getView().setCenter(coordinate);
        }
    });
});
</script>