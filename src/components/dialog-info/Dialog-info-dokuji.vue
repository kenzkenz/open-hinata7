<template>
  <div style="padding: 10px;">
    タイルURL<br>
    <input type='text' @input="onInput" v-model="dokujiUrl" style="width: 300px;"><br><br>
    URLは記録されません。テスト用です。
 </div>
</template>
<script>
import * as MvtLayers from '../../js/layers-mvt'
import * as permalink from '../../js/permalink'
import store from "@/js/store";
export default {
  name: "Dialog-info-dokuji",
  props: ['mapName', 'item'],
  data () {
    return {
      dokujiUrl: '',
      btnSize: 'sm',
      groupName:[],
      formationAge:[]
    }
  },
  computed: {
    s_layerList: {
      get () { return store.getters['base/layerList'](this.mapName) },
      set (value) { store.commit('base/updateList', {value: value, mapName: this.mapName}) }
    },
    // s_zyougen: {
    //   get() {
    //     return this.$store.state.info.kouzi[this.mapName]
    //   },
    //   set(value) {
    //     this.$store.commit('base/updateListPart',{mapName: this.mapName, id:this.item.id, values: [value]});
    //     this.$store.commit('info/updateKouzi',{mapName: this.mapName, value: value})
    //     permalink.moveEnd()
    //   }
    // },
  },
  methods: {
    onInput: function() {

      console.log(this.dokujiUrl)
      const map = store.state.base.maps[this.mapName];
      const result = this.s_layerList.filter((el) => el.id === 'dokuji');
      console.log(result[0].layer.getSource())
      result[0].layer.getSource().setUrl(this.dokujiUrl)
      result[0].layer.getSource().changed()
      map.render();

      // MvtLayers.kouziH19Obj[this.mapName].getSource().changed()
      // MvtLayers.kouziH25Obj[this.mapName].getSource().changed()
      // MvtLayers.kouziH30Obj[this.mapName].getSource().changed()
      // MvtLayers.kouziR04Obj[this.mapName].getSource().changed()
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