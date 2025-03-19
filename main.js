/**
 * Processo principal 
 * estudo do banco de dados mongoDB (CRUD)
 * @author Nathan Freire Furukawa Santos
 */

// importação do módulo de conexão
const {conectar, desconectar} = require('./database.js')

// importação do modelo de dados do cliente 
const clienteModel = require('./src/models/Clientes.js')

// Função para cadastrar um novo cliente 
// ATENÇÂO para trabalhar com banco de dados usar sempre async-await e try-catch
const salvarCliente = async (nomeCli, foneCli, cpfCli) => {
    try {
        // setar a estrutura de dados com os valores 
        // OBS: Usar os mesmos nomes da estrutura
        const novoCliente = new clienteModel({
            nomeCliente: nomeCli,
            foneCliente: foneCli,
            cpf: cpfCli
        })
        // a linha abixo saçva os dados no ibanco de dados
        await novoCliente.save()
        console.log("Cliente adicionado com sucesso")
    } catch (error) {
        //tratamento personalizado dos erros (exceções)
        if(error.code = 11000) {
            console.log(`Erro: O CPF ${cpfCli} já está cadastrado`)
        } else {
            console.log(error)
        }
    }
}

// Função para listar todos os clientes
// .sort ({ nomeCliente: 1 }) Listar em ordem alfábetica (nome)
const listarClientes = async() => {
    try{
        const clientes = await clienteModel.find().sort({
            nomeCliente: 1
        })
        console.log(clientes)
    } catch (error) {
        console.log(error)
    }
}

// Função para buscar um cliente pelo nome
// find ({nomeCliente: new RegExp (nome, i)}) ignorar na busca letras maiusculas ou minusculas (i - case insensitive)
const buscarClienteNome = async (nome) => {
    try{
        const clienteNome = await clienteModel.find({nomeCliente: new RegExp (nome, 'i')})
        console.log(clienteNome)
    } catch (error) {
        console.log(error)
    }
}

// Função para buscar um cliente pelo CPF

const buscarClienteCPF = async (cpf) => {
    try{
        const clienteCPF = await clienteModel.find({cpf: new RegExp(cpf, 'i')})
        console.log(clienteCPF)
    } catch (error) {
        console.log(error)
    }
}

// Função para editar os dado do cliente 
// ATENÇÃO usar o id do cliente 

const atualizarCliente = async(id, nomeCli, foneCli, cpfCli) => {
    try{
        const clienteEditado = await clienteModel.findByIdAndUpdate(id, {nomeCliente: nomeCli, foneCliente: foneCli, cpf: cpfCli},
            { new: true, runValidators: true}
        )
        console.log("Dados do cliente alterados com sucesso")
    } catch (error) {
        //tratamento personalizado dos erros (exceções)
        if(error.code = 11000) {
            console.log(`Erro: O CPF ${cpfCli} já está cadastrado`)
        } else {
            console.log(error)
        }
    } 
}


// Função para excluir os dado do cliente 
const excluirCliente = async(id) => {
    try {
        const clienteDeletado = await clienteModel.findByIdAndDelete(id)
        console.log("Cliente excluído com sucesso.")
    } catch (error) {
        console.log(error)
    }
}


//----------------------------------------------------------

const IniciarSistema = async () => {
    console.clear
    console.log("Estudo do MongoDB")
    console.log("-----------------------------")
    await conectar()
    // CRUD Create (inserção no banco de dados)
    //await salvarCliente("Nathan Freire", "94130-3238", "458.113.088-33"),
    //await salvarCliente("Lucas Andrade", "98765-4321", "123.456.789-00"),
    //await salvarCliente("Mariana Oliveira", "97654-3210", "234.567.890-11"),
    //await salvarCliente("Ricardo Mendes", "96543-2109", "345.678.901-22"),
    //await salvarCliente("Camila Ferreira", "95432-1098", "456.789.012-33")
    
    //CRUD Read (listar todos os clientes)
    //await listarClientes()

    // CRUD Read busca pelo nome de um cliente 
    // await buscarClienteNome("Lucas")

    // CRUD Read busca pelo CPF do cliente
    // await buscarClienteCPF("458.113.088-33") 

    // CRUD Update (id do cliente)
    //await atualizarCliente("67d881c36282c14d6f2a9dbf", "Murillo Mendonca", "86465-4562", "468.456.865-00")

    // CRUD Delete (id do cliente)
    await excluirCliente("67d881c36282c14d6f2a9dc3")
    await desconectar()
}

IniciarSistema()