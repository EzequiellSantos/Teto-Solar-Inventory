<template>
    <div id="TeamKit">
        <router-link to="/teams" class="back-menu">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAU0lEQVR4nO3UMQqAYAyD0f9gCuLxndOvu5un0EF0ETcLinnQtYFQ2pq9XmYOgEqWR0QPLJJGLz+5llvADKwPjS4Bkrqykzw45Kd15f5Np7IA+74NavK8nSuKfCUAAAAASUVORK5CYII=" alt="left">
            <span class="text"> Voltar para Equipes</span>
        </router-link>

        <h2>{{ team.name }}</h2>

        <button id="editKit" class="edit-kit" @click="showEditMaterials = true" >Editar</button>

        <section v-if="team.materials && team.materials.length > 0">
            <h3 class="description">Materiais do Kit:</h3>
            <ul class="list-materials" >
                <li v-for="(material, index) in team.materials" :key="index">
                    {{ index + 1}} {{ material.description }} - <span class="quantity">{{ material.quantity }}</span>
                </li>
            </ul>
        </section>

        <p v-else>Nenhum material encontrado para esta equipe.</p>

        <div id="editMaterials" v-if="showEditMaterials">
            <h3>Editar Materiais do Kit</h3>
            <p>Equipe: {{ team.name }}</p>

            <section class="card-edit-materials">
                <div v-for="(material, idx) in team.materials" :key="material.code" class="material-item">
                    <span v-if="material.description != ''">{{ material.description }} - {{ material.quantity }}</span>
                    <input class="input-kit-quantity" v-if="material.description != ''" type="number" v-model="material.quantity" placeholder="Quantidade" />
                    <button
                        v-if="material.description != ''"
                        id="removeMaterial"
                        @click="removeMaterial(idx)"
                        type="button"
                    >
                        <img data-v-481c0a66="" width="20" height="20" src="https://img.icons8.com/ios/50/minus.png" alt="minus">
                    </button>
                </div>
            </section>

            <section class="actions">
                <button class="save" @click="savedMateriais(this.$route.params.id)">Salvar</button>
                <button class="cancel" @click="showEditMaterials = false">Cancelar</button>
            </section>
        </div>

    </div>
</template>

<script>

import {BASE_API_KEY, BASE_URL} from '@/config';

export default {
    data() {
        return {
            team: {},
            apiUrl: BASE_URL,
            apiKey: BASE_API_KEY,
            showEditMaterials: false, 
            materials: []
        };
    },
    created() {
        this.fetchKitTeam();
    },
    methods: {
        
        async savedMateriais(id) {

            const jsonData = JSON.stringify({
                teamId: id,
                teamName: this.team.name,
                materials: this.team.materials
            });

            await fetch(`${this.apiUrl}/api/kits`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                },
                body: jsonData
            })

            this.showEditMaterials = false;
        },
        
        async fetchKitTeam() {
            const idTeam = this.$route.params.id;

            // Buscar o nome da equipe pelo ID
            let teamName = '';
            await fetch(`${this.apiUrl}/api/teams/${idTeam}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    console.log("erro ao buscar equipe: ", data.error);
                } else {
                    // O nome da equipe está em data.data.name
                    teamName = data.data.name;
                    this.team.name = teamName;
                }
            })
            .catch(error => {
                console.error('Erro ao buscar equipe:', error);
            });

            if (!teamName) return;

            // Buscar o kit pelo nome da equipe
            await fetch(`${this.apiUrl}/api/kits/search/team?name=${encodeURIComponent(teamName)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    console.log("erro ao buscar kit: ", data.error);
                } else {
                    // Se encontrar, pega os materiais do kit
                    if (data.data && data.data.length > 0) {
                        // Ordena os materiais em ordem alfabética pela descrição
                        this.team.materials = data.data[0].materials.sort((a, b) => {
                            if (!a.description) return 1;
                            if (!b.description) return -1;
                            return a.description.localeCompare(b.description);
                        });

                    } else {
                        this.team.materials = [];
                    }
                }
            })
            .catch(error => {
                console.error('Erro ao buscar kit:', error);
            });
        },
        removeMaterial(idx) {
            this.team.materials.splice(idx, 1);
        }

    }
}
</script>

<style scoped>
.back-menu {
    position: absolute;
    left: 10px;
    display: flex;
    align-items: center;   
    gap: 8px;   
    top: 25px;  
    margin-bottom: 18px;
    padding: 8px 16px;
    background: var(--color-main01);
    color: #fff;
    border-radius: 15PX;
    text-decoration: none;
    font-weight: 500;
    transition: background 0.2s;
}
.back-menu:hover {
    background: #005fcc;
}

.description{
    margin-bottom: 10px;
}

.list-materials{
    list-style: none;
    margin: auto;
    text-align: left;
    font-size: 1.1em;
    line-height: 3em;
    height: 70vh;
    min-height: 350px;
    min-width: 320px;
    border-radius: 10px;
    padding: 15px;
    width: 80%;
    max-width: 660px;
    background-color: rgb(231, 231, 231);
    overflow-y: auto;
}

.quantity{
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #dadada;
}

#editMaterials {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 200;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.22);
    padding: 32px 28px 24px 28px;
    min-width: 320px;
    max-width: 95vw;
    width: 60%;
    min-width: 370px;
    height: 550px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card-edit-materials {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    height: 90%;
    border-radius: 12px;
    padding: 10px;
    margin: 10px 0;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.055);
    background: #f9f9f9;
}


#editMaterials .material-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    margin-bottom: 14px;
    width: 100%;
}

#editMaterials input[type="number"] {
    width: 40px;
    padding: 7px 10px;
    border: 1.5px solid #d0d7de;
    border-radius: 7px;
    font-size: 1em;
    margin-left: auto;
    outline: none;
    transition: border 0.2s;
}

#editMaterials input[type="number"]:focus {
    border: 1.5px solid #0077ff;
    background: #f4faff;
}

.edit-kit, .save, .cancel {
    margin-top: 12px;
    margin-right: 8px;
    background: var(--color-main01);
    color: #fff;
    border: none;
    border-radius: 15px;
    padding: 10px 18px;
    font-size: 1.05em;
    letter-spacing: 1px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
}

#editKit{
    position: absolute;
    right: 5px;
    top: 13px;
}

#removeMaterial{
    background-color: transparent;
    border: none;
    cursor: pointer;
}


#editMaterials .cancel {
    background: #e74c3c;
    margin-right: 0;
}

#editMaterials .save:hover, .edit-kit:hover {
    background: #005fcc;
}

#editMaterials .cancel:hover {
    background: #c0392b;
}

/* Fundo escuro atrás do card */
#editMaterials-backdrop {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(20, 20, 20, 0.65);
    z-index: 150;
}

/* Responsividade */
@media (max-width: 600px) {
    #editMaterials {
        height: 95vh;
        width: 90vw;
        min-width: 300px;
        padding: 18px 4vw 14px 4vw;
    }
}
</style>