<template>
  <div class="vehicles-container">
    <!-- Header -->
    <div class="header">
      <h1>Veículos</h1>
      <div id="createNew">
        <button @click="showFormForCreate">
          Criar Novo
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center text-gray-500">
      Carregando veículos...
    </div>

    <!-- Lista de cards -->
    <div v-else class="vehicles-list">
      <div
        v-for="(vehicle, index) in vehicles"
        :key="index"
        class="vehicle-card"
      >
        <router-link :to="`/vehicle/${vehicle._id}`" class="vehicle-link">
          <h2>{{ vehicle.description }}</h2>
          <p>{{ vehicle.plate }}</p>
        </router-link>
        <button style="color:#000;" @click="showFormForEdit(vehicle)" class="edit-button">
          Editar
        </button>
      </div>
    </div>

    <!-- Modal de formulário -->
    <div v-if="showForm" id="backgroundDark" @click.self="closeForm">
      <div id="cardFormVehicle">
        <h2>{{ isEditing ? 'Editar Veículo' : 'Criar Veículo' }}</h2>
        <form @submit.prevent="handleSubmit">
          <label for="description">Descrição</label>
          <input type="text" v-model="form.description" required />

          <label for="plate">Placa</label>
          <input type="text" v-model="form.plate" required />

          <button type="submit">
            {{ isEditing ? 'Atualizar' : 'Criar' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL, BASE_API_KEY } from '@/config';

export default {
  data() {
    return {
      vehicles: [],
      loading: true,
      showForm: false,
      isEditing: false,
      form: {
        _id: null,
        description: '',
        plate: ''
      },
      apiUrl: BASE_URL,
      apiKey: BASE_API_KEY
    };
  },
  mounted() {
    this.fetchVehicles();
  },
  methods: {
    async fetchVehicles() {
      this.loading = true;
      try {
        const response = await fetch(`${this.apiUrl}/api/vehicles`, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey
          }
        });
        const data = await response.json();
        this.vehicles = data.data;
      } catch (err) {
        console.error('Erro ao buscar veículos:', err);
      } finally {
        this.loading = false;
      }
    },
    showFormForCreate() {
      this.isEditing = false;
      this.form = { _id: null, description: '', plate: '' };
      this.showForm = true;
    },
    showFormForEdit(vehicle) {
      this.isEditing = true;
      this.form = { ...vehicle };
      this.showForm = true;
    },
    async handleSubmit() {
      const method = this.isEditing ? 'PUT' : 'POST';
      const url = this.isEditing
        ? `${this.apiUrl}/api/vehicles/${this.form._id}`
        : `${this.apiUrl}/api/vehicles`;

      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey
          },
          body: JSON.stringify({
            description: this.form.description,
            plate: this.form.plate
          })
        });

        if (!response.ok) throw new Error('Erro ao salvar veículo');

        await this.fetchVehicles();
        this.closeForm();
      } catch (err) {
        console.error(err);
        alert('Falha ao salvar veículo.');
      }
    },
    closeForm() {
      this.showForm = false;
    },
    goToCreate() {
      this.showFormForCreate(); // Substitui a navegação por modal
    }
  }
};
</script>


<style scoped>

.vehicles-container {
  padding: 20px;
  min-height: 90vh;
  background: #f7f9fb;
  position: relative;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.header h1 {
  font-size: 2.2em;
  color: #222;
  font-weight: 700;
  margin: 0;
}

#createNew button {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-main01);
  color: #fff;
  border: none;
  border-radius: 15px;
  padding: 10px 18px;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

#createNew button:hover {
  background: var(--color-main02);
}

.vehicles-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  max-width: 660px;
  margin: 0 auto;
  justify-content: flex-start;
  justify-items: center;
  align-items: center;
}

.vehicle-card {
  background: #fff;
  border-radius: 14px;
  height: 90px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  min-width: 260px;
  max-width: 200px;
  flex: 1 1 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.vehicle-card h2 {
  margin: 0 0 6px 0;
  font-size: 1.25em;
  color: var(--color-main00);
  cursor: pointer;
}

.vehicle-link {
  text-decoration: none;
  color: inherit;
  padding: 10px 0;
  cursor: pointer;
}

.edit-button {
  background: var(--color-main01);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.9em;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;
}

#backgroundDark {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

#cardFormVehicle {
  background: white;
  padding: 24px;
  border-radius: 16px;
  width: 360px;
  max-width: 90vw;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}

#cardFormVehicle h2 {
  color: var(--color-main01);
  font-size: 1.4em;
  margin-bottom: 16px;
}

#cardFormVehicle label {
  font-weight: 500;
  margin-bottom: 4px;
}

#cardFormVehicle input {
  padding: 10px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  margin-bottom: 16px;
  width: 100%;
  font-size: 1em;
}

#cardFormVehicle button[type="submit"] {
  background: var(--color-main01);
  color: white;
  border: none;
  padding: 10px 0;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.05em;
  cursor: pointer;
  transition: background 0.2s;
}

#cardFormVehicle button[type="submit"]:hover {
  background: var(--color-main02);
}
#cardFormVehicle button[type="submit"]:active {
  background: var(--color-main01);
}

</style>
