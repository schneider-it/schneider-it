from bs4 import BeautifulSoup
import json
import os 
import re
import sys

class Topic:
    def __init__(self, title, location):
        self.title = title 
        self.location = location
        self.subtopics = list() 
    
    def __str__(self):
        return str(self.title)
    
class TopicEncoder(json.JSONEncoder):
    def default(self, o):
        return o.__dict__

class Indexer:
    def __init__(self):
        pass
        
    def index_subfolder(self, location):
        htmlfiles = list()
        for file in os.listdir(location):
            if file.endswith(".html"):
                htmlfiles.append(location + '/' + file)
        
        topics = list()
        for file in htmlfiles:
            topics.append(self.index_file(file))
        
        return topics

    def index_file(self,file):
        with open(file) as fp:
            try:
                soup = BeautifulSoup(fp,"html.parser").find('body').extract()
                soup = BeautifulSoup(str(soup.find_all('div', {'class': ['searchable']})),"html.parser")
            except:
                raise Exception("Error: The HTML-File " + file + " is not in correct Format!")

            headlines = soup.find_all(re.compile("^h."))
            del soup

            topics = self.index_headings(headlines,int(headlines[0].name[-1]),file)[1]
            topic = topics[0]

        subfolder = file[:-5]
        if os.path.exists(subfolder):
                topic.subtopics += self.index_subfolder(subfolder)
                
        return topic
    
    def index_headings(self,headlines,depth,file):
        topics = list()
        i = 0
        while i < len(headlines):
            headnum = int(headlines[i].name[-1])
            if  headnum < depth:
                #print("Going up:" + str(i-1))
                return (i-1,topics)

            if headnum > depth:
                #print("Going deeper" + str(headlines[i:]))
                consumed,subtopics_ = self.index_headings(headlines[i:],headnum,file)
                topics[-1:][0].subtopics += subtopics_
                i += consumed
            else:
                try:
                    location = file + "#" + headlines[i]['id'] 
                except:
                    location = file
                #print("NEW TOPIC"+ headlines[i].text)
                subtopic = Topic(headlines[i].text,location)
                topics.append(subtopic)
            i += 1
        return (i,topics)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("usage: <tree> <output-file>")
        quit()
    
    location = sys.argv[1]
    output = open(sys.argv[2],'w')

    indexer = Indexer()
    topics = indexer.index_subfolder(location)
    
    json.dump(topics,output, indent=4, cls=TopicEncoder,ensure_ascii=False)
    output.close()