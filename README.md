# Vilela Labs Home App
Aplicativo para controle dos dispositivos de automação residencial do projeto [Vilela Labs Home Automation](https://hvilela.com/vlhomeapp).


<img src="img\vlhomeapp_img1.JPG" alt="drawing" width="100"/>


# Projeto

Esta é uma aplicação de automação residencial escrito em Javascript no framework React Native que através do acesso a um banco de dados no Firebase (Database) aciona dispositivos de automação residencial IOT com acesso restrito ao database.

# Como funciona?

De forma geral o aplicativo irá enviar requsições REST API (via **axios**) ou via comandos específicos do Firebase: escuta (**on** / **once**) e atualização (**update**). Estes dados são alimentados tanto pelo *update* do próprio aplicativo quanto envios de alteração de status a partir dos próprios dispositivos. Uma vez com os dados atualizados, são feitas as atualizações visuais dos status dos componentes no aplicativo.

Além disso o aplicativo conta com telas de configurações dos **dispositivos** e **ambientes**.

## Dispositivos
Os dispositivos são os equipamentos em si conectados na rede local da residência e no firebase através de biblioteca dedicada. Tando no lado do Firebase como do próprio firmware de dispositivo ele possuirá as propriedades:
- **ipAddress** (IP do dispositivo e usado como ID único);
- **type** (para identificar o tipo de comportamento funcional do dispositivo);
- **value** (estado atual do dispositivo);

No lado do App são adicionadas as propriedades
- **name** (nome para visualização no app);
- **iconName** (define o ícone selecionado em um banco de dados [MaterialCommunityIcons](https://materialdesignicons.com/));
- **order** (define a ordem dos botões de acionamento dos dispositivos apresentada no ambiente selecionado);


sendo as últimas três utilizadas apenas para representação visual dos dispositivos.

## Ambientes
Ambientes são estruturas utilizadas apenas pelo App. Servem para organizar os dispositivos baseados no cômodos da casa ou demais ambientes possíveis. Futuramente poderão ser utilizados também para organizar os dispositivos em grupos (luzes, aparelhos, favoritos, etc). Assim como os dispositivos, podem ter seus nomes e ícones personalizados nos menus de configurações. Suas propriedades são:
- **devices** (objetos com os dispositivos adicionados ao ambiente);
- **iconName** (define o ícone selecionado em um banco de dados [MaterialCommunityIcons](https://materialdesignicons.com/));
- **id** (identificação única para o ambiente);
- **name** (nome para visualização no app);
- **order** (define a ordem para exibição dos ambientes no menu lateral);

## Estruturas JSON
Conforme as propriedades citadas acima, neste projeto temos duas estruturas básicas para representação dos dispositivos. Abaixo um exemplo básico dessas estruturas:

### No Firebase
```JSON
{
    "devices": [
        {
            "ipAddress": "192.168.15.41",
            "type": "light",
            "value": "Apagada"
        },
        {
            "ipAddress": "192.168.15.59",
            "type": "light",
            "value": "Acesa"
        }
    ]
}
```
### No App
```JSON
{
    "ambients": [
        {
            "devices": [
                {
                    "iconName": "lightbulb",
                    "ipAddress": "192.168.15.41",
                    "name": "Lâmpada1",
                    "order": 0,
                    "type": "light",
                    "value": "Apagada"
                }
            ],
            "iconName": "bed",
            "id": 0,
            "name": "Quarto Frente",
            "order": 0
        }
    ]
}

``` 
## Estrutura das telas de Configurações

```
|-- Configurações
|  |-- Dispositivos
|  |   |-- Novo
|  |   |-- Editar
|  |   |-- Excluir
|  `-- Ambientes
|      |-- Novo
|      |-- Editar
|      |-- Excluir
|      |-- Reordenar
```