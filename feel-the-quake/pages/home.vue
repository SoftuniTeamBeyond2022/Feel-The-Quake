<template>
    <main class="flex justify-between h-full min-h-screen bg-green-300 pt-40">
        <section>
        </section>
        <section
            class="absolute transition-transform duration-500 z-50 left-0 right-0 flex flex-col gap-10 h-fit w-full py-12 px-3 bg-white border-[1.5px] border-t-[6px] border-emerald-400 shadow-lg rounded-xl"
            :class="{ 'translate-y-[32rem]': !isTableVisible }">
            <div class="absolute -top-8 left-0 right-0 mx-auto rounded-full w-24 text-4xl text-center font-bold text-cyan-700 border-2 border-emerald-400 bg-white shadow"
                @click="isTableVisible = !isTableVisible">
                <Icon class="mb-1 transition-transform duration-200" name="fa6-solid:chevron-up" :class="{'rotate-180' : isTableVisible}" />
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
</template>

<script setup>
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
</script>