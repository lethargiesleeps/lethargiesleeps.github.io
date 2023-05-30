//GLOBAL VARIABLES//
let currentPage = 0;
const container = document.querySelector('.canvas');

//PROJECTS ELEMENTS//
const panels = document.querySelectorAll('.panel');
const links = document.querySelectorAll('.nav-link');
const borderContainer = document.getElementById('container');

const elements = [
    { name: 'home', value: document.getElementById('homeBody') }, //0
    { name: 'blurb', value: document.getElementById('homeBlurb') },                  //1
    { name: 'projects', value: document.getElementById('projectCatContainer') },     //2
    { name: 'webProjects', value: document.getElementById('webProjectsContainer') },  //3
    { name: 'resume', value: document.getElementById('resumeContainer') },            //4
    { name: 'connect', value: document.getElementById('connectContainer') },          //5
    { name: 'projectContainer', value: document.getElementById('projectContainer') },
    { name: 'mobileProjects', value: document.getElementById('mobileProjectsContainer') }, //7
    { name: 'desktopProjects', value: document.getElementById('desktopProjectsContainer') }
];

const navIcons = [
    { name: 'webProjectsToProjects', value: document.getElementById('webProjectsToProjects') },
    { name: 'mobileProjectsToProjects', value: document.getElementById('mobileProjectsToProjects') },
    { name: 'desktopProjectsToProjects', value: document.getElementById('desktopProjectsToProjects') }
];




/**
 * Project Panel Navigation
 * When projects in a category exceeds 3, add project navigation inside navIcons, then add case here.
 */
navIcons.forEach(n => {
    n.value.addEventListener('click', () => {
        switch(n.name) {
            case 'webProjectsToProjects':
                goToProjects();
                break;
            case 'mobileProjectsToProjects':
                goToProjects();
                break;
            case 'desktopProjectsToProjects':
                goToProjects();
        }
    });
});

/**
 * Initial view here when user first enters site.
 */
//TODO: dummy loading screen to allow images and packages to load.
links[0].innerText = '☺';
clearContainer();
makeVisible(elements[0], 'block');
makeVisible(elements[1], 'block');
scrollAdjustment();


/**
 * Panel interactions.
 */
panels.forEach(panel => {

    // Adds 'active' class on hover (desktop only)
    panel.addEventListener('mouseover', () => {
        removeActiveClasses();
        panel.classList.add('active');
    });

    //Removes 'active' class when mouse leaves panel (desktop only)
    panel.addEventListener('mouseout', removeActiveClasses);

    //Navigates to appropriate section. Default will load the project view, add project category here if it exceeds
    //the initial three.
    panel.addEventListener('click', () => {
        if(panel.classList.contains('active')) {
            switch(panel) {
                case panels[0]:
                    clearContainer();
                    makeVisible(elements[3], 'flex');
                    break;
                case panels[1]:
                    clearContainer();
                    makeVisible(elements[7], 'flex');
                    break;
                case panels[2]:
                    clearContainer();
                    makeVisible(elements[8], 'flex');
                    break;
                default:
                    displayProject(panel.id);
            }
        }
    })

})


/**
 * Primary menu navigation
 */
for(let i = 0; i < links.length; i++) {

    links[i].addEventListener("mouseover", () => {
        links[i].classList.add('on-hover-nav');
    });

    links[i].addEventListener("mouseout", () => {
        links[i].classList.remove('on-hover-nav');
    });

    links[i].addEventListener("click", () => {
        //Removes container change if navigating from project to other menu item.
        if(borderContainer.classList.contains('container-active'))
            borderContainer.classList.remove('container-active');

        switch(i) {
            case 0:
                pageTitle.innerText = "Michaël Landry - Portfolio";
                goToHome();
                break;
            case 1:
                pageTitle.innerText = "Michaël Landry - Projects";
                goToProjects();
                break;
            case 2:
                pageTitle.innerText = "Michaël Landry - Resume";
                goToResume();
                break;
            case 3:
                pageTitle.innerText = "Michaël Landry - Connect";
                goToConnect();
                break;
            default:
                pageTitle.innerText = "Michaël Landry - 404";
        }
    });

}

/**
 * Ensures the page is always at top if navigating pages, mostly used for mobile version.
 */
