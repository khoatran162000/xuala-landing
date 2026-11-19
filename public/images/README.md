# Ảnh sản phẩm

Đặt ảnh thật của từng set vào thư mục này (JPG/WebP, tỉ lệ ngang khoảng 16:9, rộng ≥ 1200px),
rồi khai báo trong `content/site.ts` ở trường `image` của set đó:

```ts
{ id: "luc-an-cat", name: "Lục An Cát", image: "/images/luc-an-cat.jpg", ... }
```

Set nào chưa có ảnh sẽ hiện mặt hộp nan đan và số món — trang vẫn hoàn chỉnh khi chưa có ảnh.
