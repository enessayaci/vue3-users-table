<script setup lang="ts">
import { ref, watch } from 'vue';
import Input from '../components/ui/Input.vue';
import FormProvider from '@/components/FormProvider.vue';

const formFields = ref({
  name: '',
  email: '',
  age: 0
})

</script>

<template>
  <main id="pageHome" class="grid grow p-8">
    <div>
      <FormProvider id="create">
        <Input v-model="formFields.name" label="Metin" tooltip="Text alanı" :min="3" :max="10" required />
        <Input type="email" v-model="formFields.email" label="E-posta" tooltip="Email alanı" required />
        <Input type="number" v-model="formFields.age" label="Yaş" tooltip="Yaş alanı" :min="18" required />
      </FormProvider>

      <button form="create" type="submit">Gönder</button>
    </div>
  </main>
</template>
