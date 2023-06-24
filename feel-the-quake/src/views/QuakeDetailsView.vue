<template>
    <main class="flex flex-col h-full bg-green-100">
        <div id="map" ref="mapRef" class="w-full h-[80vh]" :class="{ 'invisible': isLoading }"></div>
        <div id="overlay" ref="overlayRef" class="relative" :class="{ 'invisible': isLoading }">
            <div class="flex flex-col relative z-10 bg-white text-sky-900 text-xs rounded-lg p-2 w-[12rem]">
                <h1 class="text-sm font-semibold text-cyan-600">Почувствано:</h1>
                <div class="flex gap-2 pl-2">
                    <p class="flex items-center">- {{ overlayContent.feltScore.description }}</p>
                    <p class="flex items-center justify-center aspect-square rounded-full text-center text-base p-1 ml-auto font-bold text-cyan-700 border-[1px] border-neutral-200 shadow"
                        :style="{ 'background-color': getColorClass(overlayContent.feltScore.value + 1) }">
                        {{ overlayContent.feltScore.value }}
                    </p>
                </div>
                <h1 class="text-sm font-semibold text-cyan-600 border-t-2 mt-2 pt-2">Поражение:</h1>
                <div class="flex gap-2 pl-2">
                    <p class="flex items-center">- {{ overlayContent.damageScore.description }}</p>
                    <p class="flex items-center justify-center aspect-square rounded-full text-center text-base p-1 ml-auto font-bold text-cyan-700 border-[1px] border-neutral-200 shadow"
                        :style="{ 'background-color': getColorClass(overlayContent.damageScore.value + 1) }">
                        {{ overlayContent.damageScore.value }}
                    </p>
                </div>
            </div>
            <div class="w-0 h-0 absolute z-0 -bottom-2 left-0 right-0 mx-auto
                        border-l-[40px] border-l-transparent
                        border-t-[35px] border-t-white
                        border-r-[40px] border-r-transparent">
            </div>
        </div>
        <section
            class="absolute top-[75vh] flex flex-col h-auto w-full bg-white rounded-t-2xl border-t-4 border-2 border-cyan-400">
            <div class="flex p-6 gap-5" :class="{ 'invisible': isLoading }">
                <p class="flex items-center justify-center aspect-square rounded-full text-center text-2xl p-5 font-bold text-cyan-700 border-[1px] border-cyan-200 shadow"
                    :style="{ 'background-color': getColorClass(cardContent.mag) }">
                    {{ cardContent.mag.toFixed(1) }}
                </p>
                <div class="flex flex-col justify-center">
                    <h1 class="text-bold text-cyan-500 mb-1 ml-2 text-xl">{{ cardContent.place }}</h1>
                    <p class="ml-2 text-cyan-700">{{ cardContent.time.toLocaleDateString() }}</p>
                </div>
            </div>
            <div class="flex" :class="{ 'invisible': isLoading }">
                <div class="w-full h-[0.15rem] my-4 rounded-full mx-24 bg-cyan-100"></div>
            </div>
            <ul class="text-cyan-800 text-opacity-90 mx-4 pt-4 pb-10 flex flex-col gap-2"
                :class="{ 'invisible': isLoading }">
                <li class="mb-4 font-semibold text-xl">Информация</li>
                <li class="flex gap-3">
                    <Icon icon="fa6-solid:location-crosshairs" class="my-auto" /> {{ cardContent.lon }}° N, {{
                        cardContent.lat }}° E
                </li>
                <li class="flex gap-3">
                    <Icon icon="fa6-solid:square-caret-down" class="my-auto" /> Дълбочина - {{ cardContent.depth }} km
                </li>
                <li class="flex gap-3">
                    <Icon icon="fa6-solid:clock" class="my-auto" /> Час/Дата - {{ cardContent.time.toLocaleTimeString() }}
                    {{ cardContent.time.toLocaleDateString() }}
                </li>
            </ul>
            <div class="flex" :class="{ 'invisible': isLoading }">
                <div class="w-full h-[0.15rem] my-4 rounded-full mx-24 bg-cyan-100"></div>
            </div>
            <p class="text-center text-cyan-700 text-opacity-90 my-2">НИГГГ-БАН | Секция сеизмология</p>
        </section>
        <RouterLink to="/hub">
            <button type="button"
                class="absolute top-6 left-6 bg-white flex items-center justify-center aspect-square rounded-full w-10 text-xl text-center text-cyan-700 border-[1px] border-neutral-200 shadow">
                <Icon icon="fa6-solid:chevron-left" />
            </button>
        </RouterLink>
        <RouterLink to="/quake-form">
            <button type="button"
                class="absolute top-6 right-6 bg-teal-500 border-2 border-teal-400 text-white text-sm font-bold h-fit w-36 p-3 rounded-xl">
                Споделете ваши сведения
            </button>
        </RouterLink>
    </main>
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
import { RegularShape } from 'ol/style';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';

