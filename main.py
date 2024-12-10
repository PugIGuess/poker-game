import random
import os

total_chips = 0
rerolls_remaining = 3
table_card_amount = 3

def terminal_clear():
    os.system('cls' if os.name == 'nt' else 'clear')
    
        
def user_decision_tree():     
    global total_chips
    global rerolls_remaining
    global table_card_amount
    
    
      
    user_decision_tree_input = input('\nWhere to?\n1. Re-Roll\n2. Shop\n3. Quit\n')
    if user_decision_tree_input == "1":
        if rerolls_remaining > 1:
            rerolls_remaining -= 1
            terminal_clear()
            roll()
        elif rerolls_remaining == 1:
            one_reroll_remaining = input("Are you sure? One roll remaining.. (y or n)\n")
            if one_reroll_remaining == 'y':
                rerolls_remaining -= 1
                terminal_clear()
                roll()
            else:
                terminal_clear()
                user_decision_tree()
            
        else:
            terminal_clear()
            print(f"Re-Rolls Remaining: {rerolls_remaining}")
            print(f"Total Chips: {total_chips}")
            user_decision_tree()
            
    elif user_decision_tree_input == "2":
        shop()
    
    elif user_decision_tree_input == "3":
        restart_confirm = input('Are you sure you wanna restart? (y or n)\n')
        if restart_confirm == 'y':
            total_chips = 0
            rerolls_remaining = 3
            table_card_amount = 3
            terminal_clear()
            roll()
        else:
            terminal_clear()
            user_decision_tree()
    
def shop():
    global total_chips
    global rerolls_remaining
    global table_card_amount
    
    terminal_clear()
    additional_reroll_price = 10
    print(f"1. Additional Re-Roll: {additional_reroll_price} Chips")
    additional_table_cards_price = 20
    print(f"2. Additional Table Cards: {additional_table_cards_price} Chips")
    print(f"6. Leave Shop\n")
    print(f"Total Chips: {total_chips}")
    print(f"Table Cards: {table_card_amount}")
    print(f"Re-Rolls Remaining: {rerolls_remaining}")
    
    
    
    shop_input = input("What would you like to buy?\n")
    if shop_input == "1":
        if total_chips >= additional_reroll_price:
            total_chips -= additional_reroll_price
            rerolls_remaining += 1
            shop()
        else:
            shop()
            
    if shop_input == "2":
        if total_chips >= additional_table_cards_price:
            total_chips -= additional_table_cards_price
            table_card_amount += 1
            shop()
        else:
            shop()
            
            
    elif shop_input == "6":
        terminal_clear()
        user_decision_tree()

    

def roll():
    global total_chips
    global rerolls_remaining
    global table_card_amount
    
    user_hand = []
    table_hand = []
    potential_options = [1,2,3,4,5,6,7,8,9,10]

    for _ in range(2):
        user_hand.append(random.choice(potential_options))
        
    if table_card_amount > 0:
        for _ in range(table_card_amount):
            table_hand.append(random.choice(potential_options))
        
    print(f'Table Hand: {table_hand}\n'
        f'You Have: {user_hand}\n')
        
    if len(table_hand) > 0:
        total = user_hand
        total.extend(table_hand)
        # print(total)
    else:
        total = user_hand
        # print(total)
        
    pair = 0
    pair_multiplier = 1
    pair_value = 20 * pair_multiplier

    three_of_a_kind = 0
    three_of_a_kind_multiplier = 1
    three_of_a_kind_value = 50

    four_of_a_kind = 0
    four_of_a_kind_multiplier = 1
    four_of_a_kind_value = 100

    five_of_a_kind = 0
    five_of_a_kind_multiplier = 1
    five_of_a_kind_value = 150

    full_house = 0
    four_of_a_kind = 0
    straight = 0
        
    amount_check = total
    amount_check_list = []
    for card in set(amount_check):
        number = amount_check.count(card)
        amount_check_list.append(number)
        
    pair_check_amount = []
    three_of_a_kind_check_amount = []
    four_of_a_kind_check_amount = []
    five_of_a_kind_check_amount = []
    for number in amount_check_list:
        if number == 2:
            pair_check_amount.append(number)
        elif number == 3:
            three_of_a_kind_check_amount.append(number)
        elif number == 4:
            four_of_a_kind_check_amount.append(number)
        elif number == 5:
            five_of_a_kind_check_amount.append(number)

    num_of_pairs = len(pair_check_amount)
    pair += num_of_pairs

    num_of_three_of_a_kind = len(three_of_a_kind_check_amount)
    three_of_a_kind += num_of_three_of_a_kind

    num_of_four_of_a_kind = len(four_of_a_kind_check_amount)
    four_of_a_kind += num_of_four_of_a_kind

    num_of_five_of_a_kind = len(five_of_a_kind_check_amount)
    five_of_a_kind += num_of_five_of_a_kind

    if pair > 0:
        print(f"Pairs: {pair}")
    if three_of_a_kind > 0:
        print(f"Three of a Kind: {three_of_a_kind}")
    if four_of_a_kind > 0:
        print(f"Four of a Kind: {four_of_a_kind}")
    if five_of_a_kind > 0:
        print(f"Five of a Kind: {five_of_a_kind}")

    pair_chips = pair * pair_value
    three_of_a_kind_chips = three_of_a_kind * three_of_a_kind_value
    four_of_a_kind_chips = four_of_a_kind * four_of_a_kind_value
    five_of_a_kind_chips = five_of_a_kind * five_of_a_kind_value

    total_chips_this_round = pair_chips + three_of_a_kind_chips + four_of_a_kind_chips + five_of_a_kind_chips
    total_chips += total_chips_this_round

    print(f"\nTotal Chips this Round: {total_chips_this_round}")
    print(f"Total Chips: {total_chips}")
    print(f"Re-Rolls Left: {rerolls_remaining}")

    user_decision_tree()
    
roll()