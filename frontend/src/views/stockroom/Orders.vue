<template>
    
    <div id="orders">

        <Message :msg="msg" :msgClass="msgClass" />

        <section id="headerOrder">
            <h1>Pedidos</h1>

            <p>{{this.allPrices}} R$</p>

            <section class="date-choice">
                <input type="date" name="dataChoice" id="dataChoice" v-model="dataChoice" @change="getOrders(this.dataChoice)">
            </section>

            <router-link id="home" to="/">
            
                <img src="/img/logo_icon_transparent_short_2.fa07d0c2.png" alt="Logo Teto Solar ">

            </router-link>

            <router-link id="new" to="/registerOrder">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADzUlEQVR4nO2aSU9UQRDH24MORI2R+AVcghrBNWLwosGFRIgcNNEPIOIXMC7fQJDgQfHgTaMhqDc3YvTAEgIuZxdcIjcRDi6J6/xMOX0YKz0686Z7eE/fL5mEDO/9q7rmvequ7jImJSUlJSUlKMBKoAM4D9wDJoAZ4Kv9zNjv5H+99tpak2SAtUA3MEl03gCnRcskAWAO0AKM4J9hYI/YMHEE2ASMEZ5RYKOJC0AVcAb4/gen3wM3gWNAq80Ji4G59rPYftdqr7kFfPiDntjqATKzPfgVwOMCTmaBG8C+KI7awO63gRMtF4+A5WFG9xeARmC6wMD7gDrjCaAe6C8QhHfAFl+2igLYDXx0OPME2G4CATQBTx12xZddoez+BtBQYPAXgQUmMEA1cMFh/xOwtRLv/LTjkT8a1LDbl+OO3DAFLAtlsMqR8MSBQ0EMFudTuyMID4LMDuSmOk3Ff3mHXzJtak6HWOR8V0aumJhg808+4usGn8vbMUe2n29igiRf4JnycdiXeIvjEWsyMQPY5sgHzT6ER5Ron4kpwFXl62C5gnVKMOtrhacfKU+aa4AfSrq+HMFuJXbDh6OhAmB1pZDKp7McsUkltj8BATigpF9HFVrpKGkzCQhAtWOpviKK0BElctOXkyEDYLXvKPnDUUR6lcixBAXghJI/G0XkvhJpSVAA9ir5u1FEXimR2gQFYJWSfxFFZFqJ1JR4v1dKtL1E3T4VJQBflMi8BAUgo27/nAagVEhfAV7+Q0lwwsc02JqgALT5mAZ7//eFUIcSuZWgAAwo+fYoIrVKRM7qqhJSDMkZQXnFkGDP5//PcliwzQlJ2xC5raRP+d4Sq49rAIB1jo3R8vwl15mRT7+JKcB1r5uigm1LScK2+E6Hn7t9HYyMKuGnlTgJLhZgIfBc+Tjk08BGx9FYbM4HgEvKN/F1vW8jPY5H7LhXI9H8OunwqyuEoQzwUBnKRtpw9OdThyPrj5e6d1E00pBke3J0ELzWCSX88nrwb4GloQ1vLtDCdg1YVKGEd9lhX5a/jaHt/0Iakgr0CckR9Q4T1q7O9tgfZGcou06kNc325Li46rO/167w9CIn/7Fv8GWrJKQhyfbkuMjag0opTqojVnUH7dq+UKPkePB3vsjZQYqmbxTmoz2uOmEPLVbLNrtka/upsd+12WsGHCVtPmKrK1i2j4IsPBx1QwiG5JUwcQVoliIkwMAHvaztKwW5UrpTNiTKGLTce8pn3/GsQK7DVJoaz8kOrZ3Kpu3p0xf79zP7P7nmUORtrJSUlJSUFFMsPwEt7n/iXbzm4AAAAABJRU5ErkJggg==" alt="add--v1">
                <br><span>Novo Pedido</span>
            </router-link>
        </section>

        <main id="mainOrder">

            <div id="eachOrder" class="card-order" v-for="(order, index) in orders" :key="index">

                <div class="div-header-orders">
                    
                    <span class="code-orders">Código:</span>
                    <span class="description-orders">Descrição:</span>
                    <span class="quant-orders">Quantidade:</span>
                    <span class="input-check">Chegada:</span>

                </div>

                <div v-for="(material, indexTwo) in order.materials" :key="indexTwo">

                    <section :class="`section-orders ${ material.isArrivedSeparate === true ? 'arrived' : ' ' }`" :id="`section${material._id}`">

                        <div class="div-materials">
                            <span class="code-orders">{{material.code}} </span>
                            <span class="description-orders">{{ material.description }} </span>
                            <span class="quant-orders">{{material.quantOrder}} </span>
                            <input type="checkbox" class="input-check" :name="material.code" :id="material.code" v-model="material.isArrivedSeparate" @click="uniqueOrdedSelected(order._id, material._id, material.isArrivedSeparate == true ? false : true)"> 
                        </div>
                    
                    </section>

                </div>

                <span class="span-date">{{order.date}}</span>
                <span>Fornecedor: {{order.supplier}}</span>
                <span>Valor: {{order.price}}</span>
                <router-link :to="`editOrder/${order._id}`">Editar</router-link>

            </div>

        </main>

        <Footer/>

    </div>

