import itertools
import time

def maximize_rent_brute_force(space_limit, spaces, rents):
    n = len(spaces)
    max_rent = 0
    best_combination = []

    for combination in itertools.product([0, 1], repeat=n):
        total_space = sum(spaces[i] for i in range(n) if combination[i] == 1)
        total_rent = sum(rents[i] for i in range(n) if combination[i] == 1)

        if total_space <= space_limit and total_rent > max_rent:
            max_rent = total_rent
            best_combination = [i for i in range(n) if combination[i] == 1]

    total_space_used = sum(spaces[i] for i in best_combination)
    space_left = space_limit - total_space_used

    return max_rent, total_space_used, space_left, best_combination

start_time = time.time()

space_limit = 1000
shops = list('ABCDEFGHIJKLMNOPQRST')
spaces = [100, 150, 200, 80, 120, 170, 130, 90, 160, 140,
          110, 190, 180, 150, 170, 100, 120, 130, 90, 140]
rents = [30000, 45000, 50000, 25000, 35000, 48000, 32000, 27000, 44000, 39000,
         31000, 47000, 49000, 43000, 45000, 34000, 36000, 38000, 30000, 41000]

max_rent, total_space_used, space_left, selected_shops = maximize_rent_brute_force(space_limit, spaces, rents)

end_time = time.time()
elapsed_time = end_time - start_time

print("ร้านค้าที่ควรเลือก:", [shops[i] for i in selected_shops])
print(f"รายได้ค่าเช่าสูงสุด: {max_rent} บาท")
print(f"พื้นที่รวมที่ใช้: {total_space_used} ตร.ม.")
print(f"พื้นที่ว่างเหลือ: {space_left} ตร.ม.")
print(f"เวลาในการคำนวณ: {elapsed_time:.6f} วินาที")
