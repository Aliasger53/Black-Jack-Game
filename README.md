# Milestone-4: Card game

## Learning Competencies
By the end of this milestone ensure that you
 - [ ] write tests for any program you are ever going to build
 - [ ] are able to create and use object prototypes in js
 - [ ] have understood how everything is an object in js & how powerful it is
 - [ ] have practiced refactoring methods for your code
 - [ ] able to appreciate the importance of thinking of time and planning of the project
 - [ ] learn and practice a few software design patterns like Don't-Repeat-Yourself etc

## Problem Statement
> Playing cards have always been fascinating for mathematicians and logicians. Right from the fact that the number of card shuffles possible are more than the atoms on earth (There are 80,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000 (67 zeros) ways to arrange a deck of 52 cards) to the fact that you could beat some of the biggest casinos by using high school level math; a simple deck of playing cards have always intrigued, amused and sometimes bewildered us.

Pick one card game(Solitaire, Hearts, Rummy, Cheat, BlackJack, Mahjong etc) that you want to implement. It's fine if you want to implement more than one card game. Create the full featured game as a web application that runs on any modern browser and deploy it.

### Releases

1. Choose the card game of your choice ( War , BlackJack ); decide on the rules of the game. Lay them out; writing everything down makes it better. 
2. Create a skeletal layout of your game in HTML → the container, the divs that will contain your cards and the buttons that will trigger draw cards. This will be different for each game. 
3. Create a Javascript file that contains the main logic of your game. 
4. Create a separate Javascript file that contains all of the functionality of your deck, let's call it **deck.js**. This file can thus be reused in different games, by just changing the rules. We will access the contents of this file in our **index.js** file. 
5. Inside **deck.js,**  create a data structure for your card. 
    
    *hint: Do you know which data structure would be ideal for reusable and accessible data? Something like objects, classes and constructor functions come to mind.*    
    
6. Add a function that takes in 2 arrays ( one for the suits, one for the values ) and combines them both into a fresh deck. Make it return a new "Card" for every element in the array, giving you an array with 52 "Card"s. Call this function inside a new Deck data structure. 
    
    *hint: you can combine two arrays into one with the flatmap() function. [Conduct further reearch from the MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)  docs to know more.* 
    
7. create a function inside your deck to shuffle your array of "Cards" 
    
    *hint: you can use Math.random() inside the sort function.* 
    
8. Before you add further functionality to your deck, take care of your frontend. 
In your **index.html**, make all the necessary divs for the element of your games → deck, cards play button, score etc.  
9. Deploy your website on Github/Heroku. As you make changes and commits to your code, they will show up in the deployed version.  
10. Style your HTML with CSS to make your game presentable. 
11. Inside your Card data structure, add a function that dynamically renders a new card from the array of "Card"s.  Use this function in **index.js** to append the new card to your frontend. 
    
    Now, **deck.js** provides us with  a deck, a shuffle function and a function that allows us to withdraw a card. 
    
12. We shall now use these in **index.js**  where we import **deck.js** and implement our game logic.
13. Build a function that, when triggered by a START button kickstarts the game and lays out the cards in your decided format. 
14. Add buttons for drawing cards and an indicator that keeps track of the scores for both individuals. 
15. Initialize a function that is triggered after every card drawg and decides the winning and losing conditions.
16. Create a modal that is triggered when the user wins or loses ( when the game completes ). You can display a trophy or meme of your choice based on the outcome. 