</template>

<script>

    import {BASE_URL} from '@/config'
    import OrderForm from '@/components/stockroom/OrderForm.vue'
    import  Footer from '@/components/stockroom/Footer.vue'
    import Message from '@/components/Message.vue'

    export default {
        components:{
            Footer,
            OrderForm,
            Message
        },
        data() {

            var data = new Date();
            var dia = data.getDate();
            var mes = data.getMonth() + 1;
            var ano = data.getFullYear();

            return {
                
                apiURL: BASE_URL,
                orders: {},
                allPrices: 0,
                dataChoice: `${ano}-${String(mes).padStart(2, '0')}-${dia}`,
                diasUteis: [],
                arrived: false,
                msg: null,
                msgClass: null,
                materialFind: {
                    id: null,
                    quantity: null,
                    minQuantity: null,
                    stateQuantity: null,
                }
            }

        },
        created() {

            this.getOrders(this.dataChoice)
            console.log(this.dataChoice)
            this.scrollBottom()

        },
        methods: {

            // função para coletar dados e atualizar de acordo com o select clicado
            async uniqueOrdedSelected(idOrder, idMaterial, isArrivedSeparate){

                //coleta do elemento html
                const sectionElementCode = document.getElementById(`section${idMaterial}`)

                //atualização dos styles
                if(isArrivedSeparate){

                    sectionElementCode.classList.add('arrived')

                } else {

                    sectionElementCode.classList.remove('arrived')

                }

                const data = {
                    id: idOrder,
                    idMaterial: idMaterial,
                    isArrived: isArrivedSeparate
                }

                const jsonData = JSON.stringify(data)

                //coletando informações do produto selecionado
                await fetch(`${this.apiURL}/api/materials/${idMaterial}`,{
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        console.error(data.error, " erro ao coletar quantidade ")

                    } else {

                        //coleta os campos do material selecionado
                        this.materialFind.id = data.material._id
                        this.materialFind.minQuantity = data.material.minQuantity
                        this.materialFind.quantity = data.material.quantity
                        this.materialFind.stateQuantity = " "

                    }

                })

                //verificar se o material foi selecionado como chegado
                if(sectionElementCode.classList.contains('arrived')){

                    const jsonDataMaterial = JSON.stringify(this.materialFind)
                    this.updateMaterialForInventory(jsonDataMaterial)

                } else {

                    //caso o usuário ative e desative a caixa de select, o material é atualizado como pedido novamente
                    this.materialFind.stateQuantity = "Pedido"
                    const jsonDataMaterial = JSON.stringify(this.materialFind)
                    this.updateMaterialForInventory(jsonDataMaterial) 

                }

                //atualiza como uniqueOrderArrived de acordo com o que o usuario definiu (true or false)
                await fetch(`${this.apiURL}/api/orders/updateUniqueOrder`, {
                    method: "PUT",
                    headers: {
                        "Content-type":"application/json"
                    },
                    body: jsonData
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        this.msg = data.error
                        this.msgClass = 'error'

                    }

                    setTimeout(() => {
                        
                        this.msg = null

                    }, 1500);

                })

            },

            colletingWeek(data){
                
                this.diasUteis = [];
                
                // Converte a string de data para um objeto Date
                const dataInicio = new Date(data);
                
                // Ajuste para a segunda-feira da semana da data fornecida
                const diaDaSemana = dataInicio.getDay();
                const diasParaSubtrair = (diaDaSemana === 0 ? 6 : diaDaSemana - 1);
                const dataSegundaFeira = new Date(dataInicio);
                dataSegundaFeira.setDate(dataInicio.getDate() - diasParaSubtrair);
                
                // Preenche o array com os dias úteis (segunda a sexta-feira)
                for (let i = -1; i < 4; i++) {
                    const dia = new Date(dataSegundaFeira);
                    dia.setDate(dataSegundaFeira.getDate() + i);
                    this.diasUteis.push(dia.toISOString().split('T')[0]);  // Formato 'YYYY-MM-DD'
                }
                
            },

            //atualizando o material que chegou no estoque de acordo com o state quantity
            /* 

                pode-se adicionar uma feature para atualizar automaticamente a quantidade
                ja pedida no estoque evitando assim o trabalho de inserir manualmente na seção
                de entrada.
            
            */

            async updateMaterialForInventory(json){

                await fetch(`${this.apiURL}/api/materials/`, {
                    method:"PUT",
                    headers: {
                        "Content-type":"application/json"
                    },
                    body: json
                })
                .then((resp) => resp.json())
                .then((data) => {
                    
                    if(data.error){
                        
                        console.error(data.error)

                    } else {

                        console.log(data.msg)

                    }

                })
            },

            //coletando todas os pedidos
            async getOrders(data){

                console.log(data, " teste")

                this.diasUteis = [];

                this.colletingWeek(`${data}`);

                await fetch(`${this.apiURL}/api/orders/week?seg=${this.diasUteis[0]}&sex=${this.diasUteis[4]}`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        console.log(data.error)

                    } else {

                        this.orders = data.data
                        this.scrollBottom()

                        for (let i = 0; i < this.orders.length; i++) {

                            if(this.orders[i].price == null){

                                this.orders[i].price = 0

                            }

                            this.allPrices += this.orders[i].price;
                            console.log(this.allPrices);
                            
                            
                        }

                    }

                })
                .catch((err) => {

                    console.log(err)

                })

            },

            //rolagem para baixo --- precisa ser melhorada
            scrollBottom(){

                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth'
                })

            }
        } 
    }

