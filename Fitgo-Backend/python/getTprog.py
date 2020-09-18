import sys
import json
from knn_comp import loadDataset, getNeighbors, eucldanDistance, getResponse, knn
# 


#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])



def main():
    #prepare data
    lines = read_in()

    if lines[0] == 'Male':
        if lines[1] == 'Fit':
            dataSet = 'dataSets/male_1.csv'
        elif lines[1] == 'Cardio':
            dataSet = 'dataSets/male_2.csv'
        else: 
            dataSet = 'dataSets/male_3.csv'
    else:
        if lines[1] == 'Fit':
            dataSet = 'dataSets/female_1.csv'
        elif lines[1] == 'Cardio':
            dataSet = 'dataSets/female_2.csv'
        else: 
            dataSet = 'dataSets/female_3.csv'

    lines = lines[2:]
    result = knn(lines, dataSet)
    
    print( result )


if __name__ == '__main__':
    main()



'''
 #Test
    for x in range(len(testSet)):
        neighbors = getNeighbors(trainingSet,testSet[x], k)
        result = getResponse(neighbors)
        predictions.append(result)
        print('> predicted = ' + repr(result) + ', actual = ' + repr(testSet[x][-1]))
    accuracy = getAccuracy(testSet, predictions)
    print('Accuracy: ' + repr(accuracy) + '%')'''