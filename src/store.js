import { defineStore } from "pinia";

export const useFormStore = defineStore("form", {
  state: () => ({
    userData: null
  }),
  actions: {
    registerUser() {
      console.log("Submitting data from store: ", this.userData);
    }
  }
});
