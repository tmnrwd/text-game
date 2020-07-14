class Room {
    constructor(name, description, char) {
        this._name = name;
        this._description = description;
        this._char = char;
        this._exitTexts = {}
        this._linkedRooms = {}
    }

    get description() {
        return this._description;
    }

    get name() {
        return this._name;
    }

    get char() {
        return this._char;
    }

    describeRoom() {
        return "You are in the " + this._name + ". " + this._description
    }

    move(direction) {
        navErrorHide();
        if (direction in this._linkedRooms) {
            return this._linkedRooms[direction];
        }
        else {
            navError();
            setTimeout(navErrorHide, 1000);
            return this;
        }
    }

    getChar() {
        return this._char._id
    }

    exitText(direction, text) {
        this._exitTexts[direction] = text;
    }

    linkRoom(direction, Room) {
        this._linkedRooms[direction] = Room;
        //Adding, to the list of linkedRooms for this room (object), the room specified, using the direction specified as its index.
    }

    thisRoomChar(currentRoom) {
        if (currentRoom in this._charInRoom) {
            console.log(this._name + "contains the character:")
            return this._charInRoom[currentRoom];
        }
    }


}

class Character {
    constructor(id, name, description, room, needmet, need, reward) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._room = room;
        this._need = need;
        this._needmet = needmet;
        this._reward = reward;
        this._linkedChars = {}
    }

    get description() {
        return this._description;
    }

    get name() {
        return this._name;
    }

    describeChar() {
        return this._description
    }

    nameChar() {
        return this._name
    }

    linkRoom(direction, Room) {
        this._linkedRooms[direction] = Room;
        //Adding, to the list of linkedRooms for this room (object), the room specified, using the direction specified as its index.
    }


}

class Threat extends Character {
    constructor(name, description, room, need, needmet, reward, descriptionThreat, descriptionSafe) {
        super(name, description, room, need, needmet, reward)
        this._descriptionThreat = descriptionThreat
        this._descriptionSafe = descriptionSafe
    }
}

class Item {
    constructor(name, description) {
        this._name = name;
        this._description = description;
    }


}
//adding characters
const Dragon = new Character("Dragon", "Baby Dragon",
    "In the corner you can see a baby dragon, swinging hungrily from a coat hanger attached to a mannequin, which is T-posing and wearing a fedora.",
    "Pantry",
    "no",
    "Food",
    "Wyrm's Blessing")
const Cook = new Character("Cook", "Daisy",
    "The cook, a silver automaton named Daisy, is kneading a chunk of dough which looks and smells fresh. Daisy doesn't seem to notice your presence.",
    "Kitchen",
    "Attention",
    "no",
    "Food")
const Amphiptere = new Threat("Amphiptere", "Amphiptere",
    "The shadow in the sky circles overhead. It seems to be watching you.",
    "Amphitheatre",
    "Wyrm's Blessing",
    "no",
    "Lift",
    "The shadow draws closer, and you can see that it is an amphiptere. It lands in front of you and lashes out with its giant beak. The lights go out.",
    "The shadow draws closer, and you can see that it is an amphiptere. It lands in front of you and seems about to lash out with its giant beak. Instead it looks you up and down, as if evaluating you. It picks you up in its beak and places you on its back.")
const Lady = new Threat("Lady", "The Lady",
    "A figure shrouded in mystery, and also a shroud. As you gaze at her from the other side of the garden, her head moves ever so slightly in your direction. You feel as if someone has walked over your grave.",
    "Garden",
    "Compassion",
    "no",
    "Salvation",
    "As you move carelessly towards the Lady, you feel your senses become hazy. You collapse, and the world goes out like a snuffed candle.",
    "As you move compassionately towards the Lady, you feel a great weight pressing down on your body. After a moment it eases, then lifts. Close to, she wears a mischievous smile.")