function scrollAdjustment() {
    window.addEventListener('DOMContentLoaded', function() {
        const bgImage = document.querySelector('.bg-image');
        const canvas = document.querySelector('.canvas');
        
        container.addEventListener('scroll', function() {
          const scrollTop = container.scrollTop;
          canvas.style.top = `${scrollTop}px`;
          bgImage.style.top = `${scrollTop}px`;
        });
        
    });
}

/**
 * Goes to home page
 */
function goToHome() {
    currentPage = 0;
    resetNavTitles();
    links[0].innerText = '☺'
    clearContainer();
    makeVisible(elements[0], 'block');
    makeVisible(elements[1], 'block');
    
}

/**
 * Goes to projects page
 */
function goToProjects() {
    currentPage = 1;
    resetNavTitles();
    links[1].innerText = '☺'
    clearContainer();
    makeVisible(elements[2], 'flex');
    
}

/**
 * Goes to resume page
 */
function goToResume() {
    currentPage = 2;
    resetNavTitles();
    links[2].innerText = '☺'
    clearContainer();
    makeVisible(elements[4], 'flex');
}

/**
 * Goes to connect page
 */
function goToConnect() {
    currentPage = 4;
    resetNavTitles();
    links[3].innerText = '☺'
    clearContainer();
    makeVisible(elements[5], 'flex');
}

/**
 * Parses a project to be display from JSON
 * @param {string} projectName Project ID passed to retrieve project from JSON
 */
function displayProject(projectName) {
    //Initializing
    clearContainer();
    borderContainer.classList.add('container-active');
    makeVisible(elements[6], 'block');
    const name = document.getElementById('projectName');
    const img = document.getElementById('projectImage');
    const date = document.getElementById('projectDate');
    const version = document.getElementById('projectVersion')
    const description = document.getElementById('projectDescription');
    const link = document.getElementById('projectHyper');
    const stack = document.getElementById('projectTools');
    const repo = document.getElementById('projectRepo')
    const project = getProject(projectName); //Gets project
    const cancel = document.getElementById('cancelProject');

    //Parsing
    name.innerText = project.name;
    date.innerText = project.date;
    img.style.backgroundImage = `url('${project.imageUrl}')`
    version.innerText = project.version;
    description.innerText = project.description;
    link.href = project.link;
    stack.innerText = `Built with: ${project.stack}`;
    
    //Shows github icon if repo is public and available
    if(project.repoLink !== 'none')
        repo.style.display = 'block';
    else
        repo.style.display = 'none';

    //Returns user to correct page when navigating. projectType is defined in the JSON array.
    cancel.addEventListener('click', () => {
        borderContainer.classList.remove('container-active');
        switch(project.projectType) {
            case 'web':
                clearContainer();
                makeVisible(elements[3], 'flex');
                break;
            case 'mobile':
                clearContainer();
                makeVisible(elements[7], 'flex');
            case 'desktop':
                clearContainer();
                makeVisible(elements[8], 'flex');
                break;
            default:
                break;
        }
    })
}

//INTERNAL FUNCTIONS//
/**
 * Gets correct project from projectData JSON array
 * @param {string} projectName 
 * @returns project object
 */
function getProject(projectName) {
    let project;
    projectData.forEach(p => {
        if(projectName === p.projectName)
            project = p;
    })
    return project;
}

/**
 * Removes class 'active' from a panel. Mostly used for desktop.
 */
function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active');
    })
}

/**
 * Sets main menu titles to default.
 */
function resetNavTitles() {
    links[0].innerText = 'Home';
    links[1].innerText = 'Projects';
    links[2].innerText = 'Resume';
    links[3].innerText = 'Connect';
}

/**
 * Clears everything except nav menu from screen. 
 * This is used to make sure no elements conflict or overlap on page change
 */
function clearContainer() {
    //FORCE FOR MOBILE, refactor later
    
    elements.forEach(e => {
        e.value.style.display = 'none';
    });
    container.scrollTop = 0;
}

/**
 * Makes certain elements visible on screen, to be used after clearContainer();
 * @param {object} object The object to make visible, typically from elements array
 * @param {string} type string representing css of 'display' css property of parent container/
 * @see clearContainer
 */
function makeVisible(object, type) {
    object.value.style.display = type;
}

/**
 * JSON for all projects in the portfolio
 */
