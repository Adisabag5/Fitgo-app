import haversine as hs

def calGoe():
    loc1=(28.426846,77.088834)
    loc2=(28.394231,77.050308)
    hs.haversine(loc1,loc2)

def main():
    calGoe()

if __name__ == '__main__':
    main()