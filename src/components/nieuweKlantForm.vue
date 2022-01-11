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
  </q-list>
</template>

<script>
export default {
  data() {
    return {
      klant: { naam: "", website: "", email: "", logo: "" },
    };
  },
};
</script>
