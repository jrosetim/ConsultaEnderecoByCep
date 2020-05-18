import api from './apiConsulta';

class App{
    constructor(){
        this.listEnderecos = [];
        this.ulEl = document.querySelector('ul[id=lista]');
        this.formEl = document.querySelector('form[id=form]');
        this.inputEl = document.querySelector('input[id=cep]');
        
        this.handleMain();
    }

    handleMain(){
        this.formEl.onsubmit = event => this.addEnderecos(event); 
    }

    async addEnderecos(event){
        event.preventDefault();

        let inputEndereco = this.inputEl.value;

        if ( inputEndereco.length === 0 )
            return;

        try{            
            const response = await api.get(`${inputEndereco}/json`);

            console.log(response.data);

            const {logradouro, bairro, localidade, uf} = response.data;
            
            this.listEnderecos.push({
                logradouro,
                bairro,
                localidade,
                uf
            });

            this.render();
        } catch(erro){
            alert('Cep Errado');
            console.log(err);
        }
    }

    render(){
        this.ulEl.innerHTML = "";

        this.listEnderecos.forEach(endereco=>{
            let itemEl = document.createElement('li');
            
            let labelRua = document.createElement('label');
            labelRua.textContent = endereco.logradouro;

            let labelspace = document.createElement('label');
            labelspace.textContent = ' ';

            let labelBairro = document.createElement('label');
            labelBairro.textContent = endereco.bairro;

            let labelCidade = document.createElement('label');
            labelCidade.textContent = endereco.localidade;

            let labelUf = document.createElement('label');
            labelUf.textContent = endereco.uf;

            itemEl.appendChild(labelRua);
            itemEl.appendChild(labelspace);
            itemEl.appendChild(labelBairro);
            itemEl.appendChild(labelspace);
            itemEl.appendChild(labelCidade);
            itemEl.appendChild(labelspace);
            itemEl.appendChild(labelUf);

            this.ulEl.appendChild(itemEl);
        });
    }
}

const MyApp = new App();