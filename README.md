# CODEase: Legacy Visual Programming🧩

## I. Project Overview
<p align="justify">A web-based visual programming simulator that allows users to simply create their own programs in the form of  “blocks”. Users can interact with these blocks through a drag-and-drop function where they can be placed, connected, and manipulated in order to create a program. The entire process of the created program can then be visualized and simulated line-by-line to help users understand how the program works.</p>

## II. System Architecture
<p align="justify">The main component of CODEase occurs within the SIMULATION page of the website. In the page, the user is presented with 4 sections, the Block Container, Playground, Code Process, and the Output section. Inside the BLOCK CONTAINER section is a collection of selected blocks, each having different functions and interactability relating to computer programming, such as initialize variable, loops, arithmetics, if statements, and such. The central feature of the website is the chracteristic of these blocks to be dragged and dropped inside the PLAYGROUND section. Moreover, the blocks inside this section can be connected and inserted into one another, creating a complete program. Once finished interacting with the blocks, users can click a button to simulate the connected blocks. Doing so would present the user with a detailed process on how the created program works which is illustrated in the CODE PROCESS section. Along this, the output of the created program will also show in the OUTPUT section.</p>

## III. Applied Computer Science Concept
<p align="justify">CODEase applies the core concept of programming by transforming traditional text-based coding into a visual programming paradigm. It introduces a custom visual programming language where blocks represent programming constructs like variables, loops, conditionals, and arithmetic operations which simplifies the coding process for programming beginners to easily understand. This approach emphasizes algorithmic thinking, program structure, and execution flow demonstrating the idea of traditional programming methods through visual learning.</p>

## IV. Algorithms Used
<p align="justify">CODEase incorporates various algorithms such as proximity-based detection which is used for connecting blocks and ensuring accurate alignment. Moreover, sorting algorithms determine the correct execution order of blocks which manages the flow and correctness of the program. An encryption algorithm was also used to encrypt and decrypt user data. These algorithms are used to maintain the system's interactivity, reliability, and performance.</p>

## V. Security Mechanisms
<p align="justify">Proper implementation of input validation can be observed while initializing variables for variable block. The web application prompts users if there are missing inputs and blocks. Along this, the data encryption of inputs was also implemented as an additional security mechanism. The ROT13 cipher was utilized when initializing variables, where they are deciphered as an output. </p>

## VI. Development Process and Design Decisions
<p align="justify">The development of CODEase was guided by core computer science theories and principles to create an accessible visual programming tool. By adopting a drag-and-drop interface and implementing a unique visual programming language, the platform simplifies several programming concepts for beginners to easily get the gist of the concept of coding. Furthermore, the immediate feedback on the step-by-step and output details of the simulation enhances user learning. Security measures, including input validation and encryption of data, ensures data integrity.</p>

## VII. Correctness and Efficiency
<p align="justify">The correctness and efficiency of CODEase is ensured through the precise implementation of block functions and interactions. Block connections are detected based on their proximity, where the blocks' X and Y coordinates are calculated which ensures accurate alignment. Execution order is based on the connected codes from top to bottom. In addition, the simulation process provides real-time feedback, helping users identify and resolve errors quickly.</p>

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
<p align="justify">The CODEase Team would like to sincerely express our gratitude to our professor and course facilitator, Ms. Fatima Marie P. Agdon for her guidance, insightful lectures, and constructive feedbacks since the beginning. Her teachings and encouragement are vital to the production and development of our web application.</p>
