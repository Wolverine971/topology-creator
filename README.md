# topology-creator

## Using Two Libraries as Inspiration :clap:

- [v-jsoneditor](https://github.com/yansenlei/VJsoneditor)
- [vue-json-edit](](https://github.com/jinkin1995/vue-json-edit))

### The Goal 

Create an interactive knowledge graph from podcasts by ingesting transcripts linking topics discussed and providing links with timestamps that take you to the mentioned topic

- Dynamically create JSON
- View JSON in a graph
- Dynamically populate fields for JSON types based off of previously stored data
- Visually see how root nodes are connected
- Continually add root JSON objects and have data be connected between nodes
- Parse topics mentioned and entities recognized, edit and use this [repo](https://github.com/Wolverine971/pyApi) (needs work)



#### Example
* Root Node # 1- Joe Rogan Podcast 132
  * Child node/ topics discussed:
    * Carnivore Diet
    * Drugs
    * Politics
    * Ben Greenfield
    * Keto Diet
    * Fasting
  

* Root Node # 2- Tim Ferris Podcast 123
  * Child node/ topics discussed:
    * Drugs
    * Kevin Kelly
    * Future Forecasting
    * BioHacking
    * Fasting


* Root Node # 3- Drugs
  * Child node/ topics discussed:
    * The green stuff
    * The white stuff
    * The black stuff
    * The legal stuff
    * The prescribed stuff


  User Stories :ok_hand:
> I should be able to search for the topic of Fasting and see that Joe Rogan and Tim Ferris both talked about it on a podcast and be able to click into the timestamp of when they talked about it.

> I should be able to search for drugs and see the child nodes under it recursively

> When adding a new node such as "Peter Thiel on a podcast" I should be given suggestions for what topics I can link to before creating new topics. Such as "Politics" from the Joe Rogan podcast and "Future Forecasting" from the Tim Ferris Podcast.



