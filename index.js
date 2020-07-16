class Room {
    constructor(name, description) {
        this._name = name;
        this._description = description;
        this._char = {};
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
        return this._char
    }

    exitText(direction, text) {
        this._exitTexts[direction] = text;
    }

    exitTextList() {
        return this._exitTexts;
    }

    exit(direction) {
        if (direction in this._exitTexts) {
            return this._exitTexts[direction];
        }
    }

    linkRoom(direction, Room) {
        this._linkedRooms[direction] = Room;
        //Adding, to the list of linkedRooms for this room (object), the room specified, using the direction specified as its index.
    }

    houseChar(character) {
        this._char = character
    }

    thisRoomChar(currentRoom) {
        if (currentRoom in this._charInRoom) {
            console.log(this._name + "contains the character:")
            return this._charInRoom[currentRoom];
        }
    }


}

class Character {
    constructor(id, name, description, room, needMet, descriptionNeedMet, rewardText) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._room = room;
        this._need = {};
        this._needMet = needMet;
        this._descriptionNeedMet = descriptionNeedMet;
        this._reward = {};
        this._rewardText = rewardText;
        this._linkedChars = {}
    }

    get description() {
        return this._description;
    }

    get name() {
        return this._name;
    }

    set name(value) {  /* example setter */
        this._name = value;
    }

    /**
     * @param {any} value
     */
    set needMet(value) {
        this._needMet = value;
    }

    describeChar() {
        return this._description;
    }

    describeCharNeedMet() {
        return this._descriptionNeedMet;
    }

    charNeed() {
        return this._need;
    }

    needMetChar() {
        return this._needMet;
    }

    rewardText() {
        return this._rewardText;
    }

    reward() {
        return this._reward;
    }

    nameChar() {
        return this._name;
    }

    linkRoom(direction, Room) {
        this._linkedRooms[direction] = Room;
        //Adding, to the list of linkedRooms for this room (object), the room specified, using the direction specified as its index.
    }

    linkItem(Item) {
        this._reward = Item;
        //Adding, to the list of linkedRooms for this room (object), the room specified, using the direction specified as its index.
    }

    linkNeed(item) {
        this._need = item;
    }

    offer(item) {
        if (item = this._need) {
            return true;
        }
        else {
            return false;
        }
    }
}

class Threat extends Character {
    constructor(id, name, description, room, needMet, descriptionNeedMet, rewardText, descriptionThreat, descriptionSafe) {
        super(id, name, description, room, needMet, descriptionNeedMet, rewardText,)
        this._descriptionThreat = descriptionThreat;
        this._descriptionSafe = descriptionSafe;
    }

    descriptionThreat() {
        return this._descriptionThreat;
    }
}

class Item {
    constructor(name, description, collected, used) {
        this._name = name;
        this._description = description;
        this._collected = collected;
        this._used = used;
    }

    get description() {
        return this._description;
    }

    get name() {
        return this._name;
    }

    set name(value) {  /* example setter */
        this._name = value;
    }

    /**
     * @param {any} value
     */
    set collected(value) {
        this._collected = value;
    }

    itemName() {
        return this._name;
    }

    itemDescr() {
        return this._description;
    }

    itemCollected() {
        return this._collected;
    }

}
//adding characters
const Blank = new Character("", "", "", "Secret", "", "", "")
const Dragon = new Character("Dragon", "Baby Dragon",
    "In the corner you can see a baby dragon, swinging hungrily from a coat hanger attached to a mannequin, <br>which is T-posing and wearing a fedora.",
    "Pantry",
    false,
    "In the corner you can see a baby dragon, sleeping happily on a coat hanger attached to a mannequin, <br>which is T-posing and wearing a fedora.",
    "You feed the dragon. It coos happily and falls asleep on its coat hanger.")
const Cook = new Character("Cook", "Daisy",
    "The cook, a silver automaton named Daisy, is kneading a chunk of dough which looks and smells fresh. Daisy doesn't seem to notice your presence.",
    "Kitchen",
    false,
    "The cook, a silver automaton named Daisy, is kneading a slightly diminished chunk of dough which looks and smells fresh. Daisy radiates an aura of validation.",
    "You focus on Daisy for a few long minutes. You see no visible change, but Daisy's silver form begins to fill you with warmth. You find that you have an unexplained piece of dough.")
const Amphiptere = new Threat("Amphiptere", "Amphiptere",
    "The shadow in the sky circles overhead. It seems to be watching you.",
    "Amphitheatre",
    false,
    "The shadow in the sky swoops and dives overhead. It seems to be enjoying itself.",
    "As you raise the Wyrm's Blessing above your head, a pure, crystalline chime fills the air. For a moment the clouds part, and ancient sunlight rushes through to hit the ground. The shadow in the sky becomes less hostile.",
    "As you move through the ruins, the shadow in the sky draws closer, and you can see that it is an amphiptere. It lands in front of you and lashes out with its giant beak. The lights go out, and your breathe your last.",
    "As you move through the ruins, the shadow in the sky draws closer, and you can see that it is an amphiptere. It lands in front of you and seems about to lash out with its giant beak.")
