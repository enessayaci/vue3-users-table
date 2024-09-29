<script setup lang="ts">
import { computed, ref } from 'vue';
import Table from '@/components/Table.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Button from '@/components/ui/Button.vue';
import Modal from '@/components/Modal.vue';
import FormProvider from '@/components/FormProvider.vue';
import Input from '@/components/ui/Input.vue';

const isUpsertModalOpen = ref<boolean>(false)
const actionButtonText = ref<string>('Create')
const modalTitle = ref<string>('Create User')

// Kullanıcı verileri
const users: User[] = [
  {
    id: "12414324514",
    firstName: "Enes",
    lastName: "Sayacı",
    email: "sayacienes@gmail.com",
    age: 26,
  },
  {
    id: "9895487364",
    firstName: "John",
    lastName: "Deligöz",
    email: "crazyeye@gmail.com",
    age: 33,
  },
];

const formFields = ref({
  firstName: '',
  lastName: '',
  email: '',
  age: 0
})

// Tablo başlıkları
const heads = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Age", key: "age" },
  { label: "Actions", key: "actions" },
];

// Tablo verileri
const tableData = computed<IUserRow[]>(() => {
  return users.map(user => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    age: user.age,
  }));
});

function handleAction (item: IUserRow) {
  console.log("Action for ID:", item); // ID'yi konsola yazdır
};

function handleSubmit() {
  console.log();
  
}
</script>

<template>
  <div id="#pageUsers" class="flex flex-col grow">

    <section class="flex p-8">
      <Breadcrumb />
      <Button class="ms-auto" @click="() => { isUpsertModalOpen = true }">Create</Button>
    </section>

    <main class="grow p-8">
      <Table :heads="heads" :data="tableData">
        <template v-slot:actions="{ item }">
          <Button @click="handleAction(item as IUserRow)">Düzenle</Button> <!-- Dinamik içerik -->
        </template>
      </Table>
    </main>

    <Modal v-model="isUpsertModalOpen" :is-action-button="true" :actionButtonText="actionButtonText"
      actionForm="upsertUser" :title="modalTitle" description="Description">

      <FormProvider id="upsertUser" :onSubmit="handleSubmit" class="grid gap-y-7">

        <Input v-model="formFields.firstName" label="First Name" tooltip="İsim Alanı, örn: Enes, Necmettin, Neco"
          required />

        <Input v-model="formFields.firstName" label="Last Name" tooltip="Soyisim Alanı, örn: Sayacı, Deligöz" required />

        <Input type="email" v-model="formFields.firstName" label="Email" tooltip="Email Alanı, örn: sayacienes@gmail.com" required />
        
        <Input type="number" v-model="formFields.firstName" label="Age" tooltip="Yaş Alanı, örn: 18, 26, 32" :min="18" required />
      
      </FormProvider>
      
    </Modal>
  </div>
</template>
