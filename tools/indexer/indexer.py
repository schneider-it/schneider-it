from bs4 import BeautifulSoup
import json
import os 
import re
import sys

ESCAPECHARS = [
    [ "<", "&lt;" ],
    [ ">", "&gt;" ]
]

class Topic:
    id = -1

    def __init__(self, title, location):
        self.id = Topic.next_id()
        self.title = title 
        self.location = location
        self.subtopics = list() 
    
    def __str__(self):
        return str(self.title)

    @classmethod
    def next_id(cls):
        Topic.id += 1
        return Topic.id

    
    def escapeChars(self):
        def escape(string,escapechars):
            for c in ESCAPECHARS:
                string = string.replace(c[0], c[1])
            return string

        self.title = escape(self.title,ESCAPECHARS)
        self.location = escape(self.location,ESCAPECHARS)
        
        for topic in self.subtopics:
            topic.escapeChars()
        
            
    def getCoreInfo(self):
        return {"id":self.id, "title": self.title, "location":self.location}
    
    def toFlat(self,prettypath=""):
        topics = list()

        topic = self.getCoreInfo()
        topic['prettypath'] = prettypath
        topics.append(topic)

        if prettypath == "":
            splitter = ""
        else:
            splitter = " ➜ "
        for topic in self.subtopics:
            topics += topic.toFlat("{0}{1}{2}".format(prettypath,splitter,self.title))

        return topics
    

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
                soup = BeautifulSoup(fp,"html.parser", from_encoding='utf-8').find('body').extract()
                soup = BeautifulSoup(str(soup.find_all('div', {'class': ['searchable']})),"html.parser")
            except:
                raise Exception("Error: The HTML-File " + file + " is not in correct Format!")

            headlines = soup.find_all(re.compile("^h[1-7]"))
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
                    location = "/{0}#{1}".format(file,headlines[i]['id'])
                except:
                    location = "/{0}".format(file)
                #print("NEW TOPIC"+ headlines[i].text)
                subtopic = Topic(headlines[i].text.strip(),location)
                topics.append(subtopic)
            i += 1
        return (i,topics)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        #print("usage: <tree> <output-file>")
        print("no arguments given, using default.")
        location = "docs"
        os.chdir("../../")
        path = "./tools/indexer/index.json"

    else:
        location = sys.argv[1]
        path = sys.argv[2]

    output = open(path,'w', encoding='utf-8')

    indexer = Indexer()
    topics = indexer.index_subfolder(location)

    for topic in  topics:
        topic.escapeChars()
    
    flat = list()
    for topic in topics:
        flat += topic.toFlat()

    json.dump(flat,output, indent=4,ensure_ascii=False)
    output.close()
