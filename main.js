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
    await salvarCliente("Nathan Freire", "94130-3238", "458.113.088-33"),
    await salvarCliente("Lucas Andrade", "98765-4321", "123.456.789-00"),
    await salvarCliente("Mariana Oliveira", "97654-3210", "234.567.890-11"),
    await salvarCliente("Ricardo Mendes", "96543-2109", "345.678.901-22"),
    await salvarCliente("Camila Ferreira", "95432-1098", "456.789.012-33")
    await desconectar()
}

IniciarSistema()