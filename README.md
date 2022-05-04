# Vilela Labs Home App
Application that controls home automation devices of [Vilela Labs Home Automation](https://hvilela.com/vlhomeapp) project.

<p align="center">
<img src="img\vlhomeapp_img1.JPG" alt="drawing" width="100"/>
</p>


# Project

This is a home automation application written in Javascript using React Native framework that, using a Firebase (Database) access, activates IOT devices with restrict acess to database.

# How it works?

In general way the application will send REST API requisition (through  **axios**) or by specific commands of Firebase library: listen (**on** / **once**) and update (**update**).This data is feeding both from *update* command from application itself and changes got from devices.

Besides that we have configuration screens for devices (**dispositivos**) and ambients or rooms(**ambientes**).

The App saves the structure of ambients and devices locally, so each smartphone can have their own device names and visual positions, and they can add or remove the devices they want, have or not, listed.

## Devices (Dispositivos)
The devices are boards connected to local home network and to Firebase through a specific library. Both, Firebase side and device side, will have some properties:

- **ipAddress** (IP address of device and used as unique ID);
- **type** (to identify the functional behavior of device);
- **value** (current state of device);

in the App side will be added three new properties:
- **name** (the name of device you will see in the App);
- **iconName** (defines the selected icon in the database from [MaterialCommunityIcons](https://materialdesignicons.com/));
- **order** (defines the order of the activation buttons of devices showed in the current ambient);

the last three are used only for visual devices representation.
 
 

## (Ambients) Ambientes
Ambients are structures used only by smartphone application. They will organize the devices based on house's rooms or another possible ambients.


- **iconName** (define the selected icon in the database from [MaterialCommunityIcons](https://materialdesignicons.com/));
- **id** (ambient unique identification);
- **name** (the name of ambient you will see in the App);
- **order** (defines the order of the activation buttons of devices showed in the current ambient);


## JSON Structures
As the properties quoted above, in this project we have two basic structures for devices representation:
Below you can see a basic example: 

### In Firebase
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
### In App
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
## Configuration Screen Structure

```
|-- Configurações (Configurations)
|  |-- Dispositivos (Devices)
|  |   |-- Novo (New)
|  |   |-- Editar (Edit)
|  |   |-- Excluir (Delete)
|  `-- Ambientes
|      |-- Novo (New)
|      |-- Editar (Edit)
|      |-- Excluir (Delete)
|      |-- Reordenar (Reorder)

```