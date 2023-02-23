<template>
    <main class="h-full min-h-screen bg-[#2CB13A] p-12">
        <div class="mx-auto max-w-[17rem]">
            <img src="@/assets/images/greenChina.jpg" alt="greenChina" />
        </div>
        <h1 class="text-white font-bold text-4xl text-center mt-12"></h1>
        <button class=" bg-green-300 p-2 w-full mt-14 text-2xl">   
            What to do next
        </button>
        <button class="bg-yellow-300 p-2 w-full mt-4 text-2xl">   
            Lorem Ipsum
        </button>
        <NuxtLink to="/">
            <button class="bg-red-300 p-2 w-full mt-4 text-2xl">
                Go back
            </button>
        </NuxtLink>
    </main>
</template>

<script> 
export default {

}
</script>