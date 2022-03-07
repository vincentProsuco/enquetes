<template>
  <q-layout view="lHh Lpr LFF">
    <q-header>
      <q-toolbar class="bg-grey-3">
        <q-img :src="require('assets/prosuco-logo.png')" class="" style="width:128px;"/>
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
          
            
          
        </q-item>
        <q-item
          v-for="(link, index) in menuItems"
          :key="link"
          :to="link.url"
          class="menuItem"
          active-class="bg-primary"
          @click="activeIcon(index)"
        >
          <q-item-section>
            <q-icon color="grey-2" :name="link.isActive ? link.activeIcon:link.icon" size="24px"/>
          </q-item-section>
          <q-item-section class="text-grey-2">{{
            link.naam
          }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="d-flex flex-center">
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
        { naam: "Dashboard", link: "/", icon: "o_space_dashboard", activeIcon:'space_dashboard', isActive:true, url: "/" },
        { naam: "Klanten", link: "/", icon: "o_store", activeIcon:'store', isActive:false, url: "/klanten" },
        { naam: "Enquetes", link: "/", icon: "o_ballot", activeIcon:'ballot', isActive:false, url: "/enquetes" },
        // { naam: "Instellingen", link: "/", icon: "o_tune", activeIcon:'tune', isActive:false, url: "/instellingen" },
      ],
    };
  },
  methods: {
    darkMode() {
      this.$q.dark.toggle();
      this.modeIcon = !this.modeIcon;
    },
    activeIcon(e){
      for(var i = 0; i < this.menuItems.length; i++){
        this.menuItems[i].isActive = false
      }
      this.menuItems[e].isActive = true
    }
  },
};
</script>

<style>
.menuItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  justify-content: center;
  height: 5rem;
  padding: 1rem;
  font-weight: 300;
  line-height: 1.5rem;
  letter-spacing: 0.05rem;
  font-size: 0.75rem;
}

.menuItem:hover {
  background-color: rgba(248, 242, 242, 0.144);
}
.logo{
  filter: brightness(0) invert(1);
}
</style>
