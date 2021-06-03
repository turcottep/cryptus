class Object():
    def __init__(self):
        self.pos = 0
        self.header = ""
        self.data = ""
        self.footer = ""
        self.numbers = []


def main():
    objects = []
    f = open("test.pdf", "r")
    text = f.readlines()
    obj_temp = Object()
    for line in text:
        print(line)

    line_index = 0
    for line in text:

        if "endobj" in line:
            print("line ended")
            objects.append(obj_temp)
            obj_temp = Object()
        elif "obj" in line:
            obj_temp.pos = line[0]
            line_index = 0
        elif line_index == 2:
            obj_temp.data = line

        line_index += 1

    for obj in objects:
    # obj = objects[3]
        numbers = []
        byte = ""
        for char in obj.data:
            if char == " ":
                if not byte == "":
                    numbers.append(byte)
                byte = ""
            if not char == '[' and not char == " ":
                byte += char
        obj.numbers = numbers
        print(obj.pos, obj.numbers)


if __name__ == "__main__":
    main()
