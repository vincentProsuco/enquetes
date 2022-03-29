<template>
<q-card-section>
  <q-list>
    <q-input outlined label="Naam" v-model="klant.naam" class="q-mb-sm" :rules="rules.naam"/>
    <q-input
      outlined
      label="Website"
      v-model="klant.website"
      type="url"
      class="q-mb-sm"
      :rules="rules.url"
    />
    <q-input
      outlined
      label="E-mail"
      v-model="klant.email"
      type="email"
      class="q-mb-sm"
      :rules="rules.email"
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
</q-card-section>
<q-card-actions class="flex justify-end">
        <q-btn
          icon="save"
          flat
          label="Opslaan"
          color="secondary"
          @click="save"
        />
       
      </q-card-actions>
</template>

<script>
import { api } from 'boot/axios'
export default {
  props:['klantEdit'],
  emits:['form-send'],
  data() {
    return {
      rules:{
        naam:[val => !!val || 'Naam is verplicht!', val => val != ' ' || 'Minimaal 1 teken!'],
        email:[val => !!val || 'Email is verplicht!', val => val.length > 4 || 'Minimaal 5 tekens!', val => val.includes('.') || 'Geen geldig emailadres!', val => val.includes('@') || 'Geen geldig emailadres!'],
        url:[val => !!val || 'Website is verplicht!', val => val.length > 4 || 'Minimaal 5 tekens!', val => val.includes('.') || 'Geen geldige URL!', val => val.includes('https://', 'http://') || 'Geen geldige URL!']
      },
      klant: { 
        naam: this.klantEdit.name,
        website: this.klantEdit.websiteUrl,
        email: this.klantEdit.email,
        logo: this.klantEdit.logo
        },
    };
  },
  methods:{
    validate(e){
      if(e && e.length < 3){
         return {status:true, message:"lorem ipsum"}
      }
      else{
        return {status:false, message:''}
      }
     
      
    },
    save(){
      var data = {
        name: this.klant.naam,
        slug: this.klant.naam.replaceAll(' ', '-'),
        websiteUrl: this.klant.website,
        email: this.klant.email,
      }
      if(this.klantEdit){
        api.put(`/clients/${this.klantEdit.id}`, data).then(response =>{
        this.$emit('form-send', 'Klant bijgewerkt.')
      })
      }
      else{
      api.post('/clients', data).then(response =>{
        this.$emit('form-send', 'Klant toegevoegd!')
      })
      }
      }
  }
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