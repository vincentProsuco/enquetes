<template>
  <div class="text-center">
    <span v-html="vraag" class="text-h6"></span>
  </div>

  <div class="iconAnswers q-mt-md" v-if="ratingStijl != 'tekst'">
    <q-list separator>
      <q-item v-for="(subvraag, i) in questions" :key="subvraag">
        <q-item-section>
          <q-item-label>{{ subvraag.vraag }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-rating
            size="sm"
            :icon="icon"
            v-model="antwoorden[i]"
            class="q-py-md"
            color="primary"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>

  <div class="tekstAnswers q-mt-md" v-else>
    <div class="subvraag q-mb-md" v-for="(subvraag, i) in questions" :key="subvraag.vraag">
    <q-select :options="ratingOpties" :label="subvraag.vraag" v-model="antwoorden[i]" outlined>
      <template v-slot:label>
        <span v-html="subvraag.vraag"></span>
      </template>
    </q-select>
    </div>    
  </div>
</template>

<script>
export default {
  props: ["question", "stijl", "qid"],
  emits:['answered-question'],
  mounted(){
    for(var sv =0; sv < this.question.options[0].subvraag.length; sv++){
        this.antwoorden.push('')
      }
  },
  computed: {
    questions(){
      var questions = []
      for(var sv =0; sv < this.question.options[0].subvraag.length; sv++){
        questions.push({vraag:this.question.options[0].subvraag[sv]})
      }
      return questions
    },
    icon() {
      if (this.question.options[0].ratingStijl.value === "sterren") {
        return "star";
      }
      if (this.question.options[0].ratingStijl.value === "emoticons") {
        return [
          "o_sentiment_very_dissatisfied",
          "o_sentiment_dissatisfied",
          "o_sentiment_neutral",
          "o_sentiment_satisfied",
          "o_sentiment_very_satisfied",
        ];
      }
      if (this.question.options[0].ratingStijl.value === "cijfers") {
        return [
          "o_looks_one",
          "o_looks_two",
          "o_looks_3",
          "o_looks_4",
          "o_looks_5",
        ];
      }
      return "star";
    },
  },
  data() {
    return {
      antwoorden:[],
      vraag: this.question.options[0].vraag,
      subVragen: this.question.options[0].subvraag,
      ratingOptions: this.question.options[0].ratingOpties,
      ratingStijl: this.question.options[0].ratingStijl.value,
      ratingOpties:this.question.options[0].ratingOpties
    };
  },
  watch:{
    antwoorden :{
      deep:true,
     
      handler(){
      var a  = []
      for(var i = 0; i < this.antwoorden.length; i++){
        if(this.antwoorden[i].label){
          a.push(this.antwoorden[i].label)
        }
        else{
          a.push(this.antwoorden[i])
        }
        
      }
      this.$emit('answered-question', {id:this.question.id, qId:this.qid, answers:a})
      }
    }
  }
};
</script>

<style scoped></style>
