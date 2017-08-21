# Unity 3d UniInventory
[https://github.com/fbxiang/InventoryDemo](https://github.com/fbxiang/InventoryDemo)

## RPG style inventory system
I found inventory system a good start point for any kind of game. The existing inventory systems are lacking extendability. Therefore I designed my own inventory system to be more programmable:
* Item as an abstract base class for easy extension
* Model-View-Controller paradigm for easy control over different inventories
* Tree data structures for data storage and manipulation of the inventory
* provide customizable tool-tip display
* Animation and sound interfaces for user interaction
* Game update loop encapsulated and broadcasted to all items
* Callback style item usage definition
