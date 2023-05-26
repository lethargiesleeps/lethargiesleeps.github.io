//GLOBAL VARIABLES//
let currentPage = 0;
const container = document.querySelector('.canvas');

//PROJECTS ELEMENTS//
const panels = document.querySelectorAll('.panel');
const links = document.querySelectorAll('.nav-link');
const borderContainer = document.getElementById('container');

const elements = [
    {name: 'credentials', value: document.getElementById('credentialsContainer') }, //0
    {name: 'blurb', value: document.getElementById('homeBlurb') },                  //1
    {name: 'projects', value: document.getElementById('projectCatContainer') },     //2
    {name: 'webProjects', value: document.getElementById('webProjectsContainer') },  //3
    {name: 'resume', value: document.getElementById('resumeContainer') },            //4
    {name: 'connect', value: document.getElementById('connectContainer')},          //5
    {name: 'projectContainer', value: document.getElementById('projectContainer')},
    {name: 'mobileProjects', value: document.getElementById('mobileProjectsContainer')} //7
];

const navIcons = [
    {name: 'webProjectsToProjects', value: document.getElementById('webProjectsToProjects')},
    {name: 'mobileProjectsToProjects', value: document.getElementById('mobileProjectsToProjects')}
];



//PANEL NAV
navIcons.forEach(n => {
    n.value.addEventListener('click', () => {
        switch(n.name) {
            case 'webProjectsToProjects':
                goToProjects();
                break;
            case 'mobileProjectsToProjects':
                goToProjects();
                break;
        }
    });
});

//INIT
links[0].innerText = '☺';
clearContainer();
makeVisible(elements[0], 'block');
makeVisible(elements[1], 'block');
scrollAdjustment();


//PANEL INTERACTION
panels.forEach(panel => {
    console.log(panel);
    panel.addEventListener('mouseover', () => {
        removeActiveClasses();
        panel.classList.add('active');
    });

    panel.addEventListener('mouseout', removeActiveClasses);

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
                    console.log('Mobile')
                    break;
                case panels[2]:
                    console.log('Desktop Projects');
                    break;
                default:
                    displayProject(panel.id);
            }
        }
    })

})

//MAIN NAV INTERACTION
for(let i = 0; i < links.length; i++) {
    links[i].addEventListener("mouseover", () => {
        links[i].classList.add('on-hover-nav');
    });

    links[i].addEventListener("mouseout", () => {
        links[i].classList.remove('on-hover-nav');
    });

    links[i].addEventListener("click", () => {
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
function goToHome() {
    currentPage = 0;
    resetNavTitles();
    links[0].innerText = '☺'
    clearContainer();
    makeVisible(elements[0], 'block');
    makeVisible(elements[1], 'block');
    
}

function goToProjects() {
    currentPage = 1;
    resetNavTitles();
    links[1].innerText = '☺'
    clearContainer();
    makeVisible(elements[2], 'flex');
    
}

function goToResume() {
    currentPage = 2;
    resetNavTitles();
    links[2].innerText = '☺'
    clearContainer();
    makeVisible(elements[4], 'flex');
}

function goToConnect() {
    currentPage = 4;
    resetNavTitles();
    links[3].innerText = '☺'
    clearContainer();
    makeVisible(elements[5], 'flex');
}

function displayProject(projectName) {
    clearContainer();
    borderContainer.classList.add('container-active');
    makeVisible(elements[6], 'block');
    const projContainer = document.querySelector('.project');
    const name = document.getElementById('projectName');
    const img = document.getElementById('projectImage');
    const date = document.getElementById('projectDate');
    const version = document.getElementById('projectVersion')
    const description = document.getElementById('projectDescription');
    const link = document.getElementById('projectHyper');
    const stack = document.getElementById('projectTools');
    const repo = document.getElementById('projectRepo')
    const project = getProject(projectName);
    const cancel = document.getElementById('cancelProject');

    name.innerText = project.name;
    date.innerText = project.date;
    img.src = project.imageUrl;
    img.alt = project.imageAlt;
    version.innerText = project.version;
    description.innerText = project.description;
    link.href = project.link;
    stack.innerText = `Built with: ${project.stack}`;

    if(project.resizeImage) {
        img.classList.remove('project-image');
        img.classList.add('project-image-resize');
        description.style.fontSize = '14px';
        description.style.marginBottom = '1vh';
        projContainer.style.marginTop = '-6vh';

    }
    else {
        img.classList.remove('project-image-resize');
        img.classList.add('project-image');
        description.style.fontSize = '18px';
        description.style.marginBottom = '1vh';
        projContainer.style.marginTop = '0';
    }

    if(project.repoLink !== 'none')
        repo.style.display = 'block';
    else
        repo.style.display = 'none';

    

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
            default:
                break;
        }
    })
}

