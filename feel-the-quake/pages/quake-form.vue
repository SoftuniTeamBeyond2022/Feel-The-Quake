<template>
  <main class="flex justify-center items-center h-full min-h-screen bg-blue-300">
    <div class="relative flex flex-col h-fit py-12 px-8 mx-8 bg-white border-[1.5px] border-b-[6px] border-b-sky-200 shadow-lg rounded-xl">
      <h1 class="text-3xl font-bold text-cyan-500 mb-8 text-center drop-shadow-sm">How intense was the earthquake?</h1>
      <form class="flex flex-col items-center">
        <ul class="flex gap-3 w-fit">
          <li class="flex items-center justify-center aspect-square rounded-full w-10 text-2xl text-center font-bold text-cyan-700 border-[1px] border-neutral-200 shadow" @click="selectedIndex = 1" :class="{'bg-green-300' : selectedIndex >= 1}">1</li>
          <li class="flex items-center justify-center aspect-square rounded-full w-10 text-2xl text-center font-bold text-cyan-700 border-[1px] border-neutral-200 shadow" @click="selectedIndex = 2" :class="{'bg-emerald-300' : selectedIndex >= 2}">2</li>
          <li class="flex items-center justify-center aspect-square rounded-full w-10 text-2xl text-center font-bold text-cyan-700 border-[1px] border-neutral-200 shadow" @click="selectedIndex = 3" :class="{'bg-teal-300' : selectedIndex >= 3}">3</li>
          <li class="flex items-center justify-center aspect-square rounded-full w-10 text-2xl text-center font-bold text-cyan-700 border-[1px] border-neutral-200 shadow" @click="selectedIndex = 4" :class="{'bg-sky-300' : selectedIndex >= 4}">4</li>
          <li class="flex items-center justify-center aspect-square rounded-full w-10 text-2xl text-center font-bold text-cyan-700 border-[1px] border-neutral-200 shadow" @click="selectedIndex = 5" :class="{'bg-blue-300' : selectedIndex >= 5}">5</li>
        </ul>
        <div class="h-[0.10rem] w-1/2 bg-sky-100 my-8"></div>
        <button @click="selectedIndex = 5" class="rounded-xl p-1 px-6 border-2 border-sky-200 bg-sky-600 font-semibold text-white text-xl w-fit shadow-md">
          Next <Icon name="fa6-solid:chevron-right" />
        </button>
      </form>
      <div class="flex gap-2 absolute w-fit left-0 right-0 mx-auto top-[95%]">
        <div class="aspect-square w-[0.60rem] border-[1px] border-neutral-200 bg-sky-300 rounded-full"></div>
        <div class="aspect-square w-[0.60rem] border-[1px] border-neutral-200 rounded-full"></div>
        <div class="aspect-square w-[0.60rem] border-[1px] border-neutral-200 rounded-full"></div>
        <div class="aspect-square w-[0.60rem] border-[1px] border-neutral-200 rounded-full"></div>
      </div>
    </div>
  </main>
</template>

<script setup>
const selectedIndex = ref(0)
</script>