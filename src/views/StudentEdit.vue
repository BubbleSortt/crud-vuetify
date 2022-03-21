<template>
  <div :class="$style.root">
    <h1 class="h1 text-center ">
      {{ id ? 'Edit Record' : 'Create Record' }}
    </h1>
    <div :class="$style.form">
      <VForm
              class="mt-7"
              ref="form"
              lazy-validation
      >
        <VTextField
            v-model="form.name"
            :rules="nameRules"
            label="Name"
            required
        />
        <VTextField
            v-model="form.surname"
            :rules="surnameRules"
            label="Surname"
            required
        />
        <VTextField
            v-model="form.age"
            :rules="ageRules"
            label="Age"
            required
        />
        <VBtn
            depressed
            color="primary"
            class="mt-7"
            :disabled="!isValid"
            @click="onSubmit"
        >
          Сохранить
        </VBtn>
        <RouterLink tag="button" class="ml-5" :to="{ name: 'StudentsList' }" >
          <VBtn
            depressed
            color="warning"
            class="mt-7"
          >
            Все студенты
          </VBtn>
        </RouterLink>
      </VForm>
    </div>
   </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  props: {
    id: { type: String }
  },
  data() {
    return {
      form: {
        id: '',
        name: '',
        surname: '',
        age: '',
      },
      nameRules: [v => !!v || 'Обязательное поле'],
      surnameRules: [v => !!v || 'Обязательное поле'],
      ageRules: [v => !!v || 'Обязательное поле'],
    }
  },
  computed: {
    isValid: function() {
      return this.form.name && this.form.surname && this.form.age
    },
    ...mapGetters({
      'itemById': 'itemById',
    }),
    student: function () {
      return this.itemById[this.id]
    }
  },
  watch: {
    student: function () {
      Object.keys(this.student).forEach(key => {
        this.form[key] = this.student[key]
      })
    }
  },
  methods: {
    onSubmit: function() {
      const student = {
        id: this.form.id,
        name: this.form.name,
        surname: this.form.surname,
        age: this.form.age,
      }
      this.id ?
          this.$store.dispatch('updateItem', student) :
          this.$store.dispatch('addItem', student)
    }
  },
  created() {
    this.$store.dispatch('fetchItems');
  }
}
</script>

<style module lang="scss">
.root {
  .form {
    max-width: 390px;
  }
}
</style>
