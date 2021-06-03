class PDFObj:
    def __init__(self, px):
        self.pos = px


class Writer:
    def __init__(self, file_name):
        self.file = open(file_name, 'w')
        self.cur_pos = 0
        self.obj = []

    def wl(self, line):
        self.cur_pos = self.file.tell()
        self.file.write(line + "\n")
        return self.cur_pos

    def wo(self, lines, streams=None, header=None):
        line = str(len(self.obj) + 1) + " 0 obj"
        pos = self.wl(line)
        line = "<<"
        if header:
            line += header
        self.wl(line)
        for line in lines:
            self.wl(line)
        self.wl(">>")
        if streams:
            self.wl("stream")
            for line in streams:
                self.wl(line)
            self.wl("endstream")
        self.wl("endobj")

        obj_temp = PDFObj(pos)
        self.obj.append(obj_temp)

    def weof(self):
        nb_objects = len(self.obj)
        pos = self.wl("\n\nxref")
        xref = PDFObj(pos)
        line = "0 " + str(nb_objects)
        self.wl(line)
        line = "0000000000 65535 f"
        self.wl(line)
        for i in range(nb_objects):
            pos = self.obj[i].pos
            pos_str = "0000000000" + str(pos)
            pos_str = pos_str[-10:]
            line = pos_str + " 00000 n"
            self.wl(line)
        self.wl("trailer")
        self.wl("<<")
        self.wl("    /Size " + str(nb_objects))
        self.wl("    /Root 2 0 R")
        self.wl(">>")
        self.wl("startxref")
        line = str(xref.pos)
        self.wl(line)
        self.wl("%%EOF")


def main():
    nb_objects = 0
    obj = []
    w = Writer('test2.pdf')
    w.wl("%PDF-1.4")
    lines = ["/Length 51"]
    streams = ["1 0 0 RG", "15 w",
               "36 250 m",
               "180 250 l",
               "180 36 l",
               "36 36 l",
               "s"]
    w.wo(lines, streams)
    header = "/ Subtype / Type1 / FontDescriptor 14706 0 R / BaseFont / QETLOK + TimesLTPro - Roman / Encoding / " \
             "WinAnsiEncoding / Widths "
    lines = [
        "[250 0 0 0 0 0 0 0 333 333 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 667 0 0 0 0 0 0 0 0 0 0 0 0 556 "
        "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 444 0 444 500 444 0 500 500 278 0 0 278 0 500 500 0 0 333 389 278 500 500 "
        "722",
        "] / FirstChar 32 / Type / Font / LastChar 119"]
    # w.wo(lines, None, header)
    lines = ["/Type /Catalog", "/Pages 3 0 R"]
    w.wo(lines)
    lines = ["/Type /Pages", "/Kids [4 0 R ]", "/Count 1"]
    w.wo(lines)
    lines = ["/Type /Pages", "/Parent 3 0 R", "/MediaBox [0 0 612 792]", "/Contents 1 0 R"]
    w.wo(lines)
    w.weof()


if __name__ == "__main__":
    main()