const Lady = new Threat("Lady", "The Lady",
    "You see a woman on the far side of the garden: a figure shrouded in mystery, and also a shroud. As you gaze at her from the other side of the garden, her head moves ever so slightly in your direction. You feel as if someone has walked over your grave.",
    "Garden",
    false,
    "You see a woman on the far side of the garden: a figure shrouded in mystery, and also a shroud. As you look upon her from the other side of the garden, you feel warmth wrap around your shoulders like a shawl.",
    "Compassion shines forth from you. For a few moments the re-animated butterflies around you swirl in lofty, unfamiliar patterns. On the other side of the garden, a hereforeto-unnoticed tension leaves the figure.",
    "As you move carelessly towards the Lady, you feel your senses become hazy. You collapse, and the world goes out like a snuffed candle.")
//adding rooms
const Kitchen = new Room("Crepuscular Kitchen", "First constructed just after the sky fell down, the kitchen has an extremely well-reinforced ceiling.")
const Garden = new Room("Rooftop Garden", "Sadly, the rooftop garden did not survive what happened fifty years ago. The stonework was reduced to rubble, the plants were transformed into a fine grey mist, and even the soil became a light salmon-pink slurry. Today, it serves only to house the Lady\'s expansive collection of dead butterflies reanimated through ingenious clockwork mechanisms.")
const Heaven = new Room("Heaven of the Damned", "A desolate hillside, covered in leafless trees. You can just about see the castle in the distance. Being here means you can attain salvation.")
const Amphitheatre = new Room("Amphitheatre", "A huge arena gone to seed. Because of its location on the outskirts of the safe zone, its stonework has suffered in the acid rain, and most of its seats and balustrades have simply fallen apart under their own weight. As you stand there staring, a huge, winged shadow passes overhead.")
const Pantry = new Room("Pantry", "Located deep within the castle walls, the pantry is a small, dark room that smells inexplicably of fresh juniper berries. <br> A map on the wall indicates that you might head north.")
const Secret = new Room("Secret Room", "Underneath and to south of the pantry, the secret room contains a huge amount of compassion. Why it remains here to this day, unspoilt and unused, is anybody's guess.")
//adding items
const food = new Item("Food", "A scrap of food. It might be suitable for some small creature.", false)
const WyrmsBlessing = new Item("Wyrm's Blessing", "A blessing received from an infant wyrm.", false)
const attention = new Item("Caring attention", "Completely ordinary attention. Sadly, some people never receive any at all.", true)
const lift = new Item("Lift", "A lift through the air.", false)
const compassion = new Item("Compassion", "Not to be confused with compersion.", false)
const salvation = new Item("Salvation", "Proof that you have transcended your limits.", false)

//linking rooms by direction
Secret.linkRoom("north", Pantry)
Pantry.linkRoom("north", Kitchen)
Pantry.linkRoom("south", Secret)
Kitchen.linkRoom("north", Amphitheatre)
Kitchen.linkRoom("south", Pantry)
Amphitheatre.linkRoom("north", Garden)
Amphitheatre.linkRoom("south", Kitchen)
Garden.linkRoom("south", Amphitheatre)
Garden.linkRoom("north", Heaven)
//text displayed for moving in each direction from each room
Secret.exitText("north", "You leave behind the pile of compassion and head back out of the secret passage.")
Pantry.exitText("north", "You open the pantry's creaky door and make your rampant way through several thousand miles of stony corridor.")
Pantry.exitText("south", "You lift a torch from its sconce, remove a specific book from a bookcase, and pull on a particular candlestick. After drumming your fingers while a secret passage grinds into view, you make your way onwards.")
Kitchen.exitText("north", "From the kitchen window you can see, far, far below you, some sort of stone structure. You take the rickety old lift down, biding your time.")
Kitchen.exitText("south", "Heading back towards the pantry, you barely notice time passing as you travel the requisite thousands of miles of stony corridor.")
Amphitheatre.exitText("north", "The amphiptere lands in front of you, picks you up in its beak and places you on its back. The amphiptere takes off in a great cloud of smoke and sound. Its wings beat rhythmically as it soars jerkily through the air, until it deposits you gently on top of a lone tower.")
Amphitheatre.exitText("south", "Turning your back on the desolate, foggy sight of the amphitheatre, you take the rickety old lift back to the kitchen.")
Garden.exitText("south", "Your steed awaits. The amphiptere glides gently towards the ground, and places you gently in the amphitheatre where it makes its home.")
Garden.exitText("north", "As you move compassionately towards the Lady, you feel a great weight pressing down on your body. After a moment it eases, then lifts. Close to, she wears a mischievous smile. She holds out a hand, and a shimmering doorway appears in the air. You pass tremulously through.")
//linking characters to rooms
Secret.houseChar(Blank)
Pantry.houseChar(Dragon)
Kitchen.houseChar(Cook)
Amphitheatre.houseChar(Amphiptere)
Garden.houseChar(Lady)
Heaven.houseChar(Blank)
//giving characters items
Dragon.linkItem(WyrmsBlessing)
Cook.linkItem(food)
Amphiptere.linkItem(lift)
Lady.linkItem(Blank)
//assigning needs to characters
Dragon.linkNeed(food)
Cook.linkNeed(attention)
Amphiptere.linkNeed(WyrmsBlessing)
Lady.linkNeed(compassion)



