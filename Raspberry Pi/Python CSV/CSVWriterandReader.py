import csv

readFile = open("DataBase.csv", "rb")
reader = csv.reader(readFile)

for row in reader:
    print ("%s" % row)


writeFile = open("DataBase.csv","a")
row = "\n20,20,20,20,20"
writeFile.write(row)