const projectData = [
    {   name: 'Grade Genius',
        description: 'An web-based tool aimed at students of all levels to help them track and review their course progress.',
        date: 'In Production',
        version: 'v0.1',
        link: 'https://lethargiesleeps.github.io',
        imageUrl: '../wwwroot/images/projectcovers/myreportcard.png',
        imageAlt: 'Grade Genius splash page',
        projectName: 'gradeGenius',
        projectType: 'web',
        stack: 'Laravel 10, MySQL, Apache',
        repoLink: 'none'
    },
    {
        name: 'Front End Projects',
        description: 'A collection of front end expirements. I am constantly adding to this project, it is mostly a playground for me to play with HTML/CSS/JS.',
        date: 'March 01, 2023',
        version: 'v1.0.5',
        link: 'https://lethargiesleeps.github.io/FrontEndProjects/',
        imageUrl: '../wwwroot/images/projectcovers/FrontEndProjects.jpg',
        imageAlt: 'Front End Projects splash page',
        projectName: 'frontEndProjects',
        projectType: 'web',
        stack: 'HTML5, CSS3, JavaScript, Bootstrap',
        repoLink: 'https://github.com/lethargiesleeps/FrontEndProjects'

    },
    {
        name: 'Pokémon Crystal Password Cracker',
        description: "A simple web tool that calculates a password used in the Game Boy game Pokémon Crystal. In the game, users must enter a password to change the game's internal clock.",
        date: 'July 21st, 2022',
        version: 'v1.0',
        link: 'https://lethargiesleeps.github.io/CrystalPasswordCracker/',
        imageUrl: '../wwwroot/images/projectcovers/crystalpasswordcracker.png',
        imageAlt: 'Crystal Password Cracker splash screen',
        stack: 'HTML5, CSS3, JavaScript',
        projectName: 'passwordCracker',
        projectType: 'web',
        repoLink: 'https://github.com/lethargiesleeps/CrystalPasswordCracker/'
    },
    {
        name: 'CanTrackVote Benchmarker',
        description: 'A tool used to monitor mobile bandwidth usage of an app by making set background API calls. This app is part of a bigger project, CanTrackVote, that I will add to this site once more work has been completed.',
        date: 'March 27th, 2023',
        version: 'v1.1.1',
        link: 'https://github.com/lethargiesleeps/CTV-Benchmarker/releases/tag/v1.1.1',
        imageUrl: '../wwwroot/images/projectcovers/CTV2.jpg',
        imageAlt: 'CTV Benchmarker Home Screen',
        stack: 'React-Native, Expo',
        projectName: 'ctvBenchmark',
        projectType: 'mobile',
        repoLink: 'https://github.com/lethargiesleeps/CTV-Benchmarker'
    },
    {
        name: 'Android Sandbox',
        description: 'A collection of small Android projects. The goal is to practice my Java and Kotlin skills in the context of Android app development with Android Studio.',
        date: 'March 1st, 2023',
        version: 'v0.0.2',
        link: 'https://github.com/lethargiesleeps/AndroidStudioProjects',
        imageUrl: '../wwwroot/images/projectcovers/androidprojects.png',
        imageAlt: 'Counter Project from Android Sandbox',
        stack: 'Java, Kotlin, Android',
        projectName: 'androidSandbox',
        projectType: 'mobile',
        repoLink: 'none'
    },
    {
        name: 'Bonzi Buddy Port',
        description: 'A port of the early 00s infamous desktop companion Bonzi Buddy for Windows 10 and 11 (spyware free!). Bonzi Buddy can tell jokes, facts, weather, recipes and news using a series of APIs.',
        date: 'February 22nd, 2023',
        version: 'v0.5',
        link: 'https://github.com/lethargiesleeps/BonziBuddy',
        imageUrl: '../wwwroot/images/bonzi/bonzi_news.jpg',
        imageAlt: 'Bonzi on a desktop searching up the news.',
        stack: 'C#, Microsoft Agent/DoubleAgent, WinForms',
        projectName: 'bonziBuddy',
        projectType: 'desktop',
        repoLink: 'none'
    },
    {
        name: 'SharpConverter',
        description: 'Simple command line tool for Windows that converts to and from different number systems. Future versions will include IEEE conversion, and UNICODE/ASCII conversions.',
        date: 'April 28th, 2022',
        version: 'v0.4.1',
        link: 'https://github.com/lethargiesleeps/SharpConverter/releases/tag/Latest',
        imageUrl: '../wwwroot/images/projectcovers/sharp-converter.png',
        imageAlt: 'SharpConverter main menu.',
        stack: 'C#',
        projectName: 'sharpConverter',
        projectType: 'desktop',
        repoLink: 'https://github.com/lethargiesleeps/SharpConverter'
    }
];

