<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="flex justify-center h-full min-h-screen bg-red-400 p-3 pt-36">
        <section
            class="relative flex flex-col justify-between h-[65vh] w-full py-12 px-6 bg-white border-[1.5px] border-b-[6px] border-red-200 shadow-lg rounded-xl">
            <h1 class="text-red-400 font-bold text-4xl text-center my-12 drop-shadow-md">Почувствахте ли земетресение?</h1>
            <div>
                <RouterLink to="/quake-form">
                    <button class="bg-green-300 border-2 border-green-200 rounded-xl p-2 w-full mt-14 text-2xl shadow-md">
                        Да
                    </button>
                </RouterLink>
                <div class="h-[0.10rem] w-1/2 bg-red-200 mx-auto my-2"></div>
                <RouterLink to="/hub">
                    <button class="bg-red-300 border-2 border-red-200 rounded-xl p-2 w-full text-2xl shadow-md">
                        Не
                    </button>
                </RouterLink>
            </div>
        </section>
    </main>
</template>
