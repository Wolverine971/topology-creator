<template>
  <div>
    <json-edit />

    <div>
      <root id="root" @rootInit="visNetwork($event)" />
    </div>
    <network />
  </div>
</template>

<script>
import FieldList from "../components/json/fieldList.vue";
import Root from "../components/json/root.vue";
import jsonEdit from "../components/jsonEdit.vue";
import Network from "../components/network.vue";
export default {
  components: {
    jsonEdit,
    Network,
    "field-list": FieldList,
    Root
  },
  methods: {
    visNetwork(event) {
      console.log('vis network')
    }
  }
};
</script>

