<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import apiService from '@/services/aipService';
import { User } from '@/types/requests/User';
import { ProcessType } from '@/types/enums/ProcessType';
import { useLoading } from '@/composables/useLoading';

import Table from '@/components/Table.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Button from '@/components/ui/Button.vue';
import Modal from '@/components/Modal.vue';
import Loading from '@/components/Loading.vue'
import IconPen from '@/components/icons/IconPen.vue'
import FormProvider from '@/components/FormProvider.vue';
import DataNotFound from '@/components/DataNotFound.vue';
import Input from '@/components/ui/Input.vue';
import ThemeToggler from '@/components/ThemeToggler.vue';
import IconWarn from '@/components/icons/IconWarn.vue';

const props = defineProps<{
  process?: ProcessType
}>();

const userStore = useUserStore(); // Store'u kullan
const route = useRoute()
const router = useRouter()
const {showLoader, hideLoader} = useLoading()
const isUpsertModalOpen = ref<boolean>(props.process ? true : false)
const isDeleteModalOpen = ref<boolean>(false)
const actionButtonText = ref<string>(props.process == ProcessType.Update ? 'Save' : 'Create')
const modalTitle = ref(props.process == ProcessType.Update ? 'Edit User' : 'Create User')
// Kullanıcı verileri
const users = computed<User[]>(() => userStore.userList)
const request = ref(new User())
// Tablo başlıkları
const heads = [
  { label: "Name", key: "name" , sort:true },
  { label: "Email", key: "email", sort: true },
  { label: "Age", key: "age", sort: true },
  { label: "Actions", key: "actions" },
];
// Tablo verileri
const tableData = computed(() => {
  return users.value.map((user: User) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    age: user.age,
  }));
});
const getUserFailed = ref(false)

onMounted(() => {
  if (props.process == ProcessType.Update && route.params.id) {
    getUserById(route.params.id.toString())
  }
  getUsers()
})

// props.process değiştiğinde modalın durumunu güncelle
watch(() => props.process, (newProcess) => {
  isUpsertModalOpen.value = !!newProcess; // process varsa modalı aç, yoksa kapat
  actionButtonText.value = newProcess == ProcessType.Update ? 'Save' : 'Create'
  modalTitle.value = newProcess == ProcessType.Update ? 'Edit User' : 'Create User'
});

async function getUsers() {
  showLoader(); // Yükleme göstergesi açılır
  try {
    const users: User[] = await apiService.getUsers()
    userStore.setUsers(users)
  } catch (err) {
    
    
  } finally {
    hideLoader()
  }
}

async function getUserById(id: string) {
  try {
    showLoader()
    const user: User = await apiService.getUserById(id)
    Object.assign(request.value, user)
  } catch (err) {
    console.log("Error, ", err);
    getUserFailed.value = true
  } finally {
    hideLoader()
  }
}

async function addUser(data: User) {
  try {
    showLoader()
    const user: User = await apiService.addUser(data)
    userStore.addUser(user)
    router.push({ name: 'users' })
  } catch (err) {
    console.log("Error, ", err);
  } finally {
    hideLoader()
  }
}

async function updateUser(data: User) {
  try {
    showLoader()
    const user: User = await apiService.updateUser(data)
    userStore.updateUser(user)
    router.push({name: 'users'})
  } catch (err) {
    console.log("Error, ", err);
  } finally {
    hideLoader()
  }
}

async function deleteUser(id: string) {
  try {
    showLoader()
    const user: User = await apiService.deleteUser(id)
    userStore.deleteUser(user.id)

  } catch (err) {
    
  } finally {
    hideLoader()
    isDeleteModalOpen.value = false
  }
}

function handleDeleteClick(item: User) {
  Object.assign(request.value, item)
  isDeleteModalOpen.value = true
};

function handleDeleteConfirm() {
  deleteUser(request.value.id)
}


function handleCreateClick() {
  request.value = new User()
  router.push({ name: 'usersCreate' })
};

function handleEditClick(item: User) {
  Object.assign(request.value, item)
  router.push({ name: 'usersUpdate', params: {id: item.id} })
};

function handleFormSubmit(isValid: boolean) {
  if (isValid) {
    if (props.process == ProcessType.Update) {
      updateUser(request.value)
    } else if (props.process == ProcessType.Create) {
      addUser(request.value)
    }
  }
}

function handleModalClose() {
  router.push({ name: 'users' })
  if (getUserFailed.value) {
    getUserFailed.value = false
  }
}

</script>

<template>
  <div id="#pageUsers" class="flex flex-col grow overflow-hidden">
    <Loading />
    <section class="flex p-8">
      <Breadcrumb />
      <div class="flex gap-x-2 ms-auto items-center">
        <ThemeToggler />
        <Button @click="handleCreateClick">Create</Button>
      </div>
    </section>

    <main class="grow p-8">
      <Table :heads="heads" :data="tableData" initial-sort-field="name">
        <template v-slot:email="{ item }">
          <div class="flex items-center">
            <span class="bg-rose-500 rounded-md w-2.5 h-1.5 flex me-2.5"></span>
            {{ item.email }}
          </div>
        </template>
        <template v-slot:actions="{ item }">
          <div class="flex gap-x-1 justify-end">
            <Button variant="outline" color="slate-300" @click="handleEditClick(item as User)">Edit</Button>
            <Button variant="outline" color="slate-300" @click="handleDeleteClick(item as User)">Delete</Button>
          </div>
        </template>
      </Table>
    </main>

    <Modal v-model="isUpsertModalOpen" :isActionButton="!getUserFailed" :actionButtonText="actionButtonText"
      actionForm="upsertUser" :title="modalTitle" description="Description" @on-close="handleModalClose">
      <template #icon>
        <IconPen />
      </template>
      <FormProvider v-if="!getUserFailed" id="upsertUser" @onSubmit="handleFormSubmit" class="grid gap-y-7">

        <Input v-model="request.firstName" label="First Name" tooltip="İsim Alanı, örn: Enes" required />

        <Input v-model="request.lastName" label="Last Name" tooltip="Soyisim Alanı, örn: Sayacı" required />

        <Input type="email" v-model="request.email" label="Email" tooltip="Email Alanı, örn: sayacienes@gmail.com"
          required />

        <Input type="number" v-model="request.age" label="Age" tooltip="Yaş Alanı, örn: 18, 26, 32" :min="18" />

      </FormProvider>

      <div v-else class="flex flex-col">
        <DataNotFound />
      </div>

    </Modal>

    <Modal v-model="isDeleteModalOpen" @onAction="handleDeleteConfirm" isActionButton actionButtonText="Confirm"
      title="Warning!" description="Description" @on-close="handleModalClose">
      <template #icon>
        <span class=" w-6">
          <IconWarn />
        </span>
      </template>
      <div>
        <h2 class="mb-4">Are you sure you want to delete the user?</h2>
        <span class="italic">{{ request.firstName }} {{ request.lastName }}</span>
      </div>
    </Modal>
  </div>
</template>
