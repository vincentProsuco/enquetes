<script>
import { defineComponent } from 'vue'
import { Radar, Bar, Doughnut } from 'vue3-chart-v2'

export default defineComponent({
  name: 'SportChart',
  props:['ans'],
  extends: Bar,
  data () {
    return {
      state: {
        chartData: {
           labels: ['Ja', 'Nee', 'Misschien', 'Weet ik niet'],
            datasets: [
              {
                label: 'antwoorden',
                data: this.ans,
                backgroundColor:['#4579b7', '#386499', '#2a496e', '#192a3f', '#070c13'],
              }
            ]
        },
        chartOptions: {
          responsive: true,
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.state.chartData, this.state.chartOptions)
  }
})
</script>