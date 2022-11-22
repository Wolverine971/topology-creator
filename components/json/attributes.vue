<template>
  <div class="margin-left" v-if="fields">
    {{ label ? label : "Attributes" }}
    <div class="flex-row" v-for="(field, i) in fields" :key="i">
      <field
        :index="i"
        :fieldkey="field.key"
        :fieldValue="field.value"
        @fieldCreated="valUpdated($event)"
        @remove="remove($event)"
      />
    </div>
    <v-btn :disabled="!addEnabled" @click="addField" class="margin-left"
      >Add Field
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Attributes",
  components: {
    Field: () => import("./field.vue")
  },
  props: {
    attributes: {
      type: Object,
      default: () => {
        return {};
      },
      required: false
    },
    label: {
      type: String,
      default: "",
      required: false
    }
  },
  data() {
    return {
      fields: [],
      fieldsArr: [],
      addEnabled: true,
      setFields: {}
    };
  },
  methods: {
    addField() {
      this.fields = [...this.fields, { key: "", value: null }];
      this.addEnabled = false;
    },
    remove(event) {
      this.fields.splice(event, 1);
      this.resetFields();
    },
    valUpdated(event) {
      this.addEnabled = true;
      this.fields[event.index] = Object.assign({}, event.value);
      this.resetFields();
    },
    resetFields() {
      let setFields = {};
      this.fields.forEach(f => {
        setFields = Object.assign({}, setFields, { [f.key]: f.value });
      });
      this.$emit("setAttributes", setFields);
    }
  },
  watch: {
    attributes(val) {
      if (val) {
        this.fields = Object.keys(val).map(k => {
          return { key: k, value: val[k] };
        });
      } else {
        this.fields = [];
      }
      console.log("fields");
    }
  }
};
</script>

<style></style>
