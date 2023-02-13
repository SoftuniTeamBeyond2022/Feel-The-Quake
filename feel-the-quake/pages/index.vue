<template>
    <main class="h-screen bg-red-500 p-12">
        <img class="mx-auto" src="@/assets/images/redChina.png" alt="redChina" />
        <h1 class="text-white font-bold text-4xl text-center mt-12">Did you feel the quake?</h1>
        <NuxtLink to="/quake-form">
            <button class="bg-green-300 p-2 w-full mt-14 text-2xl">   
                Yes
            </button>
        </NuxtLink>
        <NuxtLink to="/home">
            <button class="bg-red-300 p-2 w-full mt-4 text-2xl">
                No
            </button>
        </NuxtLink>
    </main>
</template>

<script> 
export default {

}
</script>