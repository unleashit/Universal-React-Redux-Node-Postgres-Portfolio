import React, { Component } from 'react';
import FAQs from './faq';
import AccordionPane from '../common/accordionPane';

const trainingImg = (typeof window !== 'undefined') ? require('../../../images/training/frontend-dev-ad.png') : '';

class TrainingMain extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="training-main container-fluid">
                <h2>Front End/Full Stack Development Bootcamp</h2>
                <img src={trainingImg} alt="Front End Development Bootcamp" className="bootcamp-img"/>
                <p>Over the years I have helped hundreds of students from many backgrounds, interests and levels of
                    experience unravel the mysteries of web development. Whether you are a brand new developer or just
                    need to learn the front end, I can teach you best practices and help you get off to a proper and
                    <strong>current</strong> start.</p>
                <p>This program focuses on the fundamentals and the art of front end engineering and as such is <strong>not
                    for casual students</strong>. If for example you just need to make a site/app for your business and
                    have limited time, professional training would probably be overkill. You would be better off hiring
                    it out or going with a cloud service. But if you are interested in a career as a Front End or Full
                    Stack Developer, or maybe if the front end has been a missing link in your CS program or code
                    school, this might be for you.</p>
                <p>What I am offering beginners or intermediates is a group of rigorous courses divided into 3 parts.
                    The first two are for Front End while the third is optional if you are interested in the Full Stack.
                    This is not a dusty old program where the skills you learn are already obsolete. We will prioritize
                    the fundamentals because they are more or less a constant, but we will also be using some of the
                    very latest tools, patterns and best practices.</p>

                <div className="part1">
                    <h3>Part 1: Html 5 and CSS</h3>

                    <p><strong>Lecture Time:</strong> Approximately 8-12 two hour sessions | <strong>Homework
                        Time:</strong> 4-6 hours /week | <strong>Prerequisite:</strong> none, anyone is welcome!</p>
                    <p>Part one begins with a survey into the various technologies that make up the stack and begins
                        with HTML and CSS. These days the hipsters and pundits aren't talking about HTML/CSS as much as
                        they used to, partly because they're not as fresh and exciting and partly because it is
                        sometimes incorrectly assumed that frameworks like Bootstrap are enough. Unless your focus ends
                        up on simple prototypes that look like every other Bootstrap app (in which case you can expect
                        that your app will become as popular as going to the Dentist), this is dangerous thinking!
                        Limited HTML/CSS ability will also hinder your Javascript, since they all work together hand in
                        hand. In this program, CSS and HTML are treated as first class citizens. This will make your
                        skills more marketable and the entire road ahead much easier.</p>
                    <p>Note that this track (or demonstrated knowledge) is a prerequisite for the rest of the
                        program.</p>

                    <AccordionPane>
                        <h4 className="faq-header">Part I goals <span> - click to expand</span></h4>
                        <div className="faq-body">
                            <ul>
                                <li>Start with a talk and see some demos about the various front end (and some
                                    backend)technologies, current trends, and where/why they come into play
                                </li>
                                <li>Set up a good front end environment. Choose and configure a code editor, install
                                    Node.js, Git and other tools
                                </li>
                                <li>Git, Github and terminal basics. We will use Git throughout the course to
                                    communicate and collaborate on projects
                                </li>
                                <li>Basics of html5 and css including the dom, cascade and inheritance, box model,
                                    inline &amp; block, layout strategies and more
                                </li>
                                <li>Proper use of semantic markup and metadata for search engines and machine scraping
                                </li>
                                <li>CSS resets for normalizing browser compatibility</li>
                                <li>Creating a simple blog style web page with the above strategies applied, basic
                                    styling but no layout yet
                                </li>
                                <li>Creating a more detailed and interesting responsive home page with some layout
                                    challenges
                                </li>
                                <li>Adding an interior page that shares a template but has layout and other changes</li>
                                <li>Working with media queries and responsive, fluid layouts that adapt to all screen
                                    sizes
                                </li>
                                <li>CSS animation basics</li>
                                <li>Using Chrome Developer Tools to debug code in the browser, and online tools to test
                                    and identify issues
                                </li>
                                <li>Basic FTP deployment</li>
                                <li>Recommended: Bootstrap and Sass</li>
                                <li>Optional: Any areas of interest that you might have like translating a design from a
                                    mockup, etc.
                                </li>
                            </ul>
                        </div>
                    </AccordionPane>
                </div>

                <div className="part2">
                    <h3>Part 2: Javascript and Front End Tools</h3>
                    <p><strong>Lecture Time:</strong> Approximately 10-15 two hour sessions | <strong>Homework
                        Time:</strong> 4-6 hours /week | <strong>Prerequisites:</strong> Part 1 or skills test</p>
                    <p>These days without a good knowledge of javascript it will be hard to land a job. It is used for
                        everything from user interface interactivity in the browser to the majority of application
                        logic. This course has two goals. First to give you a good grasp on the fundamentals of the
                        language. Second to give you some practice implementing the typical needs of client side web
                        apps. Our main focus will be on vanilla ES6 because this is the most important knowledge to
                        have, but if your time and budget allows we will also cover React/Redux. We will also be
                        covering modern tooling including NPM, Babel, Webpack, and SASS.</p>

                    <p>Part one (or demonstrated knowledge) is a prerequisite for this track.</p>

                    <AccordionPane>
                        <h4 className="faq-header">Part II goals <span>- click to expand</span></h4>
                        <div className="faq-body">
                            <ul>
                                <li>Start with a talk about how it works, the common frameworks and libraries, how to
                                    best ask questions, find documentation, etc.
                                </li>
                                <li>Javascript syntax: operators, primitives, arrays, objects, loops, functions,
                                    classes, ES6+
                                </li>
                                <li>Javascript scope (including what's new in ES6+)</li>
                                <li>Common Javascript patterns including object literal, classical and prototypal
                                    inheritance, MVC and Functional Programming
                                </li>
                                <li>Higher order functions like filter, map and reduce</li>
                                <li>Dom selection/manipulation</li>
                                <li>Event handling and common UI interactions</li>
                                <li>Forms and form validation</li>
                                <li>Using browser dev tools to debug, set breakpoints, etc.</li>
                                <li>Using a module loader (Webpack) and the ES6 module pattern</li>
                                <li>Using Webpack to compile ES6+, SASS, lint using ESLint, live reload, and to automate
                                    asset management for better front end performance
                                </li>
                                <li>Working with REST, JSON and AJAX, understanding the HTTP(S) lifecycle</li>
                                <li>Asynchronous Javascript and callbacks vs. Promise vs. Async/Await patterns</li>
                                <li>Working with 3rd party APIs and generating a mock database/api for prototyping or
                                    testing with Json Web Server
                                </li>
                                <li>Various small Javascript projects in vanilla Javascript and optionally React</li>
                                <li>Recommended: Introduction to vanilla React using built in state management</li>
                                <li>Recommended: Adding Redux for state and event management</li>
                                <li>Recommended: Higher order components</li>
                                <li>Recommended: Using community React components like React Router, Redux Form, UI
                                    components, etc.
                                </li>
                                <li>Recommended: Redux dev tools for state based debugging (aka "Time Travel", with Flux
                                    Capacitor!)
                                </li>
                                <li>Optional: Introduction to jQuery. jQuery is less important nowadays, but since it's
                                    still common it's good idea to at least learn the basics
                                </li>
                                <li>Optional: Intro to unit testing with Mocha and Chai</li>
                                <li>Optional: Areas of interest</li>
                            </ul>
                        </div>
                    </AccordionPane>
                </div>

                <div className="part3">
                    <h3>Part 3 (optional): Full Stack </h3>
                    <p><strong>Lecture Time:</strong> Approximately 8-15 two hour sessions | <strong>Homework
                        Time:</strong> 5-15+ hours /week | <strong>Prerequisites:</strong> Parts 1 and 2, or skills test
                    </p>
                    <p>When Node started becoming popular around 2011, the writing was on the wall that the lines
                        between front and back end would begin to fade. If you know already Javascript, you've already
                        taken a big step towards full stack. There are a lot of new concepts like databases and servers
                        to learn, but since Node.js is basically Javascript, you already have the biggest piece of the
                        puzzle. Of course the backend is a big area and there are other popular programming languages
                        like Ruby, Java, Python, Go (and countless others), having full stack skills in Javascript is
                        quite valuable and will set you apart. Our focus will be on Node, Express, Mysql and Linux. The
                        reason for Mysql and not a NoSql DB like Mongo, is because once you learn SQL and relational
                        databases, you will have an easier time picking up NoSql than the other way around. Sooner or
                        later it's probably not a bad idea to know both, but the current trend has been more towards
                        RDBMS like Mysql and Postgres (both of which now actually have NoSql data types).</p>

                    <p>Both parts one and two (or demonstrated knowledge) are prerequisites for moving into the Full
                        Stack.</p>

                    <AccordionPane>
                        <h4 className="faq-header">Part III goals <span>- click to expand</span></h4>
                        <div className="faq-body">
                            <ul>
                                <li>Start with a talk about the various technologies, programming languages and
                                    infrastructures involved in the back end, along with some of the pros and cons
                                </li>
                                <li>Set up an Amazon EC2 or Digital Ocean instance and Introduction to Linux OS</li>
                                <li>Bash commands, Bash scripting, SSH, Curl and Apt, the Linux package manager</li>
                                <li>Introduction to the Nginx web server and simple load balancing</li>
                                <li>Learn about security and how to harden the server against common threats</li>
                                <li>Setting up and using Mysql, learning database and SQL basics</li>
                                <li>Node.js and Javascript on the server</li>
                                <li>Express.js to handle both traditional routing and expose a REST API</li>
                                <li>Use Mysql and EJS templates to create dynamic server rendered content</li>
                                <li>Add registration and login using classic cookie based authentication and
                                    Passport.js
                                </li>
                                <li>Explore and implement some of the modern authentication methods including JWT, Oauth
                                    and OpenId (ex: register with Google, etc.)
                                </li>
                                <li>Learn CRUD basics (create, read, update, delete) by making a simple Content
                                    Management System using Javascript, Node/Express and Mysql
                                </li>
                                <li>Reuse the signup/authentication modules you created in the previous excercise</li>
                                <li>Optional: Add pagination and sorting widgets to lists of content in the CMS</li>
                                <li>Create a Social Network with user posts, comments and likes using React (or plain
                                    Javascript if you don't know it), REST, Node/Express and Mysql
                                </li>
                                <li>Optional: Add a search with typeahead (search suggestions as you type) to the Social
                                    Network app
                                </li>
                                <li>Setting up production Node, Nginx reverse proxy and PM2</li>
                                <li>Deployment with Git and optionally Flightplan.js. Discussion of newer and more
                                    enterprise strategies like Containers, Microservices and cloud services like AWS
                                    Lambda or Firebase
                                </li>
                                <li>Optional: Make a real time chat app with Websockets and Socket.io</li>
                                <li>Optional: Working with a database ORM like Sequelize</li>
                                <li>Optional: Universal/Isomorphic React (React on the server)</li>
                                <li>Optional: Any areas of interest</li>
                            </ul>
                        </div>
                    </AccordionPane>
                </div>

                <FAQs />
            </div>
        );
    }
};

export default TrainingMain;