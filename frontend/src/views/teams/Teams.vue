<template>
    <div class="teams-container">

        <section class="header">
            <router-link class="back" to="/"> 
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAU0lEQVR4nO3UMQqAYAyD0f9gCuLxndOvu5un0EF0ETcLinnQtYFQ2pq9XmYOgEqWR0QPLJJGLz+5llvADKwPjS4Bkrqykzw45Kd15f5Np7IA+74NavK8nSuKfCUAAAAASUVORK5CYII=" alt="left">
                <span class="back-text">
                    Voltar
                </span>
            </router-link>

            <h1>Equipes</h1>
            
            <div id="createNew">
                <button class="mostrar-form" @click="showForm = true">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEB0lEQVR4nO1aS2sUQRBu8U3ER2LUox5FUf+E77c3XzdFL2pQrz7O6kkQ/B1KFAUTfGLMasbZ/r4ZOy6B+DiIejMaVFZqU42D7K67m9ndWbGgYZPpqerqrqqu+mqM+U//KFlruwHsIXmZZD+AmORnkpM6PgOI5JnMAbA7DMMlJgs0NjY2D8BhAHcB/CRZrGcA+AHgDoBDzrm5LVdgfHx8fhRFZwC8TyzqG4ABkufkZPL5/GrZ8VwuN1uG/Jb/6amdBzAo7yTef0fytGxOS5QguR1AIbGAYZJHCoXConp5jYyMLCZ5FEAucVKvAWxtqhmRvJ5Q4DnJTWnxt9ZuITmS4H8t9dOx1q7QhYuQL9baE8VicWaqQowxwhPAKQAT/rTDMFyeCvM4jlfJcStjiTprU2FcXeY6AK9040ZlDdNi6JzrTTB8FsfxUtMiCsNwCYBHuoEFsYrphNaSOQF4EgRBl2kxBUHQRfKpN7OGfMY7tpiTXHZNWWlt6+jxViEBoN6Xt3vHboVP1OgzE7ImiW41X3b+npDoZDJCJPu889dkYgDO+nuiGSG2URocHJxFMlBl+qpOlnxHUwWZvNFkjABs001+X/VUJHnzEcJkkIrF4gwfSaMoOlBxomSxehpH0hIu4VPCd1r8rLXHdI23q9UTklZ/ayQBrEQ+d0rzouRUffO97DpJ7lWh99IS2gxFhEjeV/Paaf4kAFdU6DmTcUUAXFS+l8oJ7Ne7Y1cHnMheDUo3yj108lCquA44kTWqSFxO4Cc9ke6sKxLH8VJV5EM5gZOqyJx6GZN8WC/wkBgP65XnnJvrcYIsKfIgbUU+dYppOed6q5nWP+Ps/fpwdweE330Vw2/iQjzf0RciphBA0XKgU1IUkjsqoRalpFEQwKwqYq3t9kmjc25h2UkCKKvgo2kJ1tBcd4itRACO6xpvVZxkrT2o5pUzGS2sSL5QRfb/rdR9qynyZpMxIrlDN/rNX9sQAu2rxi+yBj4AeKmKnKwVdfdY7ymTEaJusIB1NTeFpD+hL00IOGbaTNbaDQC+qqXU18oQeNLvgMCWpk3kpvKqUVXiaqMg9rAyeNoOENtau4DkkK5hqOE+o7YVYt9WkL9Ni8hOoTqPfTtu2g0fbfSMejPL5/PrTQt8gr/NyUVRtDIVxrIb3swUFe+TcGiag++eTjj2UBAEy1IVoj5TCgA6grS6r3pjS7e4dE94x25q7127r/7YS6i9wJiNfMWgfnA8kXYUtcBLrVtcy6XZ59MZHZOaXl8Q3EmruB7BAGTIb2kaaVF0QeeWcAKfdgA42ZYvIESooOICKEsJ0ADw8F0r0/1tUaAcCaAsWKxUbQBuSu8RwEf/UY3+ppSnMkfmVqwn/pPpfPoF5AlF4jJCiDIAAAAASUVORK5CYII=" alt="add--v1">
                    <span>Adicionar Equipe</span>   
                </button>
            </div>
        </section>

        <div class="teams-list">
            <div v-for="team in teams" :key="team._id" class="team-card">
                <router-link :to="`/team/${team._id}`" class="team-card team-links">
                    <h2>{{ team.name }}</h2>
                    <button class="delete-button" @click="deleteTeam(team._id)">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0,0,256,256">
                        <g fill="#fff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M20,2c-1.64497,0 -3,1.35503 -3,3v2h-13c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h13.83203c0.10799,0.01785 0.21818,0.01785 0.32617,0h11.67383c0.10799,0.01785 0.21818,0.01785 0.32617,0h13.8418c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-13v-2c0,-1.64497 -1.35503,-3 -3,-3zM20,4h8c0.56503,0 1,0.43497 1,1v2h-10v-2c0,-0.56503 0.43497,-1 1,-1zM6.98047,10.98633c-0.28253,0.00226 -0.55092,0.12392 -0.73884,0.3349c-0.18792,0.21099 -0.27782,0.49161 -0.24749,0.77252l2.66992,28.36914c0.23665,2.56735 2.39721,4.53711 4.97656,4.53711h20.71875c2.57935,0 4.73992,-1.96976 4.97656,-4.53711v-0.00195l2.66992,-28.36719c0.05178,-0.55013 -0.35222,-1.03807 -0.90234,-1.08984c-0.55013,-0.05178 -1.03807,0.35222 -1.08984,0.90234l-2.66992,28.36914c0,0.0013 0,0.0026 0,0.00391c-0.14426,1.57171 -1.40438,2.7207 -2.98437,2.7207h-20.71875c-1.58,0 -2.84011,-1.149 -2.98437,-2.7207c0,-0.0013 0,-0.0026 0,-0.00391l-2.66992,-28.36914c-0.04205,-0.52303 -0.48116,-0.92463 -1.00586,-0.91992z"></path></g></g>
                        </svg>
                    </button>
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
    min-height: 90vh;
    background: #f7f9fb;
    position: relative;
}

.back{
    display: flex;
    align-items: center;
    text-decoration: none;
    background-color: var(--color-main01);
    color: #fff;
    padding: 8px 16px;
    border-radius: 15px;
    font-size: 1.1em;
    font-weight: 500;
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
    background: #005fcc;
}

.mostrar-form > img{
    width: 30px;
}

.teams-list {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    max-width: 660px;
    margin: 0 auto;
    justify-content: flex-start;
    justify-items: center;
    align-items: center;
}

.team-card {
    background: #fff;
    border-radius: 14px;
    height: 90px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.07);
    min-width: 260px;
    max-width: 200px;
    flex: 1 1 260px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.team-links{
    text-decoration: none;
    color: inherit;
    padding: 10px 0;
}

.delete-button{
    background: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 5px 7px;
    font-size: 0.9em;
    font-weight: 500;
    cursor: pointer;
    margin-top: 8px;
    transition: background 0.2s;
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