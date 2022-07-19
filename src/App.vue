<template>
  <form @submit="onSubmit">
    <div class="field">
      <Field name="name" placeholder="Name" />
      <ErrorMessage name="name" />
    </div>

    <div class="field">
      <Field name="email" type="email" placeholder="Email" />
      <ErrorMessage name="email" />
    </div>

    <div class="field">
      <Field name="password" type="password" placeholder="Password" />
      <ErrorMessage name="password" />
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { useForm, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import { useFormStore } from "./store";
import { watch } from "vue";

export default {
  name: "App",
  components: {
    Field,
    ErrorMessage,
  },
  setup() {
    const formStore = useFormStore();
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const { handleSubmit, values } = useForm({
      validationSchema: schema,
    });

    // Sync store state with vee-validate state
    // This is a one way binding
    watch(values, (newFormData) => {
      formStore.$patch({ userData: newFormData });
    });

    // create a handler to submit the store state
    // the store action will only run when the user submits valid form data
    const onSubmit = handleSubmit(formStore.registerUser);

    return {
      onSubmit,
    };
  },
};
</script>

<style>
.field + .field {
  margin: 20px 0;
}
</style>
