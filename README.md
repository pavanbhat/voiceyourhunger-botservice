# Voice Your Hunger - Bot Service

# Inspiration:
Intelligent systems and AI has been providing revolutionary services to users as it is now connected to most of the IoT devices and can also be found being smart on automotive. Cortana – an intelligent AI developed by Microsoft has the capability to be present on all the platforms and thus has a reach of over more than 60 million users. With these observations, we wanted to create a new service where a user could order or takeout food using open source APIs such as Eatstreet but instead of using it as an App, the user will have the ability to talk to Cortana and enjoy the seamless integration of cognitive intelligence to have a conversation with an AI to complete the order.

# What it does:
Using Cortana’s intelligence, the app uses a custom Bot that is built on Bot framework to communicate to the user by having a conversation. Through this conversation, the user will provide the bot all the necessary information required to place a food order. Behind the scenes, the bot uses, REST webservices that is designed to provide Cortana the ability to place the order.

# How we Built it:
To use the cognitive intelligence services provided by Cortana, we developed a bot that has been deployed on Microsoft Azure. The Bot is developed on top of the Bot framework which provides the capability to design it using NodeJS. This script tells Cortana how to talk and how to handle the user inputs through conversations and also helps in building a very casual and interactive chat with the user.
To handle the backend service that actually provides the Bot all the data is a REST webservice which has been developed as a Microservice. This Microservice is built using Spring boot that exposes several REST endpoints that the Bot can contact and get the data. The microservice uses Eatstreet and Yelp APIs to build the service.

# Challenges we ran into:
Our team was unfamilier with the the Azure ecosystem which led us to spend a lot of time reading documentation and understanding the architecture of the cognitive module of Cortana for text and Speech Analytics. The documentation was a bit poor and there very few supporting videos or adhoc websites for us to refer and learn, which in itself made the whole thing a herculian task. Unfortunately, due to the Azure behaving erratically we couldn't use their actual interface but instead worked on an emulator.

# Accomplishments that we're proud of:
Working on AI technology such as Bot framework for cognitive intelligence. Also, a lot of exposure to third party APIs that enabled us to work with different datasets. And setting up infrastructure on AWS and Azure enabled us to understand the state of the art cloud infrastructure.
