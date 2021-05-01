<template>
  <div class="margin-left">
    <div class="flex-row" v-for="(field) in fields" :key="field">
      <field :fieldkey="field" @valCreated="addEnabled = true" @remove="remove($event)"/>
    </div>
    <v-btn :disabled="!addEnabled" @click="addField" class="margin-left">Add Field</v-btn>
  </div>
</template>

<script>
export default {
  name: "FieldList",
  props: {
    root: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  components: {
    Field: () => import("./field.vue")
  },
  data() {
    return {
      fields: [],
      addEnabled: true
    };
  },
  methods: {
    addField() {
      this.fields = [...this.fields, this.fields.length + 1];
      this.addEnabled = false
    },
    remove(event){
        this.fields = this.fields.filter((e)=> e !== event)
    }
  }
};
</script>

<style></style>
