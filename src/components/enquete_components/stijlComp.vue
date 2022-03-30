<template>
  <div class="row">
    <div class="col-6">
      <div>
        <div>
          <q-select
            filled
            v-model="stijl.fontface"
            use-input
            input-debounce="0"
            label="Lettertype"
            :options="options"
            behavior="dialog"
            @filter="filterFn"
            outlined
            :loading="loading"
            @virtual-scroll="onScroll"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Geen Lettertype gevonden
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-input
            class="q-mt-md"
            outlined
            v-model="stijl.fontcolor"
            label="Tekstkleur"
            dense
          >
            <template v-slot:before>
              <q-avatar
                square
                :style="{ backgroundColor: stijl.fontcolor }"
                text-color="black"
              />
            </template>
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color v-model="stijl.fontcolor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            class="q-mt-md"
            outlined
            v-model="stijl.achtergrondkleur"
            label="Achtergrondkleur"
            dense
          >
            <template v-slot:before>
              <q-avatar
                square
                :style="{ backgroundColor: stijl.achtergrondkleur }"
                text-color="black"
              />
            </template>
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color v-model="stijl.achtergrondkleur" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            class="q-mt-md"
            outlined
            v-model="stijl.btncolor"
            label="Button kleur"
            dense
          >
            <template v-slot:before>
              <q-avatar
                square
                :style="{ backgroundColor: stijl.btncolor }"
                text-color="black"
              />
            </template>
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color v-model="stijl.btncolor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { api } from "boot/axios";




export default {
  props: ["save", "editData"],
  setup() {
    var $store = useStore();
    var $q = useQuasar();
    $q.loading.show();
    $store.dispatch("googlefonts/getFonts");
  },
  mounted() {
    this.$q.loading.hide();
    this.$emit("updateEvent", { val: this.stijl, cat: "stijl" });
    if (this.editData.options[0]) {
      this.stijl.fontface = this.editData.options[0].fontface;
      this.stijl.fontcolor = this.editData.options[0].fontcolor;
      this.stijl.achtergrondkleur = this.editData.options[0].achtergrondkleur;
      this.stijl.btncolor = this.editData.options[0].btncolor;
    }
  },
  data() {
    return {
      options: ref(this.rows),
      rows: this.$store.state.googlefonts.googlefonts,
      showFonts: false,
      loading: false,
      stijl: {
        fontface: { label: "Roboto", value: "Roboto" },
        fontcolor: "#000",
        achtergrondkleur: "#ffffff",
        btncolor: "#26A69A",
        textalign: "center",
        logo: "top",
      },
    };
  },
  watch: {
    save() {
      this.$emit("getData", { object: this.stijl, item: "Stijl" });
    },
    stijl: {
      deep: true,
      handler() {
        this.$emit("updateEvent", { val: this.stijl, cat: "stijl" });
      },
    },
    editData(val) {
      console.log(val);
    },
  },
  methods: {
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.options = this.$store.state.googlefonts.googlefonts;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options = this.options.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
};
</script>