</script>

<style>

    #headerOrder{
        position: fixed;
        width: 100%;
        top: 0;
        padding: 10px 0;
        background-color: var(--color-main00);
        color: #fff;
        height: 60px;
        z-index: 2;
    }

    #headerOrder > h1{
        margin-top: 5px;
        font-size: 2.1em;
    }

    #headerOrder > a#home{
        position: absolute;
        top: 0px;
        left: 0px;
    }

    #headerOrder > a#home > img{
        width: 80px;
    }

    #headerOrder >  a#new{
        color: #fff;
        text-decoration: none;
        position: absolute;
        right: 10px;
        top: 3px;
        display: block;

    }

    #headerOrder > a#new > img{
        width: 50px;
    }

    #mainOrder{
        padding: 100px 0 70px 0;
    }

    .card-order{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto;
        width: 60%;
        padding: 20px;
        border-radius: 20px;
        margin-block: 20px;
        background-color: #f2f2f2;
    }

    .div-header-orders{
        color: #000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 60vw;
    }

    .div-materials{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-block: 4px;
    }

    .code-orders{
        flex-grow: 0;
        margin-left: auto;
    }

    .description-orders{
        width: 500px;
    }

    .quant-orders{
        width: 150px;
    }

    input[type=checkbox]{
        margin: 0;
        height: 30px;
        border-radius: 10px;
        background-color: aquamarine;
    }

    .input-check{
        width: 50px;
        margin-right: auto;
    }

    .section-orders{
        color: red;
        text-decoration-line: none;
    }

    .arrived{
        color: green;
        text-decoration-line: line-through;
    }

    .span-date{
        position: relative;
        margin-left: auto;
        margin-top: 15px;
        margin-right: 10px;
        background-color: var(--color-main01);
        padding: 4px;
        color: #fff;
        border-radius: 7px;
    }

</style>