//adding rooms
const Kitchen = new Room("Big Kitchen", "First constructed just after the sky fell down, the kitchen has an extremely well-reinforced ceiling.", Cook)
const Garden = new Room("Rooftop Garden", "Sadly, the rooftop garden did not survive what happened fifty years ago. The stonework was reduced to rubble, the plants were transformed into a fine grey mist, and even the soil became a light salmon-pink slurry. Today, it serves only to house the Lady\'s expansive collection of dead butterflies reanimated through ingenious clockwork mechanisms. At the far end you can see a woman.", Lady)
const Amphitheatre = new Room("Amphitheatre", "A huge arena gone to seed. Because of its location on the outskirts of the safe zone, its stonework has suffered in the acid rain, and most of its seats and balustrades have simply fallen apart under their own weight. As you stand there staring, a huge, winged shadow passes overhead.", Amphiptere)
const Pantry = new Room("Pantry", "Located deep within the castle walls, the pantry is a small, dark room that smells inexplicably of fresh juniper berries.", Dragon)

//linking rooms by direction
Pantry.linkRoom("north", Kitchen)
Kitchen.linkRoom("north", Amphitheatre)
Kitchen.linkRoom("south", Pantry)
Amphitheatre.linkRoom("north", Garden)
Amphitheatre.linkRoom("south", Kitchen)
Garden.linkRoom("south", Amphitheatre)
//text displayed for moving in each direction from each room
Pantry.exitText("north", "You open the pantry's creaky door and make your rampant way through several thousand miles of stony corridor.")
Kitchen.exitText("north", "From the kitchen window you can see, far, far below you, some sort of stone structure. You take the rickety old lift down, biding your time.")
Kitchen.exitText("south", "Heading back towards the pantry, you barely notice time passing as you travel the requisite thousands of miles of stony corridor.")
Amphitheatre.exitText("north", "The amphiptere takes off in a great cloud of smoke and sound. Its wings beat rhythmically as it soars jerkily through the air, until it deposits you gently on top of a lone tower.")
Amphitheatre.exitText("south", "Turning your back on the desolate, foggy sight of the amphitheatre, you take the rickety old lift back to the kitchen.")
Garden.exitText("south", "Your steed awaits. The amphiptere glides gently towards the ground, and places you gently in the amphitheatre where it makes its home.")

currentChar = Cook;

function pressStart() {
    currentRoom = Pantry;
    currentChar = Dragon;
    displayRoomInfo(currentRoom);
    displayCharInfo(currentChar);
    beginGame();
}

function beginGame() {
    document.getElementById("navigation-errors").style.display = "none";
    document.getElementById("navigation").value = "";
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let command = document.getElementById("navigation").value.toLowerCase();
            const directions = ["north", "south", "east", "west"]
            if (directions.includes(command)) {
                currentRoom = currentRoom.move(command)
                displayRoomInfo(currentRoom);
                updateChar(currentRoom);
                displayCharInfo(currentChar);
            }
        }
    }
    )
}

function displayRoomInfo(currentRoom) {
    textContent = currentRoom.describeRoom();
    document.getElementById("room-description").innerHTML = textContent;
}

function displayCharInfo(currentChar) {
    textContent = currentChar.describeChar();
    document.getElementById("char-description").innerHTML = textContent;
}

function updateChar(room) {
    currentChar = room.getChar();
    console.log("This room's character is:", currentChar)
}

inventory = {}
function pickupItem(name, description) {
    inventory[name] = description;
    displayInventory();
}
function displayInventory() {
    document.getElementById("inventory").textContent = JSON.stringify(inventory);
}

function navError() {
    document.getElementById("navigation-errors").style.display = "block"
}

function navErrorHide() {
    document.getElementById("navigation-errors").style.display = "none"
}

//troubleshooting
//updateChar(currentRoom) updates currentChar to the character in the room. The correct character for Pantry is Dragon
//displayCharInfo displays description of currentChar
//Each of these works independently, but having both of them present gives a TypeError: currentChar.describeChar is not a function

//version of displayCharInfo that outputs to console rather than document (document ref currently crashing nodemon)
function displayCharInfo(currentChar) {
    textContent = currentChar.describeChar();
    console.log(textContent);
}
//copy of updateChar for convenience
function updateChar(room) {
    currentChar = room.getChar();
    console.log("This room's character is:", currentChar)
}

currentRoom = Pantry;
currentChar = Lady;
updateChar(currentRoom) //should change currentChar to Dragon
displayCharInfo(currentChar) //should display currentChar description