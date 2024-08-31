import cv2
import socket
import pickle
import struct
from ultralytics import YOLO
import math
import requests
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()
ENDPOINT = os.environ.get("ENDPOINT")

model = YOLO("yolo-Weights/yolov8n.pt")

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect(("0.0.0.0", 9996))

classNames = [
    "person",
    "bicycle",
    "car",
    "motorbike",
    "aeroplane",
    "bus",
    "train",
    "truck",
    "boat",
    "traffic light",
    "fire hydrant",
    "stop sign",
    "parking meter",
    "bench",
    "bird",
    "cat",
    "dog",
    "horse",
    "sheep",
    "cow",
    "elephant",
    "bear",
    "zebra",
    "giraffe",
    "backpack",
    "umbrella",
    "handbag",
    "tie",
    "suitcase",
    "frisbee",
    "skis",
    "snowboard",
    "sports ball",
    "kite",
    "baseball bat",
    "baseball glove",
    "skateboard",
    "surfboard",
    "tennis racket",
    "bottle",
    "wine glass",
    "cup",
    "fork",
    "knife",
    "spoon",
    "bowl",
    "banana",
    "apple",
    "sandwich",
    "orange",
    "broccoli",
    "carrot",
    "hot dog",
    "pizza",
    "donut",
    "cake",
    "chair",
    "sofa",
    "pottedplant",
    "bed",
    "diningtable",
    "toilet",
    "tvmonitor",
    "laptop",
    "mouse",
    "remote",
    "keyboard",
    "cell phone",
    "microwave",
    "oven",
    "toaster",
    "sink",
    "refrigerator",
    "book",
    "clock",
    "vase",
    "scissors",
    "teddy bear",
    "hair drier",
    "toothbrush",
]

received_data = b""
payload_size = struct.calcsize("L")

counter = 0
while True:
    while len(received_data) < payload_size:
        received_data = client_socket.recv(4096)

    packed_msg_size = received_data[:payload_size]
    received_data = received_data[payload_size:]
    msg_size = struct.unpack("L", packed_msg_size)[0]

    while len(received_data) < msg_size:
        received_data += client_socket.recv(4096)

    frame_data = received_data[:msg_size]
    received_data = received_data[msg_size:]

    received_frame = pickle.loads(frame_data)

    if counter % 20 == 0:
        results = model(received_frame, stream=True)

        for r in results:
            for box in r.boxes:
                x1, y1, x2, y2 = [int(i) for i in box.xyxy[0]]
                cv2.rectangle(received_frame, (x1, y1), (x2, y2), (255, 0, 255), 3)
                confidence = math.ceil((box.conf[0] * 100)) / 100
                print("Confidence: ", confidence)
                print("Class name: ", classNames[int(box.cls[0])])

                org = [x1, y1]
                font = cv2.FONT_HERSHEY_SIMPLEX
                fontScale = 1
                color = (255, 0, 0)
                thickness = 2
                cv2.putText(
                    received_frame,
                    classNames[int(box.cls[0])],
                    org,
                    font,
                    fontScale,
                    color,
                    thickness,
                )
                
                if (classNames[int(box.cls[0])] == "knife"):
                    res = requests.post(ENDPOINT, json={
                        "itemCategory": "weapon",
                        "itemName": "knife",
                        "location": "SMU SCIS 1",
                        "time": str(datetime.now())
                    })
                    print(res.json())

        cv2.imshow("Client Video", received_frame)
    counter = counter % 20 + 1

    if cv2.waitKey(1) == ord("q"):
        break

cv2.destroyAllWindows()
client_socket.close()
