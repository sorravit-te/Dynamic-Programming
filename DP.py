import time

def maximize_rent_correct(space_limit, spaces, rents):
    n = len(spaces)
    dp = [[0] * (space_limit + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(space_limit + 1):
            if spaces[i-1] <= w:
                dp[i][w] = max(dp[i-1][w], dp[i-1][w - spaces[i-1]] + rents[i-1])
            else:
                dp[i][w] = dp[i-1][w]

    w = space_limit
    selected_shops = []
    total_space_used = 0

    for i in range(n, 0, -1):
        if dp[i][w] != dp[i-1][w]:
            selected_shops.append(i-1)
            total_space_used += spaces[i-1]
            w -= spaces[i-1]

    space_left = space_limit - total_space_used

    return dp[n][space_limit], total_space_used, space_left, selected_shops

start_time = time.time()

space_limit = 1000
shops = list('ABCDEFGHIJKLMNOPQRST')
spaces = [100, 150, 200, 80, 120, 170, 130, 90, 160, 140,
          110, 190, 180, 150, 170, 100, 120, 130, 90, 140]
rents = [30000, 45000, 50000, 25000, 35000, 48000, 32000, 27000, 44000, 39000,
         31000, 47000, 49000, 43000, 45000, 34000, 36000, 38000, 30000, 41000]

max_rent, total_space, space_left, selected = maximize_rent_correct(space_limit, spaces, rents)

end_time = time.time()
elapsed_time = end_time - start_time

print("ร้านค้าที่ควรเลือก:", [shops[i] for i in selected])
print(f"รายได้ค่าเช่าสูงสุด: {max_rent} บาท")
print(f"พื้นที่รวมที่ใช้: {total_space} ตร.ม.")
print(f"พื้นที่ว่างเหลือ: {space_left} ตร.ม.")
print(f"เวลาในการคำนวณ: {elapsed_time:.6f} วินาที")
