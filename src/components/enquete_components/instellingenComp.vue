<template>
  <div class="row q-gutter-sm">
    <div class="col-6">
      <div class="border-md">
        <div>
          <q-select
            outlined
            label="Klant"
            dense
            v-model="settings.client"
            :options="clients"
          />
          <q-input
            type="text"
            class="q-my-md"
            outlined
            v-model="settings.name"
            label="Naam Enquête"
            dense
          />
          <q-list bordered>
            <q-item tag="label" v-ripple>
              <q-item-section>
                <q-item-label class="text-bold">Status</q-item-label>
                <q-item-label>{{ statusText }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-toggle
                  toggle-indeterminate
                  v-model="settings.status"
                  icon="not_started"
                  checked-icon="play_arrow"
                  unchecked-icon="stop"
                  color="secondary"
                />
              </q-item-section>
            </q-item>
            
          </q-list>

            <q-list bordered class="q-mt-md">
            <q-item tag="label" v-ripple>
              <q-item-section>
                <q-item-label class="text-bold">Anoniem invullen toestaan?</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-toggle
                  v-model="settings.anoniem"
                  checked-icon="o_check"
                  unchecked-icon="o_close"
                  color="secondary"
                />
              </q-item-section>
            </q-item>
            
          </q-list>

          <q-list bordered class="q-mt-md">
            <q-item>
              <q-item-section>
                <span class="text-bold">Eindtext:</span>
                <q-editor
                  v-model="settings.completedDescription"
                  min-height="8rem"
                  class="q-mt-md"
                  :toolbar="toolbar"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "boot/axios";

export default {
  props: ["save", "editData"],
  emits: ["updateEvent"],
  data() {
    return {
      settings: {
        client: "",
        anoniem:true,
        name: "",
        status: null,
        completedDescription: "Hartelijk dank voor uw deelname.",
      },
      toolbar: this.$store.state.toolbar.toolbar,
      clients: [],
    };
  },
  watch: {
    editData(val) {
      if (val.status === "true") {
        this.settings.status = true;
      }
      if (val.status === "null") {
        this.settings.status = null;
      } 
       if (val.status === "false") {
        this.settings.status = false;
      } 
      this.settings.client = {
        label: this.editData.client.name,
        value: this.editData.client,
      };
      this.settings.name = this.editData.name;
      // this.settings.status = this.editData.status
      this.settings.completedDescription = this.editData.completedDescription;
    },
    settings: {
      deep: true,
      handler() {
        this.$emit("updateEvent", { cat: "instellingen", val: this.settings });
      },
    },
  },
  mounted() {
    api.get("/clients").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        this.clients.push({
          label: response.data[i].name,
          value: response.data[i],
        });
      }
    });
  },
  computed: {
    statusText() {
      var statusText = "";
      var statusColor = "";
      if (this.settings.status === true) {
        statusText = "Actief";
        statusColor = "green";
      } else if (this.settings.status === false) {
        statusText = "Gesloten";
      } else {
        statusText = "Testfase";
      }
      return statusText;
    },
  },
};
</script>
