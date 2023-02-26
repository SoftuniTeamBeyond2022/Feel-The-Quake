<template>
  <main class="flex justify-center items-center h-full min-h-screen bg-blue-300">
    <div
      class="relative flex flex-col h-fit w-full pb-12 pt-16 px-6 mx-4 bg-white border-[1.5px] border-b-[6px] border-sky-200 shadow-lg rounded-xl">
      <button type="button" v-if="formIndex > 0 && formIndex < 4" @click="formIndex--"
        class="absolute top-2 left-3 flex items-center justify-center aspect-square rounded-full w-10 text-xl text-center text-cyan-600 border-[1px] border-neutral-200 shadow">
        <Icon name="fa6-solid:chevron-left" />
      </button>
      <button type="button" v-else-if="formIndex < 4" to="/home"
        class="absolute top-2 left-3 flex items-center justify-center aspect-square rounded-full w-10 text-xl text-center text-cyan-600 border-[1px] border-neutral-200 shadow">
        <Icon name="fa6-solid:x" />
      </button>
      <section v-if="formIndex == 0">
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
            class="relative rounded-xl py-2 px-6 border-2 border-sky-200 bg-sky-600 font-semibold text-white text-xl w-fit shadow-md">
            Напред
            <Icon class="my-auto" name="fa6-solid:chevron-right" />
          </button>
        </form>
      </section>
      <section v-if="formIndex == 1">
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
            class="relative rounded-xl py-2 px-6 border-2 border-sky-200 bg-sky-600 font-semibold text-white text-xl w-fit shadow-md">
            Напред
            <Icon class="my-auto" name="fa6-solid:chevron-right" />
          </button>
        </form>
      </section>
      <section v-if="formIndex == 2">
        <h1 class="text-3xl font-bold text-cyan-500 mb-12 text-center drop-shadow-sm">Какво е било вашето местоположение?
        </h1>
        <form class="flex flex-col items-center">
          <button type="button" @click="formIndex++"
            class="relative rounded-xl py-2 px-6 border-2 border-sky-200 bg-sky-600 font-semibold text-white text-xl w-fit shadow-md">
            Напред
            <Icon class="my-auto" name="fa6-solid:chevron-right" />
          </button>
        </form>
      </section>
      <section v-if="formIndex == 3">
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
          <button type="button" @click="turnInForm()"
            class="relative rounded-xl py-2 px-6 border-2 border-sky-200 bg-sky-600 font-semibold text-white text-xl w-fit shadow-md">
            Предаване
          </button>
        </form>
      </section>
      <section v-if="formIndex == 4">
        <h1 class="text-3xl font-bold text-cyan-500 mb-8 text-center drop-shadow-sm">Формата е изпратена</h1>
        <form class="flex flex-col items-center">
          <div class="text-center bg-cyan-100 p-4 rounded-xl min-h-[8rem]">
            <h2 class="text-xl font-semibold text-cyan-600 mb-2">Благодарим за вашето съдействие!</h2>
            <p class="text-lg text-cyan-700">Вашите сведения ще бъдат използвани за научни и приложни цели за повишаване
              качеството на превантивните мерки.</p>
          </div>
          <div class="h-[0.10rem] w-1/2 bg-sky-100 my-8"></div>
          <NuxtLink to="/home">
            <button type="button" @click="turnInForm()"
              class="relative rounded-xl py-2 px-6 border-2 border-sky-200 bg-sky-600 font-semibold text-white text-xl w-fit shadow-md">
              Връщане обратно
            </button>
          </NuxtLink>
        </form>
      </section>
      <div v-if="formIndex < 4" class="flex gap-2 absolute w-fit left-0 right-0 mx-auto top-[95%]">
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

function turnInForm() {
  formIndex.value++
}
</script>