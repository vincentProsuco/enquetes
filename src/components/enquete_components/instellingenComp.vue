<template>
  <div class="row q-gutter-sm">
    <div class="col-6">
      <div class="border-md">
        <div>
          <q-select 
          outlined
          label="Klant"
          dense
          v-model="settings.klant"
          :options="[{label:'De Barkhoorn', value:'001122556'}, {label:'Oostappen Vakantieparken', value:'001122556'}, {label:'Hoge Hexel', value:'001122556'},]"
          />
            <q-input type="text" class="q-my-md" outlined v-model="settings.naam" label="Naam Enquête" dense />
        <q-list bordered>
        <q-item tag="label" v-ripple >
        <q-item-section>
          <q-item-label class="text-bold">Status</q-item-label>
          <q-item-label>{{statusText}}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
           <q-toggle toggle-indeterminate v-model="settings.status" icon="not_started" checked-icon="play_arrow" unchecked-icon="stop" color="secondary" />
        </q-item-section>
      </q-item>
      </q-list>

      <q-list bordered class="q-mt-md">
          <q-item>
          <q-item-section>
              <span class="text-bold">Eindtext:</span>
      <q-editor v-model="settings.eindText" min-height="8rem" class="q-mt-md"/>
          </q-item-section>
          </q-item>
      </q-list>
        </div>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['save'],
    data(){
        return{
            settings:{klant:'', naam:'', status:null, taal:'Selecteer Taal', eindText:'<center>Hartelijk dank voor uw deelname.</center>'}
        }
    },
    watch:{
     settings: {
      deep: true,
      handler(){
        this.$emit('updateEvent', this.items)
      }
        }
    },
    computed:{
        statusText(){
            var statusText =''
            var statusColor = ''
            if(this.settings.status === true){
                statusText = 'Actief' 
                statusColor = "green"               
            }
             else if(this.settings.status === false){
                statusText = 'Gesloten'                
            }
             else{
                statusText = 'Testfase'              
            }
            return statusText
        }
    }
    
}
</script>
