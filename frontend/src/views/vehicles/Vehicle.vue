<template>
  <div class="vehicles-container">
    <!-- Header -->
    <div class="header">
      <h1>Históricos de: {{ vehicleDescription }}</h1>
      <div id="createNew">
        <button @click="toggleForm">
          Criar Histórico
        </button>
      </div>
    </div>

    <!-- Modal de formulário centralizado -->
    <div v-if="showForm" id="backgroundDark" @click.self="toggleForm">
      <div id="cardForm">
        <h2>Novo Registro de Histórico</h2>
        <form @submit.prevent="submitHistory">
          <label>Motorista</label>
          <input type="text" v-model="form.drive" required />

          <label>Data de Saída</label>
          <input type="datetime-local" v-model="form.exitDate" required />

          <label>Data de Entrada</label>
          <input type="datetime-local" v-model="form.entryDate" required />

          <label>KM Inicial</label>
          <input type="number" v-model="kmInit" required min="0" />

          <label>KM Final</label>
          <input type="number" v-model="kmFin" required min="0" />

          <div class="form-actions">
            <button type="submit">Salvar</button>
            <button type="button" @click="toggleForm" class="cancel-btn">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center text-gray-500 mt-8">
      Carregando históricos...
    </div>

    <!-- Lista de históricos -->
    <div v-else class="vehicles-list mt-24">
      <div
        v-for="(history, index) in histories"
        :key="index"
        class="vehicle-card"
      >
        <h2>{{ history.drive }}</h2>
        <p>Saída: {{ formatDate(history.exitDate) }}</p>
        <p>Entrada: {{ formatDate(history.entryDate) }}</p>
        <p>KM Rodado: {{ history.kmRod }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL, BASE_API_KEY } from '@/config';
import { format } from 'date-fns';

export default {
  data() {
    return {
      histories: [],
      loading: true,
      showForm: false,
      vehicleDescription: '',
      vehicleId: this.$route.params.id,
      kmInit:'',
        kmFin:'',
      form: {
        drive: '',
        exitDate: '',
        entryDate: '',
        kmRod: this.kmFin - this.kmInit,
      },
      apiUrl: BASE_URL,
      apiKey: BASE_API_KEY
    };
  },
  mounted() {
    this.fetchVehicleId();
    this.fetchHistories();
  },
  methods: {
    async fetchVehicleId() {
      try {
        const response = await fetch(`${this.apiUrl}/api/vehicles/${this.vehicleId}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey
          }
        });
        const data = await response.json();
        if (data.data) {
          this.vehicleDescription = data.data.description;
        }
      } catch (error) {
        console.error('Erro ao buscar veículo:', error);
      }
    },

    async fetchHistories() {
      this.loading = true;
      try {
        const response = await fetch(`${this.apiUrl}/api/vehicleHistory/${this.vehicleId}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey
          }
        });
        const data = await response.json();
        this.histories = data.data;
      } catch (error) {
        console.error('Erro ao buscar históricos:', error);
      } finally {
        this.loading = false;
      }
    },

    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) this.resetForm();
    },

    async submitHistory() {

        this.form.kmRod = this.kmFin - this.kmInit;

      const payload = {
        ...this.form,
        vehicleId: this.vehicleId
      };

      try {
        const response = await fetch(`${this.apiUrl}/api/vehicleHistory`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Erro ao criar histórico');

        this.toggleForm();
        await this.fetchHistories();
      } catch (error) {
        console.error('Erro ao criar histórico:', error);
        alert('Erro ao criar histórico. Verifique os dados e tente novamente.');
      }
    },

    formatDate(dateStr) {
      if (!dateStr) return '-';
      return format(new Date(dateStr), 'dd/MM/yyyy HH:mm');
    },

    resetForm() {
      this.form = {
        drive: '',
        exitDate: '',
        entryDate: '',
        kmRod: '',
      };
    }
  }
};
</script>

<style scoped>
:root {
  --color-main01: #0077ff;
  --color-main02: #005fcc;
}

.vehicles-container {
  padding: 20px;
  min-height: 90vh;
  background: #f7f9fb;
  position: relative;
}

.header {
    position: sticky;
    top: 0;
    padding: 15px 0 10px 0 ;
    background-color: #f7f9fb;
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
  background: var(--color-main01);
  opacity: 0.6;
}

/* Lista de cards */
.vehicles-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  max-width: 660px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}

.vehicle-card {
  background: #fff;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  min-width: 260px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}

.vehicle-card h2 {
  font-size: 1.25em;
  margin-bottom: 8px;
  color: var(--color-main01);
}

.vehicle-card p {
  font-size: 0.95em;
  margin: 4px 0;
}

/* Modal central */
#backgroundDark {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(20, 20, 20, 0.7);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

#cardForm {
  background: #fff;
  border-radius: 18px;
  height: 500px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 38px 32px 28px 32px;
  min-width: 320px;
  max-width: 95vw;
  width: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}

#cardForm h2 {
  margin-bottom: 18px;
  color: var(--color-main01);
  font-size: 1.3em;
  font-weight: 600;
}

#cardForm form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

#cardForm label {
  font-size: 1em;
  color: #333;
  margin-bottom: 4px;
}

#cardForm input[type="text"],
#cardForm input[type="datetime-local"],
#cardForm input[type="number"] {
  padding: 10px 12px;
  border: 1.5px solid #d0d7de;
  border-radius: 8px;
  font-size: 1em;
  outline: none;
  transition: border 0.2s;
}

#cardForm input:focus {
  border-color: var(--color-main01);
  background: #f4faff;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.form-actions button {
  flex: 1;
  padding: 10px;
  font-size: 1em;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.form-actions .cancel-btn {
  background-color: #aaa;
  color: #fff;
}

.form-actions .cancel-btn:hover {
  background-color: #888;
}

.form-actions button[type="submit"] {
  background-color: var(--color-main01);
  color: white;
}

.form-actions button[type="submit"]:hover {
  background-color: var(--color-main01);
  box-shadow: #222 0 0 8px rgba(0, 119, 255, 0.3);
}
</style>