currentRoom = Pantry;
currentChar = Dragon;
inventory = {}

function pressStart() {
    //currentRoom = Pantry;
    //currentChar = Dragon;
    displayRoomInfo(currentRoom);
    displayCharInfo(currentChar);
    displayItemButtons();
    displayInventory();
    beginGame();
}

function beginGame() {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("exit-room-char-text").style.display = "block";
    document.getElementById("items-nav-buttons").style.display = "block";
    document.getElementById("navigation-errors").style.display = "none";
    document.getElementById("navigation").value = "";
    document.getElementById("navigation").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let command = document.getElementById("navigation").value.toLowerCase();
            const directions = ["north", "south", "east", "west"]
            if (directions.includes(command)) {
                if (currentChar == Amphiptere && currentChar.needMetChar() == false && command == "north") {
                    
                    displayLoseText(currentChar);
                }
                else if (currentChar == Lady && currentChar.needMetChar() == false && command == "north") {
                    displayLoseText(currentChar);
                }
                else {
                    displayExitText(command)
                    currentRoom = currentRoom.move(command)
                    displayRoomInfo(currentRoom);
                    updateChar(currentRoom);
                    displayCharInfo(currentChar);
                    displayItemButtons();
                }
            }
        }
    }
    )

}


function displayRoomInfo(currentRoom) {
    textContent = currentRoom.describeRoom();
    document.getElementById("room-description").innerHTML = textContent;
    document.getElementById("navigation").focus;
}

function displayCharInfo(currentChar) {
    needMet = currentChar.needMetChar();
    if (needMet == true) {
        textContent = currentChar.describeCharNeedMet();
        document.getElementById("char-description").innerHTML = textContent;
    } else {
        textContent = currentChar.describeChar();
        document.getElementById("char-description").innerHTML = textContent;
    }
}

function displayWrongItemText() {
    document.getElementById("wrong-item-text").style.display = "block";
    setTimeout(wrongItemTextHide, 3000);
}

function wrongItemTextHide() {
    document.getElementById("wrong-item-text").style.display = "none";
}

function updateChar(room) {
    currentChar = room.getChar();
    console.log("This room's character is:", currentChar)
}

function pickupItem(item) {
    item.collected = true;
    displayInventory();
    displayItemButtons();
    winGameText(currentRoom);
}
/*
function dropItem(item) {
    dropItemvariable = item;
    delete inventory.dropItemvariable;
}
*/
function setNeedMet(currentChar) {
    currentChar.needMet = true;
}

function feed(currentChar) {
    if (currentChar.charNeed() == food) {
        food.collected = false;
        displayInventory();
        setNeedMet(currentChar);
        currentCharItem = currentChar.reward();
        pickupItem(currentCharItem);
        displayRewardText(currentChar);
        setTimeout(rightItemTextDelete, 7000);
        //hideFoodRewardText();
    } else {
        displayWrongItemText();
    }
}

function attn(currentChar) {
    if (currentChar.charNeed() == attention) {
        attention.collected = false;
        displayInventory();
        setNeedMet(currentChar);
        currentCharItem = currentChar.reward();
        pickupItem(currentCharItem);
        displayRewardText(currentChar);
        setTimeout(rightItemTextDelete, 7000);
        //hideAttentionRewardText();
    } else {
        displayWrongItemText();
    }
}

function blessing(currentChar) {
    if (currentChar.charNeed() == WyrmsBlessing) {
        WyrmsBlessing.collected = false;
        displayInventory();
        setNeedMet(currentChar);
        currentCharItem = currentChar.reward();
        pickupItem(currentCharItem);
        displayRewardText(currentChar);
        setTimeout(rightItemTextDelete, 7000);
    } else {
        displayWrongItemText();
    }
}

