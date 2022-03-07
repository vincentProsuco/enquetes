<template>
  <q-layout view="lHh Lpr LFF">
    <q-page class="">  
      <div class="row window-height">
        <div class="col-6 flex flex-center">
          <div class="welkomContainer">
          <div class="welkom">
            <h1 class>Welkom!</h1>
            <span class="sub">Login met je gebruikersnaam en wachtwoord.</span>
          </div>
        <div class="form q-mt-xl">
          <q-form>
            <q-input type ="email" label="Gebruikersnaam" v-model="username"/>
             <q-input :type="isPwd ? 'password' : 'text'" label="Wachtwoord" v-model="password">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn label="inloggen" unelevated color="primary" class="full-width q-mt-md" :loading="loading" @click.prevent="inloggen" :disable="loading"/>
          </q-form>
        </div>
        </div>
        </div>
        <div class="col  rechts"></div>
        
      </div>
            
    </q-page>
  </q-layout>
</template>

<script>


export default {
  
  
    data(){
        return{
          username:'',
          password:'',
          loading:false,
            login:true,
            isPwd:true,
        }
    },
    methods:{
      inloggen(){
        this.loading=true
        // Inloggen
        this.$store.dispatch('user/login', this.username, this.password)
        setTimeout(() => {
          this.loading =false
          this.$router.push('/')
        }, 1500);
        
      }
    }
}
</script>

<style scoped>
.rechts{
  background-image: url('https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/07/11/11/harold-0.jpg?width=1200');
  background-size: cover;
  background-position: right;
  background-color: rgba(57, 121, 216, 0.37);
}
.welkomContainer{
  padding:2rem;
  display: flex;
  flex-direction: column;
}
.welkom{
  display: flex;
  flex-direction: column;
}
.sub{
  margin:0;
  font-weight: 300;
}
h1 {
  font-weight: 500;
  font-size: 2.5rem;
  margin:0;
  line-height: 3rem;
}
</style>
