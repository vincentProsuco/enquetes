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
      class="q-mb-sm"
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>

    <div v-else>
      <div class="logocontainer">
        <q-img :src="klant.logo"></q-img>
        <q-btn
          class="imgDeleteButton"
          round
          size="xs"
          icon="close"
          color="red"
          unelevated
          @click="klant.logo = ''"
        />
      </div>
    </div>
  </q-list>
  <q-card-actions class="flex justify-end">
    <q-btn
      icon="save"
      flat
      label="Opslaan"
      color="secondary"
      @click="saveKlant"
    />
  </q-card-actions>
</template>

<script>
import { api } from "boot/axios";
export default {
  props: ["klantEdit"],
  emits: ["addKlantResult"],
  data() {
    return {
      klant: {
        naam: this.klantEdit.klant,
        website: this.klantEdit.website,
        email: this.klantEdit.email,
        logo: this.klantEdit.logo,
      },
    };
  },
  methods: {
    saveKlant() {
      var formData = {
        data: {
          naam: this.klant.naam,
          mail: this.klant.email,
          logo: this.klant.logo,
          website: this.klant.website,
        },
      };
      api.post("/klanten", formData).then(
        this.$emit("addKlantResult", "Klant toegevoegd")
      )
    },
  },
};
</script>

<style scoped>
.logocontainer {
  width: 150px;
  height: 150px;
  align-items: center;
  display: flex;
  padding: 0.5rem;
  border: 1px dashed rgb(211, 211, 211);
  border-radius: 6px;
}

.imgDeleteButton {
  align-self: flex-end;
  margin-right: -16px;
  margin-bottom: -16px;
}
</style>
