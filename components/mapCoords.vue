<template>
  <v-dialog v-model="dialog" style="height: 50vh; width:50vw" width="1000">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon small v-bind="attrs" v-on="on">
        <!-- See Map -->
        <v-icon>
          mdi-map-marker-outline
        </v-icon>
      </v-btn>
    </template>

    <v-card class="mx-auto my-12">
      <v-card-title class="text-h5 grey lighten-2">
        {{ name }}
      </v-card-title>
      <div style="display: flex; justify-content: center">
        <iframe
          width="700"
          height="700"
          :src="`http://localhost:3000/coords?coords=${coords}`"
          title="Coords"
        ></iframe>
      </div>

      <v-divider></v-divider>

      <v-card-actions> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "MapCoords",
  props: {
    name: {
      type: String,
      default: "",
      required: false
    },
    coords: {
      type: Array,
      default: () => {
        return [];
      },
      required: false
    }
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>
