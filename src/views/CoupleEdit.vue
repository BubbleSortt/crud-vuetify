<template>
  <div :class='$style.root'>
    <h1 class='h1 text-center '>
      {{ id ? 'Редактирование записи' : 'Создание записи' }}
    </h1>
    <div :class='$style.form'>
      <VForm
        class='mt-7'
        ref='form'
        lazy-validation
      >
        <VTextField
          v-model='form.audience'
          :rules='audienceRules'
          label='Аудитория'
          required
        />

        <VTextField
          v-model='form.time'
          :rules='timeRules'
          label='Время'
          type='datetime-local'
          value='2017-06-01T08:30'
          required
        />

        <VTextField
          v-model='form.capacityId'
          :rules='capacityIdRules'
          label='Id нагрузки'
          required
        />

        <VBtn
          depressed
          color='primary'
          class='mt-7'
          :disabled='!isValid'
          @click='onSubmit'
        >
          Сохранить
        </VBtn>

        <RouterLink tag='button' class='ml-5' :to="{ name: 'CouplesList' }">
          <VBtn
            depressed
            color='warning'
            class='mt-7'
          >
            Все группы
          </VBtn>
        </RouterLink>
      </VForm>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    id: { type: String }
  },

  data() {
    return {
      form: {
        id: '',
        audience: '',
        time: '',
        capacityId: '',
      },

      audienceRules: [v => !!v || 'Обязательное поле'],
      timeRules: [v => !!v || 'Обязательное поле'],
      capacityIdRules: [v => !!v || 'Обязательное поле'],
    };
  },

  computed: {
    isValid: function() {
      return (
        this.form.time &&
        this.form.audience &&
        this.form.capacityId
      );
    },

    couple: function() {
      return this.itemById[this.id];
    },

    ...mapGetters({
      'itemById': 'couples/itemById'
    })
  },
  watch: {
    couple: function() {
      Object.keys(this.couple).forEach(key => {
        this.form[key] = this.couple[key];
      });
    }
  },
  methods: {
    onSubmit: function() {
      const couple = {
        id: this.form.id,
        audience: this.form.audience,
        time: this.form.time,
        capacityId: this.form.capacityId,
      };
      this.id ?
        this.$store.dispatch('couples/updateItem', couple) :
        this.$store.dispatch('couples/createItem', couple);

      this.$router.push({ name: 'CouplesList' });
    }
  },

  created() {
    this.$store.dispatch('couples/fetchItems');
  }
};
</script>

<style module lang='scss'>
.root {
  .form {
    max-width: 390px;
  }
}
</style>
