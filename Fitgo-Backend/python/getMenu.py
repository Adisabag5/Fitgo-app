import sys
import json
from knn_comp import loadDataset, getNeighbors, eucldanDistance, getResponse, knn 


#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def main():
    #prepare data
    lines = read_in()
    if lines[0] == 'Male':
        dataSet = 'dataSets/male_menu.csv'
    else:
        dataSet = 'dataSets/female_menu.csv'

    lines = lines[2:]
    result = knn(lines, dataSet)

    print( result )


if __name__ == '__main__':
    main()