const route = useRoute();
const quakeId = ref(route.params.id);
const isLoading = ref(true);
const mapRef = ref(null);
const overlayRef = ref(null);
const overlayContent = ref({
    feltScore: {
        description: '',
        value: 0,
    },
    damageScore: {
        description: '',
        value: 0,
    },
});
const cardContent = ref({
    place: 'LOREM IPSUM',
    mag: 0,
    time: new Date('2022-01-01T00:00:00'),
    lon: 0,
    lat: 0,
    depth: 0,
});

// console.log(`https://www.seismicportal.eu/fdsnws/event/1/query?limit=10&eventid=${quakeId.value}&format=json`)

// Function to get the color class for the earthquake marker,
// based on its magnitude
function getColorClass(mag) {
    if (mag <= 2.0) {
        return '#bbf7d0';
    } else if (mag <= 3.0) {
        return '#99f6e4';
    } else if (mag <= 4.0) {
        return '#bae6fd';
    } else if (mag <= 5.0) {
        return '#bfdbfe';
    } else if (mag <= 6.0) {
        return '#c7d2fe';
    } else {
        return '#fecdd3';
    }
}

// The onMounted hook runs when the component is mounted to the website DOM,
// it allows us to access the DOM (HTML) elements and initialize the map
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
                    url: `https://www.seismicportal.eu/fdsnws/event/1/query?limit=1&eventid=${quakeId.value}&format=json`,
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
            zoom: 7,
        }),
        controls: []
    });

    // Create a new vector layer for the user feedback markers
    const feedbackMarkerLayer = new VectorLayer({
        source: new VectorSource(),
        style: new Style({
            image: new RegularShape({
                fill: new Fill({
                    color: '#93c5fd',
                }),
                stroke: new Stroke({
                    color: 'white',
                    width: 2,
                }),
                points: 3,
                radius: 10,
                rotation: Math.PI, // rotate the triangle by 180 degrees ;)
            }),
        }),
    });

    // Add the offset marker layer to the map
    map.addLayer(feedbackMarkerLayer);

    // Get the vector source of the GeoJSON earthquake layer
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

            // Create three new features with an offset from the earthquake, which serve as placeholder feedback markers
            const offset = 30000; // adjust this value to change the distance of the offset markers
            const feature1 = new Feature({
                geometry: new Point([coordinate[0] + offset, coordinate[1] + offset]),
                feltScore: {
                    description: 'Средно тресене',
                    value: 2,
                },
                damageScore: {
                    description: 'Няма поражение',
                    value: 1,
                },
            });
            const feature2 = new Feature({
                geometry: new Point([coordinate[0] - offset, coordinate[1] + offset]),
                feltScore: {
                    description: 'Силно тресене',
                    value: 3,
                },
                damageScore: {
                    description: 'Малко поражение',
                    value: 2,
                },
            });
            const feature3 = new Feature({
                geometry: new Point([coordinate[0], coordinate[1] - offset]),
                feltScore: {
                    description: 'Леко тресене',
                    value: 1,
                },
                damageScore: {
                    description: 'Няма поражение',
                    value: 1,
                },
            });

            // Add the new features to the feedback marker layer
            feedbackMarkerLayer.getSource().addFeatures([feature1, feature2, feature3]);

            console.log(features[0].getProperties())

            // Get the feature properties
            const { flynn_region, mag, time, depth } = features[0].getProperties();

            // If there is no place, magnitude or time,
            // we don't want to display the overlay
            if (!flynn_region || !mag || !time || !depth)
                return;

            // Format the longitude and latitude coordinates
            const lon = coordinate[0].toFixed(2);
            const lat = coordinate[1].toFixed(2);
            const formattedLon = lon.slice(0, 2) + lon.slice(lon.indexOf('.'), lon.indexOf('.') + 3);
            const formattedLat = lat.slice(0, 2) + lat.slice(lat.indexOf('.'), lat.indexOf('.') + 3);

            cardContent.value.place = flynn_region;
            cardContent.value.mag = mag;
            cardContent.value.time = new Date(time);
            cardContent.value.lon = formattedLon;
            cardContent.value.lat = formattedLat;
            cardContent.value.depth = depth;

            // Center the map on the coordinates of the first feature
            map.getView().setCenter(coordinate);

            // Set the loading state to false
            isLoading.value = false;
        }
    });

    // Create a new overlay instance, which will display the earthquake info,
    // when a marker is clicked
    const overlay = new Overlay({
        element: overlayRef.value,
        positioning: 'bottom-center',
        offset: [0, -10],
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
                console.log(feature);
                // Center the map view on the clicked feature
                const view = map.getView();
                view.animate({
                    center: feature.getGeometry().getCoordinates(),
                    duration: 1000
                });

                // Get the feature properties
                const { feltScore, damageScore } = feature.getProperties();

                // If there is no feltScore or damageScore,
                // we don't want to display the overlay
                if (!feltScore || !damageScore)
                    return;

                // Display the overlay and set its content
                overlay.setPosition(feature.getGeometry().getCoordinates());
                overlayContent.value.feltScore = feltScore;
                overlayContent.value.damageScore = damageScore;
            }
        });
    });
});
</script>