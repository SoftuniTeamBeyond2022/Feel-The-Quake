<template>
  <main class="h-full min-h-screen bg-blue-300 p-12">
    <img class="mx-auto max-w-[13rem]" src="@/assets/images/thinkChina.jpg" alt="thinkChina" />
    <div class="flex flex-col place-items-center mt-8">
      <h1 class="text-2xl font-bold text-white mb-4">Please fill out the form below</h1>
      <form class="flex flex-col">
        <label for="name">Lorem </label>
        <input id="name" type="text" class="border mb-2">

        <label for="email">Ipsum </label>
        <input id="email" type="text" class="border mb-2">

        <label for="input_3">Dolor </label>
        <input id="input_3" type="text" class="border mb-2">

        <label for="input_4">Sit Amet </label>
        <input id="input_4" type="text" class="border mb-2">

        <NuxtLink to="/home">
          <input type="button" class="rounded-full border-2 bg-blue-500 text-white text-xl mt-4 w-full" value="Submit">
        </NuxtLink>
      </form>
    </div>
  </main>
</template>

<script>
export default {

}
</script>