# CODEase: Legacy Visual Programming

## I. Project Overview
<p align="justify">A web-based visual programming simulator that allows users to simply create their own programs in the form of  “blocks”. Users can interact with these blocks through a drag-and-drop function where they can be placed, connected, and manipulated in order to create a program. The entire process of the created program can then be visualized and simulated line-by-line to help users understand how the program works.</p>

## II. System Architecture
<p align="justify">The main component of CODEase occurs within the SIMULATION page of the website. In the page, the user is presented with 4 sections, the Block Container, Playground, Code Process, and the Output section. Inside the BLOCK CONTAINER section is a collection of selected blocks, each having different functions and interactability relating to computer programming, such as initialize variable, loops, arithmetics, if statements, and such. The central feature of the website is the chracteristic of these blocks to be dragged and dropped inside the PLAYGROUND section. Moreover, the blocks inside this section can be connected and inserted into one another, creating a complete program. Once finished interacting with the blocks, users can click a button to simulate the connected blocks. Doing so would present the user with a detailed process on how the created program works which is illustrated in the CODE PROCESS section. Along this, the output of the created program will also show in the OUTPUT section.</p>

## III. Applied Computer Science Concept
<p align="justify">The core computer science concept applied in CODEase is the idea of programming/coding. . The website also employed its own visual programming language where there are custom blocks that simplifies the typical programming language functions.</p>

## IV. Algorithms Used
<p align="justify">No particular algorithms were used but different algorithms were used such as in handling movement update of blocks, addition of blocks, and sorting the order of execution of blocks.</p>

## V. Security Mechanisms
<p align="justify">Proper implementation of input validation can be observed while initializing variables for variable block. Along this, data encryption of strings was also implemented as additional security mechanism.</p>

## VI. Development Process and Design Decisions
<p align="justify">Explain how computer science theory influenced your development decisions.</p>

## VII. Correctness and Efficiency
<p align="justify">Made the blocks' connections detection based on distance from another.</p>

## VIII. How to Run the Project
<p align="justify">Follow these steps to set up and run the project on your local machine:</p>  

1. **Prerequisites**  
   - Ensure [Node.js](https://nodejs.org/) is installed on your system.  
   - Download or clone the project files from the repository.

2. **Installing Dependencies**  
   - Open a terminal and navigate to the `server` subfolder using the command:  
     ```
     cd /path-to-project/server
     ```
   - Run the following command to install dependencies:  
     ```
     npm install
     ```
   - Repeat the same process for the `codease` subfolder:  
     ```
     cd /path-to-project/codease
     npm install
     ```

3. **Running the Project**  
   - Start the server by navigating to the `server` folder and running:  
     ```
     npm start
     ```
   - Start the client by navigating to the `codease` folder and running:  
     ```
     npm run dev
     ```

4. **Access the Application**  
   - Open your browser and navigate to the provided local URL (usually `http://localhost:5173` or as specified in the terminal output).  


## IX. Contributors
<p><b>Frontend Developer:</b> Agres, Zyrach Adrian</p>
<p><b>Backend Developer:</b> Guernaldo, Mardyson Justin</p>
<p><b>Project Manager/Fullstack Developer:</b> Lejano, Nathaniel</p>
<p><b>Instructor, IT 314 – Web Systems and Technologies:</b> Ms. Fatima Marie P. Agdon, MSCS</p>

## X. Acknowledgment
<p align="justify">LeBron James</p>
