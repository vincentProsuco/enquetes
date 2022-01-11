<template>
  <q-layout view="lHh Lpr LFF">
    <q-header>
      <q-toolbar
        :class="modeIcon ? 'bg-primary' : 'bg-grey-8'"
        class="shadow-2"
      >
        <!-- <q-btn :ripple="false" dense flat icon="subject" @click="drawer = !drawer" size="xs"/> -->

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="140"
      :breakpoint="500"
      class="bg-grey-9"
    >
      <q-list>
        <q-item class="flex flex-center q-pa-md">
        <q-avatar rounded class="q-my-sm" size="64px">
          <q-img :src="require('assets/prosucoLogo.png')" />
        </q-avatar>
        </q-item>
        <q-item
          clickable
          v-ripple
          v-for="link in menuItems"
          :key="link"
          :to="link.url"
          class="menuItem"
          active-class="bg-primary"
        
        >
          <q-item-section>
            <q-icon color="grey-2" :name="link.icon" />
          </q-item-section>
          <q-item-section class="text-grey-2 text-bold">{{ link.naam }}</q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container class="window-height">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
export default {
  setup() {
    const $q = useQuasar();
    $q.loadingBar.setDefaults({
      color: "primary",
      size: "10px",
      position: "bottom",
    });
  },
  data() {
    return {
      modeIcon: true,
      drawer: false,
      menuItems: [
        { naam: "Dashboard", link: "/", icon: "space_dashboard", url: "/" },
        { naam: "Klanten", link: "/", icon: "store", url: "/klanten" },
        { naam: "Enquetes", link: "/", icon: "ballot", url: "/enquetes" },
        { naam: "Instellingen", link: "/", icon: "tune", url: "/instellingen" },
      ],
    };
  },
  methods: {
    darkMode() {
      this.$q.dark.toggle();
      this.modeIcon = !this.modeIcon;
    },
  },
};
</script>

<style>
.menuItem{
display: flex;
flex-direction: column;
align-items: center;
justify-items: center;
justify-content: center;
height:5rem;
padding:1rem;
}

.menuItem:hover{
  background-color: rgba(248, 242, 242, 0.144);
}
</style>
