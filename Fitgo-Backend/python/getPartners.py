import sys
import json
import csv
import haversine as hs

def loadDataset(filename):
    with open(filename, 'r') as csvfile:
        lines = csv.reader(csvfile)
        dataSet = list(lines)
    return dataSet
                

def getPartners(trainingSet, testInstance, k):
    loc1 = (testInstance[0], testInstance[1])
    dist = k
    neighbors = []
    for x in range(len(trainingSet)):
        loc2 = (float(trainingSet[x][0]), float(trainingSet[x][1]))
        if dist >= hs.haversine(loc1,loc2):
            if testInstance[2] == trainingSet[x][2]:
                print(trainingSet[x][0],trainingSet[x][1],trainingSet[x][3])
                neighbors.append(trainingSet[x])
    return neighbors  
    


#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def main():
    #prepare data
    lines = read_in()
    k = lines[0]
    lines = lines[1:]
    dataSet = loadDataset('dataSets/partners.csv')
    
    getPartners( dataSet, lines, k)

    #print( result )


if __name__ == '__main__':
    main()
