import cv2 as cv
import socket
import pickle
import struct
import os
from dotenv import load_dotenv

load_dotenv()
PORT = int(os.environ.get("PORT"))

cap = cv.VideoCapture(0)
if not cap.isOpened():
    print("Cannot open camera")
    exit()

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind(("0.0.0.0", PORT))
server_socket.listen(10)

client_socket, client_address = server_socket.accept()
print(f"Accepted connection from {client_address}")

while True:
    ret, frame = cap.read()
    if not ret:
        print("Can't receive frame (stream end?). Exiting ...")
        break

    serialized_frame = pickle.dumps(frame)
    message_size = struct.pack("L", len(serialized_frame))
    client_socket.sendall(message_size + serialized_frame)

    # cv.imshow("frame", frame)
    if cv.waitKey(1) == ord("q"):
        break

cap.release()
cv.destroyAllWindows()
