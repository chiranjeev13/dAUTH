from PIL import Image
import pytesseract
import sys

if len(sys.argv) != 2:
    sys.exit("Image file name not specified")

# reading the text
text = pytesseract.image_to_string(Image.open(sys.argv[1]))

received = text

lines = received.split("\n")

aadhar = ""

for line in lines:
    formatted_line = line.replace(" ", "")
    if formatted_line.isnumeric():
        if len(formatted_line) > 10:
            aadhar = formatted_line

print("Aadhar Number: " + aadhar)
