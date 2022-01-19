<template>
  <q-list>
    <q-input outlined label="Naam" v-model="klant.naam" class="q-mb-sm" />
    <q-input
      outlined
      label="Website"
      v-model="klant.website"
      type="url"
      class="q-mb-sm"
    />
    <q-input
      outlined
      label="E-mail"
      v-model="klant.email"
      type="email"
      class="q-mb-sm"
    />
    <q-file
    v-if="!klant.logo"
      outlined
      label="Logo"
      v-model="klant.logo"
      type="file"
      class="q-mb-sm"
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
    
    <div v-else>
      <div class="logocontainer"><q-img :src="klant.logo" />
      <q-btn class="imgDeleteButton" round size="xs" icon="close" color="red" unelevated @click="klant.logo = ''" />
      </div>
    </div>
    
  </q-list>
</template>

<script>
export default {
  props:['klantEdit'],
  data() {
    return {
      klant: { 
        naam: this.klantEdit.klant,
        website: this.klantEdit.website,
        email: this.klantEdit.email,
        logo: this.klantEdit.logo},
    };
  },
};
</script>

<style scoped>
.logocontainer{
  width:150px;
  height: 150px;
  align-items: center;
  display: flex;
  padding:0.5rem;
  border: 1px dashed rgb(211, 211, 211);
  border-radius: 6px;
  
}

.imgDeleteButton {
  align-self: flex-end;
  margin-right: -16px;
  margin-bottom:-16px;
}
</style>