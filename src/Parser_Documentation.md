# 🤖 DANH SÁCH LỆNH HỖ TRỢ (SUPPORTED COMMANDS)

Tài liệu này tổng hợp các mẫu câu lệnh (Syntax) mà hệ thống xử lý ngôn ngữ tự nhiên (NLP) của **PlateWise** có thể hiểu và phân tích.

> **Lưu ý:** Hệ thống không phân biệt chữ hoa/chữ thường (Case-insensitive).

---

## 1. 🍳 Tìm kiếm Món ăn (Recipe Search)

Giúp người dùng tìm công thức nấu ăn dựa trên nguyên liệu có sẵn hoặc nhu cầu cụ thể.

| Mục đích (Intent) | Mẫu câu ví dụ (Example Input) | Loại lệnh (Internal AST Type) |
| :--- | :--- | :--- |
| **Tìm theo nguyên liệu**<br>*(Tìm món nấu được từ đồ có sẵn)* | `find recipes with chicken and rice`<br>`what can i cook with eggs`<br>`recipes using tomato and pasta` | `RECIPE_SEARCH_BY_INGREDIENTS` |
| **Tìm theo tên món**<br>*(Tìm chính xác món)* | `show me pancake recipe`<br>`find carbonara pasta`<br>`search for chicken tikka` | `RECIPE_SEARCH_BY_NAME` |
| **Tìm theo danh mục**<br>*(Tìm ý tưởng ăn uống)* | `find healthy breakfast ideas`<br>`suggest vegetarian dinner`<br>`show me low-calorie snacks` | `RECIPE_SEARCH_BY_CATEGORY` |

---

## 2. 📊 Dinh dưỡng & Sức khỏe (Nutrition & Health)

Biến ứng dụng thành trợ lý dinh dưỡng, trả lời các câu hỏi về chỉ số cơ thể và lượng ăn vào.

| Mục đích (Intent) | Mẫu câu ví dụ (Example Input) | Loại lệnh (Internal AST Type) |
| :--- | :--- | :--- |
| **Tra cứu tổng quan**<br>*(Xem tổng calo/năng lượng)* | `show my calories today`<br>`how much did i eat this week`<br>`display nutrition summary` | `NUTRITION_QUERY` |
| **Tra cứu chi tiết**<br>*(Xem lượng chất cụ thể)* | `how much protein did i eat`<br>`check my sugar intake`<br>`show my carbs consumption` | `NUTRITION_DETAIL` |
| **Kiểm tra cân bằng**<br>*(Đánh giá chế độ ăn)* | `is my diet balanced?`<br>`am i eating healthy?` | `DIET_BALANCE_CHECK` |
| **Kiểm tra chất cụ thể**<br>*(Cảnh báo thiếu/thừa chất)* | `am i eating enough protein?`<br>`do i have enough fiber?` | `NUTRIENT_CHECK` |

---

## 3. 🗓️ Kế hoạch & Nhật ký (Planning & Logging)

Hỗ trợ lên thực đơn và ghi lại nhật ký ăn uống nhanh chóng bằng giọng nói hoặc văn bản.

| Mục đích (Intent) | Mẫu câu ví dụ (Example Input) | Loại lệnh (Internal AST Type) |
| :--- | :--- | :--- |
| **Gợi ý món ăn**<br>*(AI đề xuất)* | `suggest a low-calorie dinner`<br>`recommend high-protein lunch` | `MEAL_SUGGESTION` |
| **Lên kế hoạch**<br>*(Xếp lịch ăn)* | `plan my meals for tomorrow`<br>`create a meal plan for today` | `MEAL_PLAN` |
| **Log nhanh**<br>*(Khi đang xem công thức)* | `add this to lunch`<br>`log this for dinner`<br>`save to breakfast` | `MEAL_LOG` |
| **Log thủ công**<br>*(Nhập nhanh calo)* | `log breakfast: oatmeal 300 cal`<br>`add snack apple 95 calories`<br>`log lunch chicken rice 450 kcal` | `MEAL_LOG_CUSTOM` |

---

## 4. ⚠️ Xử lý lỗi (Error Handling)

Khi người dùng nhập câu lệnh mà hệ thống không hiểu hoặc sai cú pháp.

**Ví dụ:**
* Input: `bla bla bla 123`
* Input: `chicken sugar` (Thiếu động từ lệnh)

**Phản hồi hệ thống:**
* **AST Type:** `PARSE_ERROR`
* **Message:** "Sorry, I didn't understand that command."

---

## 💡 Mẹo sử dụng Parser (Tips)

1.  **Từ khóa linh hoạt:** Bạn có thể dùng `find`, `search`, `show` thay thế cho nhau.
2.  **Khoảng trắng:** Hệ thống tự động bỏ qua khoảng trắng thừa hoặc dấu phẩy (`,`).
    * `chicken, tomato` tương đương `chicken tomato`.
3.  **Kết hợp:**
    * Có thể kết hợp danh mục và bữa ăn: `suggest healthy breakfast`.