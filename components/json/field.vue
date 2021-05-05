<template>
  <div :class="type === 'string' ? 'flex-row' : 'flex-row'">
    <key @keyUpdated="keyUpdated($event)" />
    <!-- <span v-if="type" class="colon-large">: </span> -->
    <value :type="type" @valueUpdated="valueUpdated($event)" v-if="type" />
    <v-btn @click="remove" class="margin"><v-icon>mdi-minus</v-icon> </v-btn>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
export default {
  name: "Field",
  components: {
    Value: () => import("./value.vue"),
    Key: () => import("./key.vue")
  },
  props: {
    fieldkey: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      key: "",
      type: "",
      value: ""
    };
  },
  methods: {
    keyUpdated(event) {
      this.key = event[0];
      this.type = event[1];
    },
    valueUpdated(event) {
      this.value = event;
    },
    remove() {
      this.$emit("remove", this.fieldkey);
    }
  },
  watch: {
    type(val) {
      if (val) {
        this.$emit("fieldCreated", {
          index: this.fieldkey,
          value: {
            [this.key]: val === "string" ? "" : val === "object" ? {} : []
          }
        });
      }
    },
    key: debounce(function(val) {
      if (val && this.value) {
        this.$emit("fieldCreated", {
          index: this.fieldkey,
          value: { val: this.value }
        });
      }
    }, 200),
    value: debounce(function(val) {
      if (val && this.key) {
        this.$emit("fieldCreated", {
          index: this.fieldkey,
          value: { [this.key]: val }
        });
      }
    }, 200)
  }
};
</script>

<style></style>
