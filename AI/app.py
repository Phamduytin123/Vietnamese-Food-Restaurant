from flask import Flask, request, jsonify
from PIL import Image  # Để xử lý ảnh
import tensorflow as tf  # Sử dụng TensorFlow
from io import BytesIO
import numpy as np

app = Flask(__name__)

# Tải mô hình đã huấn luyện
model_path = "model/base_model_trained.h5"
model = tf.keras.models.load_model(model_path)


# Định nghĩa route nhận ảnh
@app.route("/recognize", methods=["POST"])
def recognize_image():
    print("0ke")
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    # Lấy ảnh từ request
    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # List class dish
    classes = [
        "Banh beo",
        "Banh bot loc",
        "Banh can",
        "Banh canh",
        "Banh chung",
        "Banh cuon",
        "Banh duc",
        "Banh gio",
        "Banh khot",
        "Banh mi",
        "Banh pia",
        "Banh tet",
        "Banh trang nuong",
        "Banh xeo",
        "Bun bo Hue",
        "Bun dau mam tom",
        "Bun mam",
        "Bun rieu",
        "Bun thit nuong",
        "Bánh cu đơ",
        "Bánh đậu xanh",
        "Ca kho to",
        "Canh chua",
        "Cao lau",
        "Chao long",
        "Com tam",
        "Cơm cháy",
        "Goi cuon",
        "Hu tieu",
        "Mi quang",
        "Nem chua",
        "Nem nướng",
        "Pho",
        "Xoi xeo",
        "banh_bo",
        "banh_cong",
        "banh_da_lon",
        "banh_tai_heo",
        "banh_tieu",
        "banh_trung_thu",
    ]

    # Chuyển ảnh sang định dạng mà mô hình cần (ví dụ: mảng numpy)
    try:
        image = Image.open(file)
        image_array = preprocess_image(image)  # Hàm xử lý ảnh

        # Thực hiện dự đoán
        prediction = model.predict(image_array)

        # Lấy kết quả dự đoán
        predicted_class = np.argmax(prediction, axis=1)[0]

        # Trả về kết quả dự đoán
        return jsonify({"prediction": classes[int(predicted_class)]})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def preprocess_image(image):
    """
    Hàm xử lý ảnh để chuyển đổi từ PIL Image sang mảng numpy phù hợp với mô hình TensorFlow.
    """
    image = image.resize(
        (224, 224)
    )  # Resize ảnh về kích thước 224x224 (tuỳ theo mô hình yêu cầu)
    image_array = np.array(image)  # Chuyển đổi ảnh sang mảng numpy
    image_array = image_array / 255.0  # Chuẩn hóa giá trị pixel về khoảng [0, 1]
    image_array = np.expand_dims(image_array, axis=0)  # Thêm batch dimension
    return image_array


if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=True)
