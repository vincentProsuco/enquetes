<template>
<q-select label="Aanhef" outlined v-model="info.suffix" clearable class="q-mb-md" :options="['Dhr.', 'Mevr.', 'X']" />
  <q-input label="Voornaam" v-model="info.firstName" outlined clearable class="q-mb-md"/>
  <q-input label="Achternaam" v-model="info.lastName" outlined clearable class="q-mb-md"/>
  <q-input label="Email" v-model="info.email" outlined clearable class="q-mb-md"/>
  <q-input label="Telefoonnummer" v-model="info.telephone" outlined clearable class="q-mb-md"/>
</template>

<script>
export default {
    emits:['contact-info'],
  data() {
    return {info:{
        email:'',
        firstName:'',
        suffix:'',
        lastName:'',
        telephone:''
    }};
  },
  watch:{
      info:{
          handler(){
              this.$emit('contact-info', this.info)
          },
          deep:true

      }
        
}
};
</script>
