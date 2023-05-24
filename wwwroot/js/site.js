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
    {name: 'projectContainer', value: document.getElementById('projectContainer')}
];

const navIcons = [
    {name: 'webProjectsToProjects', value: document.getElementById('webProjectsToProjects')}
];



//PANEL NAV
navIcons.forEach(n => {
    n.value.addEventListener('click', () => {
        switch(n.name) {
            case 'webProjectsToProjects':
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
                    console.log('Mobile Projects');
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
    const name = document.getElementById('projectName');
    const img = document.getElementById('projectImage');
    const date = document.getElementById('projectDate');
    const version = document.getElementById('projectVersion')
    const description = document.getElementById('projectDescription');
    const link = document.getElementById('projectHyper');
    const project = getProject(projectName);
    const cancel = document.getElementById('cancelProject');

    name.innerText = project.name;
    date.innerText = project.date;
    img.src = project.imageUrl;
    img.alt = project.imageAlt;
    version.innerText = project.version;
    description.innerText = project.description;
    link.href = project.link;

    cancel.addEventListener('click', () => {
        borderContainer.classList.remove('container-active');
        switch(project.projectType) {
            case 'web':
                clearContainer();
                makeVisible(elements[3], 'flex');
                break;
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
        date: 'Unreleased',
        version: 'v0.1',
        link: 'https://lethargiesleeps.github.io',
        imageUrl: './wwwroot/images/projectcovers/myreportcard.png',
        imageAlt: 'Grade Genius splash page',
        projectName: 'gradeGenius',
        projectType: 'web'

    }
];

