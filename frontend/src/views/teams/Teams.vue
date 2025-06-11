<template>
    <div class="teams-container">

        <section class="header">
            <router-link class="back" to="/"> 
                <img src="" alt="">
                <span>Voltar</span>
            </router-link>

            <h1>Equipes</h1>
            
            <div id="createNew">
                <button @click="showForm = true">
                    <img src="" alt="add-icon">
                    <span>Adicionar Equipe</span>   
                </button>
            </div>
        </section>

        <div class="teams-list">
            <div v-for="team in teams" :key="team._id" class="team-card">
                <router-link :to="`/team/${team._id}`" class="team-link">
                    <h2>{{ team.name }}</h2>
                    <button @click="deleteTeam(team._id)">Deletar</button>
                </router-link>
            </div>
        </div>

        <div id="backgroundDark" v-if="showForm" @click="closeForm"></div>
        <div id="cardFormTeam" v-if="showForm">
            <h2>Adicionar Equipe</h2>
            <form @submit.prevent="addTeam">
                <label for="name">Nome:</label>
                <input type="text" id="name" v-model="newTeam.name" required>
                <!-- <label for="description">Descrição:</label>
                <input type="text" id="description" v-model="newTeam.description">
                <label for="responsible">Responsável:</label>
                <input type="text" id="responsible" v-model="newTeam.responsible"> -->
                <button type="submit">Criar Equipe</button>
                <button type="button" @click="closeForm" style="background:#e74c3c;margin-top:8px;">Cancelar</button>
            </form>
        </div>


        <p style="position:fixed; bottom: 5px;"><small>versão em protótipo</small></p>
    </div>
</template>

<script>
import { BASE_URL, BASE_API_KEY } from '@/config';

export default {
    data() {
        return {
            teams: [],
            apiUrl: BASE_URL,
            apiKey: BASE_API_KEY,
            showForm: false,
            newTeam: {
                name: '',
                description: '',
                responsible: ''
            }
        };
    },
    created() {
        this.fetchTeams();
    },
    methods: {
        closeForm() {
            this.showForm = false;
            this.newTeam = { name: '', description: '', responsible: '' };
        },
        async addTeam() {
            const newTeam = {
                name: this.newTeam.name,
            };

            await fetch(`${this.apiUrl}/api/teams`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                },
                body: JSON.stringify(newTeam),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if(data.error){
                    console.log("erro ao criar equipe: ", data.error);
                } else {
                    this.teams.push(data.data || data); // ajusta para o formato do backend
                    this.closeForm();
                }
            })
            .catch(error => {
                console.error('Erro ao criar equipe:', error);
            });
        },

        async deleteTeam(teamId) {
            if (!confirm('Tem certeza que deseja deletar esta equipe?')) return;

            await fetch(`${this.apiUrl}/api/teams/${teamId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if(data.error){
                    console.log("erro ao deletar equipe: ", data.error);
                } else {
                    this.teams = this.teams.filter(team => team._id !== teamId);
                }
            })
            .catch(error => {
                console.error('Erro ao deletar equipe:', error);
            });
        },

        async fetchTeams() {
            await fetch(`${this.apiUrl}/api/teams`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if(data.error){
                    console.log("erro ao buscar equipes: ", data.error);
                } else {
                    this.teams = data.data || data;
                }
            })
            .catch(error => {
                console.error('Error fetching teams:', error);
            });               
        }
    }
}
</script>

<style scoped>
.teams-container {
    padding: 20px;
    min-height: 100vh;
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
    background: #0077ff;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 18px;
    font-size: 1em;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
}

#createNew button:hover {
    background: #005fcc;
}

.teams-list {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: flex-start;
}

.team-card {
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.07);
    padding: 22px 28px;
    min-width: 260px;
    max-width: 320px;
    flex: 1 1 260px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.team-card h2 {
    margin: 0 0 6px 0;
    font-size: 1.25em;
    color: #0077ff;
}

#backgroundDark {
    display: none;
}

#cardFormTeam {
    display: none;
}

/* Exibe o fundo escuro e o card quando showForm está ativo */
[v-cloak] #backgroundDark,
[v-cloak] #cardFormTeam,
#backgroundDark[style*="display: block"],
#cardFormTeam[style*="display: block"] {
    display: block !important;
}

#backgroundDark {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(20, 20, 20, 0.7);
    z-index: 100;
}

#cardFormTeam {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 101;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    padding: 38px 32px 28px 32px;
    min-width: 320px;
    max-width: 95vw;
    width: 370px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#cardFormTeam h2 {
    margin-bottom: 18px;
    color: #0077ff;
    font-size: 1.3em;
    font-weight: 600;
}

#cardFormTeam form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

#cardFormTeam label {
    font-size: 1em;
    color: #333;
    margin-bottom: 4px;
}

#cardFormTeam input[type="text"] {
    padding: 10px 12px;
    border: 1.5px solid #d0d7de;
    border-radius: 8px;
    font-size: 1em;
    outline: none;
    transition: border 0.2s;
    margin-bottom: 8px;
}

#cardFormTeam input[type="text"]:focus {
    border: 1.5px solid #0077ff;
    background: #f4faff;
}

#cardFormTeam button[type="submit"] {
    background: #0077ff;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 0;
    font-size: 1.08em;
    font-weight: 600;
    cursor: pointer;
    margin-top: 8px;
    transition: background 0.2s;
}

#cardFormTeam button[type="submit"]:hover {
    background: #005fcc;
}

@media (max-width: 600px) {
    #cardFormTeam {
        min-width: 90vw;
        padding: 24px 8vw 18px 8vw;
    }
    .teams-list {
        flex-direction: column;
        gap: 16px;
    }
}
</style>