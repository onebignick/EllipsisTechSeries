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
import random

load_dotenv()
ENDPOINT = os.environ.get("ENDPOINT")
FPS = int(os.environ.get("FPS"))
PORT = int(os.environ.get("PORT"))

model = YOLO("yolo-Weights/yolov8n.pt")

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect(("0.0.0.0", PORT))

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

suspicious_objects = set(["knife", "backpack", "scissors"])
received_data = b""
payload_size = struct.calcsize("L")

mockLocationData = {
    "SMU School of Business": (1.2952267,103.8503529),
    "SMU School of Law": (1.2948947,103.8492584),
    "SMU School of Computing": (1.2975207,103.8493083),
    "SMU School of Economics": (1.2977693,103.8487971),
    "SMU School of Social Sciences": (1.2948153,103.8483214),
    "SMU Connexion": (1.2952257,103.844762),
}

def getRandomSchool():
    locations = list(mockLocationData.keys())
    numLocations = len(locations)
    return locations[random.randint(0, numLocations - 1)]

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

    if counter % FPS == 0:
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
                
                if (classNames[int(box.cls[0])] in suspicious_objects) and (counter % FPS == 0):
                    category = "suspicious object"
                    if classNames[int(box.cls[0])] == "backpack":
                        category = "Unattended Object"
                    location = getRandomSchool()
                    res = requests.post(ENDPOINT, json={
                        "itemCategory": category,
                        "itemName": classNames[int(box.cls[0])],
                        "location": location,
                        "datetime": str(datetime.now()),
                        "lat": mockLocationData[location][0],
                        "long": mockLocationData[location][1],
                        "officerName": "Qingyu"
                    })
                    print(res.json())

        cv2.imshow("Client Video", received_frame)
    counter = counter % FPS + 1

    if cv2.waitKey(1) == ord("q"):
        break

cv2.destroyAllWindows()
client_socket.close()
