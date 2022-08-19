<template>
  <div>
    カラースケール上限値<br>
    <input type='number' @input="onInput" v-model="s_zyougen" size='5'>
 </div>
</template>
<script>
import * as MvtLayers from '../../js/layers-mvt'
export default {
  name: "Dialog-info-seamless",
  props: ['mapName'],
  data () {
    return {
      btnSize: 'sm',
      groupName:[],
      formationAge:[]
    }
  },
  computed: {
    s_zyougen: {
      get() {
        return this.$store.state.base.zyougen
      },
      set(value) {
        this.$store.commit('base/updateZyougen', value)
      }
    },
  },
  methods: {
    onInput: function() {
      MvtLayers.kouziR04Obj[this.mapName].getSource().changed()
    }
  },
  mounted ()  {

  },
  watch: {

  }
}
</script>

<style scoped>
.olbtn{
  background-color: rgba(0,60,136,0.5);
}
li {
  list-style-type: none;
}
#group-name-div{
  margin: 5px;
  border: 1px solid grey;
  padding: 5px;
}

</style>