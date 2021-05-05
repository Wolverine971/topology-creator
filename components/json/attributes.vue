<template>
  <div class="margin-left">
    Attributes
    <div class="flex-row" v-for="key in fields" :key="key">
      <field
        :fieldkey="key"
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
      this.fields = [...this.fields, this.fields.length + 1];
      this.addEnabled = false;
    },
    remove(event) {
      this.fields = this.fields.filter(e => e !== event);
      this.fieldsArr.splice(event, 1)
      this.resetFields()
    },
    valUpdated(event) {
      this.addEnabled = true;
      this.fieldsArr[event.index] = Object.assign({}, event.value)
      this.resetFields()
    },
    resetFields(){
      this.fieldsArr.forEach(f=>{
        this.setFields = Object.assign({}, this.setFields, f);

      })
      this.$emit("setAttributes", this.setFields);
    }
  }
};
</script>

<style></style>
