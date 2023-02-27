<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import leaflet from 'leaflet'

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

let map

onMounted(() => {
    map = leaflet.map('map').setView([45.14, 27.50], 6)

    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    leaflet.marker([43.35, 29.64]).addTo(map)
        .bindPopup('<p><b><u>BLACK SEA</u></b><br />22:54 07/02/2023<br />42.21°N 24.93°E<br />M=3.0 12.3 км.</p>')
    leaflet.marker([42.21, 26.26]).addTo(map)
        .bindPopup('<p><b><u>BULGARIA</u></b><br />22:54 07/02/2023<br />42.21°N 24.93°E<br />M=3.0 12.3 км.</p>')
    leaflet.marker([42.21, 24.93]).addTo(map)
        .bindPopup('<p><b><u>BULGARIA</u></b><br />22:54 07/02/2023<br />42.21°N 24.93°E<br />M=3.0 12.3 км.</p>')
    leaflet.marker([45.05, 23.22]).addTo(map)
        .bindPopup('<p><b><u>ROMANIA</u></b><br />22:54 07/02/2023<br />42.21°N 24.93°E<br />M=3.0 12.3 км.</p>')
    leaflet.marker([40.72, 22.87]).addTo(map)
        .bindPopup('<p><b><u>GREECE</u></b><br />22:54 07/02/2023<br />42.21°N 24.93°E<br />M=3.0 12.3 км.</p>')
    leaflet.marker([41.18, 24.93]).addTo(map)
        .bindPopup('<p><b><u>GREECE-BULGARIA<br />BORDER REGION</u></b><br />22:54 07/02/2023<br />42.21°N 24.93°E<br />M=3.0 12.3 км.</p>')

    leaflet.circle([42.14, 24.74], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 5000
    })
        .addTo(map)
        .bindPopup('<div class="flex gap-5"><p><b><u>Усетен Трус</u></b><br />Леко тресене - 1<br />Средно тресене - 2</p><p><b><u>Поражение</u></b><br />Няма поражение - 2<br />Малко поражение - 1</p></div>')

    leaflet.circle([41.72, 25.48], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 10000
    })
        .addTo(map)
        .bindPopup('<div class="flex gap-5"><p><b><u>Усетен Трус</u></b><br />Леко тресене - 1<br />Средно тресене - 2</p><p><b><u>Поражение</u></b><br />Няма поражение - 2<br />Малко поражение - 1</p></div>')

    leaflet.circle([40.62, 23.04], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 15000
    })
        .addTo(map)
        .bindPopup('<div class="flex gap-5"><p><b><u>Усетен Трус</u></b><br />Леко тресене - 1<br />Средно тресене - 2</p><p><b><u>Поражение</u></b><br />Няма поражение - 2<br />Малко поражение - 1</p></div>')

    leaflet.circle([44.17, 28.64], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    })
        .addTo(map)
        .bindPopup('<div class="flex gap-5"><p><b><u>Усетен Трус</u></b><br />Леко тресене - 1<br />Средно тресене - 2</p><p><b><u>Поражение</u></b><br />Няма поражение - 2<br />Малко поражение - 1</p></div>')
})
</script>

<template>
    <div class="relative">
        <nav class="h-24 pt-6 pr-8 bg-green-100 relative text-emerald-400 flex justify-end">
            <Icon class="text-5xl absolute top-6 left-6 transition-transform duration-300" icon="fa6-solid:bars" @click="isNavVisible = !isNavVisible" :class="{'rotate-180': isNavVisible}" />
            <RouterLink to="/quake-form">
                <button type="button"
                    class="bg-emerald-500 border-2 border-emerald-400 text-white font-bold h-fit p-3 rounded-xl">Усетих
                    трус</button>
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
            <div id="map" class="h-screen w-screen z-10"></div>
            <section
                class="absolute transition-transform duration-500 z-40 left-0 right-0 flex flex-col gap-10 h-screen w-full py-12 px-3 bg-white border-[1.5px] border-t-[6px] border-emerald-400 shadow-lg rounded-xl"
                :class="{ 'translate-y-[40rem]': !isTableVisible }">
                <div class="absolute flex justify-center -top-6 left-0 right-0 mx-auto rounded-full w-24 text-4xl font-bold text-cyan-700 border-2 border-emerald-400 bg-white shadow"
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