function comp(currentChar) {
    if (currentChar.charNeed() == compassion) {
        compassion.collected = false;
        displayInventory();
        setNeedMet(currentChar);
        currentCharItem = currentChar.reward();
        pickupItem(currentCharItem);
        displayRewardText(currentChar);
        setTimeout(rightItemTextDelete, 7000);
    } else {
        displayWrongItemText();
    }
}

function hideFoodRewardText() {
    document.getElementById("food-button").style.display = "none";
}

function displayRewardText(currentChar) {
    textContent = currentChar.rewardText();
    document.getElementById("right-item-text").innerHTML = textContent;
    document.getElementById("right-item-text").style.display = "block";
    setTimeout(displayCharInfo.bind(null, currentChar), 4000);
}

function rightItemTextDelete() {
    textContent = "";
    document.getElementById("right-item-text").innerHTML = textContent;
}

function displayExitText(command) {
    exitTextList = currentRoom.exitTextList();
    if (command in exitTextList) {
        hideRoomCharDesc();
        document.getElementById("exit-text").style.display = "block";
        textContent = exitTextList[command];
        document.getElementById("exit-text").innerHTML = textContent;
        setTimeout(exitTextHide, 5000);
        setTimeout(showRoomCharDesc, 3000);
    }
}

function hideRoomCharDesc() {
    document.getElementById("room-description").style.display = "none";
    document.getElementById("char-description").style.display = "none";
}

function showRoomCharDesc() {
    document.getElementById("room-description").style.display = "block";
    document.getElementById("char-description").style.display = "block";
}

function winGameText(currentRoom) {
    if (currentRoom == Heaven && salvation._collected == true) {
        setTimeout(displaySalvationText,5000);
    }
}

function displaySalvationText() {
    document.getElementById("salvation-text").innerHTML = "You have attained salvation.";
    document.getElementById("salvation-text").style.display = "block";
    setTimeout(displayWinText, 5000);
}

function displayWinText() {
    document.getElementById("items-nav-buttons").style.display = "none";
    //document.getElementById("exit-room-char-text").style.display = "none";
    document.getElementById("win-lose-text").innerHTML = "Congratulations! You win!";
    document.getElementById("win-lose-text").style.display = "block";
}

function displayLoseText(currentChar) {
    textContent = currentChar.descriptionThreat();
    document.getElementById("win-lose-text").innerHTML = textContent;
    document.getElementById("win-lose-text").style.display = "block";
    document.getElementById("items-nav-buttons").style.display = "none";
    setTimeout(displayStartAgain, 5000);
}


function displayStartAgain() {
    document.getElementById("exit-room-char-text").style.display = "none";
    document.getElementById("start-again").style.display = "block";
}

function displayInventory() {
    inventory = {};
    if (food.itemCollected()) {
        inventory[food.itemName()] = food.itemDescr();
    }
    if (attention.itemCollected()) {
        inventory[attention.itemName()] = attention.itemDescr();
    }
    if (WyrmsBlessing.itemCollected()) {
        inventory[WyrmsBlessing.itemName()] = WyrmsBlessing.itemDescr();
    }
    if (compassion.itemCollected()) {
        inventory[compassion.itemName()] = compassion.itemDescr();
    }
    if (salvation.itemCollected()) {
        inventory[salvation.itemName()] = salvation.itemDescr();
    }
    document.getElementById("inventory").textContent = "";
    document.getElementById("inventory").textContent = JSON.stringify(inventory);
}

function displayItemButtons() {
    if (food.itemCollected()) {
        document.getElementById("food-button").style.display = "block";
    } else { document.getElementById("food-button").style.display = "none"; }

    if (attention.itemCollected()) {
        document.getElementById("attention-button").style.display = "block";
    } else { document.getElementById("attention-button").style.display = "none"; }

    if (WyrmsBlessing.itemCollected()) {
        document.getElementById("blessing-button").style.display = "block";
    } else { document.getElementById("blessing-button").style.display = "none"; }

    if (compassion.itemCollected()) {
        document.getElementById("pick-up-compassion-button").style.display = "none";
        document.getElementById("compassion-button").style.display = "block";
    } else { document.getElementById("compassion-button").style.display = "none"; }

    if (currentRoom == Secret && compassion.itemCollected() == false) {
        document.getElementById("pick-up-compassion-button").style.display = "block";
    }

    if (salvation.itemCollected()) {
        document.getElementById("attain-salvation-button").style.display = "none";
        }

    if (currentRoom == Heaven && salvation.itemCollected() == false) {
        document.getElementById("attain-salvation-button").style.display = "block";
    }
}

function navError() {
    document.getElementById("navigation-errors").style.display = "block"
}

function navErrorHide() {
    document.getElementById("navigation-errors").style.display = "none"
}

function exitTextHide() {
    document.getElementById("exit-text").style.display = "none", 7000;
}
