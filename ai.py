from PIL import Image
import pytesseract


def extractor(image):
    text = pytesseract.image_to_string(Image.open(image))

    received = text

    lines = received.split("\n")

    aadhar = ""

    for line in lines:
        formatted_line = line.replace(" ", "")
        if formatted_line.isnumeric():
            if len(formatted_line) > 10:
                aadhar = formatted_line

    print("Aadhar Number: " + aadhar)
    return aadhar
