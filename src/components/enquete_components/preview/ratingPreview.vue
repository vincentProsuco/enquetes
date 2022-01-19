<template>
  <div>
    <div class="row q-pa-lg">
      <div class="col flex justify-center">
        <span class="vraag" v-html="vraag.waarde.titel" />
      </div>
    </div>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <q-card>
          <q-card-section>
            <div
              class="row q-gutter-md"
              v-if="vraag.waarde.type.value === 'tekst'"
            >
              <div class="col">
                <q-icon name="question_answer" size="sm" color="teal" />
              </div>
              <div
                class="col flex flex-center"
                v-for="o in vraag.waarde.opties"
                :key="o"
              >
                {{ o.label }}
              </div>
            </div>
            <div class="row q-my-md">
              <div class="col">
                <div
                  class="row rij q-mb-sm flex"
                  v-for="(v, index) in vraag.waarde.vraag"
                  :key="v"
                >
                  <div class="col flex items-center q-pl-sm text-bold">
                    {{ v }}:
                  </div>

                <template v-if="vraag.waarde.type.value === 'tekst'">
                  <div class="col flex flex-center" v-for="o in vraag.waarde.opties" :key="o">                 
                    <q-radio v-model="dummyCheck[index]" :val="o.label" />
                  </div>
                </template>

                <div class="col-8 flex justify-end" v-else>                  
                    <q-rating
                                    v-model="dummyCheck[index]"
                                    :max="5"
                                    size="lg"
                                    color="teal"
                                    :icon="icons"
                                />
                  </div>
                  

                  


                  
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>


<script>
import { ref } from "vue";
export default {
  props: ["vraag"],
  mounted() {
    if (this.vraag.waarde.type.icon === "mood") {
      this.icons = [
        "sentiment_very_dissatisfied",
        "sentiment_dissatisfied",
        "sentiment_neutral",
        "sentiment_satisfied_alt",
        "sentiment_very_satisfied",
      ];
    }
    if (this.vraag.waarde.type.icon === "looks_3") {
      this.icons = ["looks_one", "looks_two", "looks_3", "looks_4", "looks_5"];
    }
  },
  data() {
    return {
      dummyCheck: [ref(1), ref(1)],
      icons: ["star_rate"],
    };
  },
};
</script>
<style scoped>
.vraag {
  font-size: 1.5rem;
}
.rij:hover {
  background-color: rgba(0, 0, 0, 0.045);
}
</style>