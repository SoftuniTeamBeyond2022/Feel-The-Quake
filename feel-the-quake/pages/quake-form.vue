<template>
    <div class="flex flex-col items-center justify-center">
        <img src="@/assets/images/redChina.webp" alt="redChina" />
    </div>

  <div class="rounded border-2 border-indigo-500">
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-2xl font-bold">Did you feel the quake?</h1>
      <p class="text-sm">Please fill out the form below</p>
      <form class="flex flex-col border-y">
        <label for="name">Lorem </label>
        <input id="name" type="text" class="border">

        <label for="email">Ipsum </label>
        <input id="email" type="text" class="border">

        <label for="input_3">Dolor </label>
        <input id="input_3" type="text" class="border">

        <label for="input_4">Sit Amet </label>
        <input id="input_4" type="text" class="border">

        <input type="button" class="rounded-full border-2 bg-blue-500" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
export default {

}
</script>