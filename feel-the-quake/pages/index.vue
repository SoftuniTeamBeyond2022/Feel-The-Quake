<template>
    <main class="flex items-center justify-center h-full min-h-screen bg-red-400 p-12">
        <div>
            <h1 class="text-white font-bold text-4xl text-center mt-12 drop-shadow-md">Did you feel a quake?</h1>
            <NuxtLink to="/quake-form">
                <button class="bg-green-300 border-2 border-green-200 rounded-xl p-2 w-full mt-14 text-2xl shadow-md">   
                    Yes
                </button>
            </NuxtLink>
            <div class="h-[0.10rem] w-1/2 bg-red-200 mx-auto my-2"></div>
            <NuxtLink to="/home">
                <button class="bg-red-300 border-2 border-red-200 rounded-xl p-2 w-full text-2xl shadow-md">
                    No
                </button>
            </NuxtLink>
        </div>
    </main>
</template>

<script> 
export default {

}
</script>