<template>
    <div class="row q-pa-lg">
      <div class="col flex justify-center">
        <span class="vraag" v-html="vraag.waarde.vraag" />
      </div>
    </div>
</template>

<script>
export default {
    props:['vraag']
    
}
</script>
<style scoped>
.vraag {
  font-size: 1.5rem;
}
.rij:hover {
  background-color: rgba(0, 0, 0, 0.045);
}
</style>