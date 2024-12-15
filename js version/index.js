let table_cards_this_round = document.querySelector('.tableCardsThisRound')
let parsed_table_cards_this_round = parseFloat(table_cards_this_round)

let user_cards_this_round = document.querySelector('.userCardsThisRound')
let parsed_user_cards_this_round = parseFloat(user_cards_this_round)

let total_chips = document.querySelector('.chipCountTotal')
let parsed_total_chips = parseFloat(total_chips.innerHTML)

let chip_count_this_round = document.querySelector('.chipCountThisRound')
let parsed_chip_count_this_round = parseFloat(chip_count_this_round)


let pair = 0
let pair_multiplier = 1
let pair_value = 10 * pair_multiplier

let three_of_a_kind = 0
let three_of_a_kind_multiplier = 1
let three_of_a_kind_value = 25 * three_of_a_kind_multiplier

let four_of_a_kind = 0
let four_of_a_kind_multiplier = 1
let four_of_a_kind_value = 50 * four_of_a_kind_multiplier

let five_of_a_kind = 0
let five_of_a_kind_multiplier = 1
let five_of_a_kind_value = 100 * five_of_a_kind_multiplier

let pair_amount_this_round = document.querySelector('.pairAmountThisRound')
let parsed_pair_amount_this_round = parseFloat(pair_amount_this_round)

let three_of_a_kind_this_round = document.querySelector('.threeOfAKindThisRound')
let parsed_three_of_a_kind_this_round = parseFloat(three_of_a_kind_this_round)

let four_of_a_kind_this_round = document.querySelector('.fourOfAKindThisRound')
let parsed_four_of_a_kind_this_round = parseFloat(four_of_a_kind_this_round)

let five_of_a_kind_this_round = document.querySelector('.fiveOfAKindThisRound')
let parsed_five_of_a_kind_this_round = parseFloat(five_of_a_kind_this_round)

let deck = [1,2,3,4,5,6,7,8,9,10]

let user_card_amount = 2
let table_card_amount = 3

// roll function
function roll() { 
    let table_deck_this_round = []
    let user_deck_this_round = []
    counts = []

    // gets random user cards
    for (let i = 0; i < user_card_amount; i++) {
        user_deck_this_round.push(deck[Math.floor(Math.random() * deck.length)]);
    }

    user_cards_this_round.innerHTML = user_deck_this_round.join(', ')


    // gets random table cards
    // the amt is the amount you have
    for (let i = 0; i < table_card_amount; i++) {
        table_deck_this_round.push(deck[Math.floor(Math.random() * deck.length)]);
    }

    table_cards_this_round.innerHTML = table_deck_this_round.join(', ')

    total_cards_on_table = user_deck_this_round.concat(table_deck_this_round)

    total_cards_on_table_set = new Set(total_cards_on_table)


    // for each card in the set, it finds how many duplicates
    // this is used to see if it's a pair, three of a kind, four of a kind, etc..
    total_cards_on_table_set.forEach(card => {  
        let amount_currently = 0;
        
        for (let number of total_cards_on_table) {
            if (number === card) {
                amount_currently += 1;
            }
        }

        counts.push(amount_currently);
    });

    pair_counts = []
    three_of_a_kind_counts = []
    four_of_a_kind_counts = []
    five_of_a_kind_counts = []
    for (i = 0; i < counts.length; i++) {
        if (counts[i] == 2) {
            pair_counts = pair_counts.concat(counts[i])
        }
        else if (counts[i] == 3) {
            three_of_a_kind_counts = three_of_a_kind_counts.concat(counts[i])
        }
        else if (counts[i] == 4) {
            four_of_a_kind_counts = four_of_a_kind_counts.concat(counts[i])
        }
        else if (counts[i] == 5) {
            five_of_a_kind_counts = five_of_a_kind_counts.concat(counts[i])
        }
    }

    pair_amount_this_round.innerHTML = pair_counts.length
    let pair_display = document.getElementById("pairDisplay")

    if (pair_counts.length > 0) {
        pair_display.style.display = "block"
    }
    else if (pair_counts.length == 0) {
        pair_display.style.display = "none"
    }

    three_of_a_kind_this_round.innerHTML = three_of_a_kind_counts.length
    let three_of_a_kind_display = document.getElementById("threeOfAKindDisplay")

    if (three_of_a_kind_counts.length > 0) {
        three_of_a_kind_display.style.display = "block"
    }
    else if (three_of_a_kind_counts.length == 0) {
        three_of_a_kind_display.style.display = "none"
    }

    four_of_a_kind_this_round.innerHTML = four_of_a_kind_counts.length
    let four_of_a_kind_display = document.getElementById("fourOfAKindDisplay")

    if (four_of_a_kind_counts.length > 0) {
        four_of_a_kind_display.style.display = "block"
    }
    else if (four_of_a_kind_counts.length == 0) {
        four_of_a_kind_display.style.display = "none"
    }

    five_of_a_kind_this_round.innerHTML = five_of_a_kind_counts.length
    let five_of_a_kind_display = document.getElementById("fiveOfAKindDisplay")

    if (five_of_a_kind_counts.length > 0) {
        five_of_a_kind_display.style.display = "block"
    }
    else if (five_of_a_kind_counts.length == 0) {
        five_of_a_kind_display.style.display = "none"
    }

    pair_chips_this_round = pair_counts.length * pair_value
    three_of_a_kind_chips_this_round = three_of_a_kind_counts.length * three_of_a_kind_value
    four_of_a_kind_chips_this_round = four_of_a_kind_counts.length * four_of_a_kind_value
    five_of_a_kind_chips_this_round = five_of_a_kind_counts.length * five_of_a_kind_value

    chip_count_this_round.innerHTML = pair_chips_this_round + three_of_a_kind_chips_this_round + four_of_a_kind_chips_this_round + five_of_a_kind_chips_this_round
    parsed_total_chips += pair_chips_this_round + three_of_a_kind_chips_this_round + four_of_a_kind_chips_this_round + five_of_a_kind_chips_this_round
    total_chips.innerHTML = Math.round(parsed_total_chips)

}



