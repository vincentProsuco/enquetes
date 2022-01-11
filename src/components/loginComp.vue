<template>
  <q-card style="width: 400px;">
      <q-card-section class="bg-primary text-white text-bold">Inloggen</q-card-section>
    <q-card-section class="q-gutter-md">
      <q-input filled label="gebruikersnaam" v-model="uName" outlined type="text" color="teal" :disable="loading"/>
      <q-input filled label="Wachtwoord" outlined v-model="pass" :type="isPwd ? 'text' : 'password'" color="teal" :disable="loading">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </q-card-section>
    <q-card-actions class="bg-grey-1 flex justify-end">
      <q-btn
        label="inloggen"
        color="primary"
        unelevated
        :loading="loading"
        @click="loading = !loading"
      />
      <q-btn label="Wachtwoord vergeten?" color="primary" flat size="sm" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      isPwd: false,
      uName:'',
      pass:'',
    };
  },
};
</script>