//INTERNAL FUNCTIONS//
function getProject(projectName) {
    let project;
    projectData.forEach(p => {
        if(projectName === p.projectName)
            project = p;
    })
    return project;
}
function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active');
    })
}

function resetNavTitles() {
    links[0].innerText = 'Home';
    links[1].innerText = 'Projects';
    links[2].innerText = 'Resume';
    links[3].innerText = 'Connect';
}

function clearContainer() {
    elements.forEach(e => {
        e.value.style.display = 'none';
    });
    container.scrollTop = 0;
}

function makeVisible(object, type) {
    object.value.style.display = type;
}

const projectData = [
    {   name: 'Grade Genius',
        description: 'An web-based tool aimed at students of all levels to help them track and review their course progress.',
        date: 'In Production',
        version: 'v0.1',
        link: 'https://lethargiesleeps.github.io',
        imageUrl: './wwwroot/images/projectcovers/myreportcard.png',
        imageAlt: 'Grade Genius splash page',
        projectName: 'gradeGenius',
        projectType: 'web',
        stack: 'Laravel 10, MySQL, Apache',
        repoLink: 'none',
        resizeImage: false

    },
    {
        name: 'Front End Projects',
        description: 'A collection of front end expirements. I am constantly adding to this project, it is mostly a playground for me to play with HTML/CSS/JS.',
        date: 'March 01, 2023',
        version: 'v1.0.5',
        link: 'https://lethargiesleeps.github.io/FrontEndProjects/',
        imageUrl: './wwwroot/images/projectcovers/FrontEndProjects.jpg',
        imageAlt: 'Front End Projects splash page',
        projectName: 'frontEndProjects',
        projectType: 'web',
        stack: 'HTML5, CSS3, JavaScript, Bootstrap',
        repoLink: 'https://github.com/lethargiesleeps/FrontEndProjects',
        resizeImage: false

    },
    {
        name: 'Pokémon Crystal Password Cracker',
        description: "A simple web tool that calculates a password used in the Game Boy game Pokémon Crystal. In the game, users must enter a password to change the game's internal clock.",
        date: 'July 21st, 2022',
        version: 'v1.0',
        link: 'https://lethargiesleeps.github.io/CrystalPasswordCracker/',
        imageUrl: './wwwroot/images/projectcovers/crystalpasswordcracker.png',
        imageAlt: 'Crystal Password Cracker splash screen',
        stack: 'HTML5, CSS3, JavaScript',
        projectName: 'passwordCracker',
        projectType: 'web',
        repoLink: 'https://github.com/lethargiesleeps/CrystalPasswordCracker/',
        resizeImage: false
    },
    {
        name: 'CanTrackVote Benchmarker',
        description: 'A tool used to monitor mobile bandwidth usage of an app by making set background API calls. This app is part of a bigger project, CanTrackVote, that I will add to this site once more work has been completed.',
        date: 'March 27th, 2023',
        version: 'v1.1.1',
        link: 'https://github.com/lethargiesleeps/CTV-Benchmarker/releases/tag/v1.1.1',
        imageUrl: './wwwroot/images/projectcovers/CTV2.jpg',
        imageAlt: 'CTV Benchmarker Home Screen',
        stack: 'React-Native, Expo',
        projectName: 'ctvBenchmark',
        projectType: 'mobile',
        repoLink: 'https://github.com/lethargiesleeps/CTV-Benchmarker',
        resizeImage: true
    },
    {
        name: 'Android Sandbox',
        description: 'A collection of small Android projects. The goal is to practice my Java and Kotlin skills in the context of Android app development with Android Studio.',
        date: 'March 1st, 2023',
        version: 'v0.0.2',
        link: 'https://github.com/lethargiesleeps/AndroidStudioProjects',
        imageUrl: './wwwroot/images/projectcovers/androidprojects.png',
        imageAlt: 'Counter Project from Android Sandbox',
        stack: 'Java, Kotlin, Android',
        projectName: 'androidSandbox',
        projectType: 'mobile',
        repoLink: 'none',
        resizeImage: true
    }
];

