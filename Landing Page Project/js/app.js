/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

//get the number of sections by counting its class 
let secCounter=document.querySelectorAll('.landing__container').length;

//menu elements counter to be used with adding new elements after adding new section and is global to continue from the end
let liCount= 0;

//section content in HTML starting from <div> to be added as a HTML content to any new section with <p>, classes, IDs and styles
const sectionElement =document.querySelector('#section1');
const sectionContent=sectionElement.innerHTML;

//last active section index element in the class list 
let lastActiveSec=1;

//a flag to be used with timeout function for for scroll event
let scrollFlag;
let lastMenu=0;

let upFlag=0;//flag to detect top page up page=1 and not up = 0

let flag=0; //flag to detect that all menu items are inactive all in active = 0 and all active = 1

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
///////Start Building menu helper functions
//create and stlyle single menu Element and return element with its class, ID and content
function menuElement(i)
{
    const menuItem=document.createElement('li');
    const anch=document.createElement('a');
    anch.setAttribute('hash','#section'+i);//add section number hyperlink to the anchor (href is deleted)
    anch.setAttribute('class','menu__link');//add the anchor to li class for css
    anch.innerText='Section '+i;//name it with the proper section
    menuItem.appendChild(anch);
    menuItem.setAttribute('id','navbar__list');/// add the li to its class for css and calling
    menuItem.setAttribute('id','navbar__list'+i);
    return menuItem;
}


//Add items in the navBar for the current unknown number of sections and future added sections
function firstBuildNav()
{
    const sec= secCounter;

    const fragment = document.createDocumentFragment();
    const menuMain= document.querySelector('#navbar__list');
    for(let i=liCount+1;i<=sec;i++)
    {
        const menuItem=menuElement(i);

        fragment.appendChild(menuItem);
        
    }
    menuMain.appendChild(fragment);
    liCount=sec;//set the number of menu element to the number of sections
}


///add the click event for every element
function menuEvent()
{
    for(let i=1;i<=liCount;i++)
    {
        elementEvent(i);         //send the index to the helper function
    }

    
}

//a function to create event for every menu element
function elementEvent(eleIndex)
{
    const menuItemSel=document.querySelector('#navbar__list'+eleIndex);
    const targetItem=document.querySelector('#section'+eleIndex);
    menuItemSel.addEventListener('click', function actMenu(event)
    {
        targetItem.scrollIntoView({behavior: 'smooth'});
        
        activMenuEle(eleIndex);
        
        event.preventDefault();
    });
}
//a Functoin to toggle class for every menu item
function activMenuEle(eleIndex)
{
    if(upFlag===1&&flag===1)//incase the viewport is on top and an element is highlited before
    {
        const lastMenuElee=document.querySelector('#navbar__list'+lastMenu);
        lastMenuElee.classList.toggle('active');
        lastMenu=0;
        flag=0;
    }
    else if(lastMenu===0&&flag===0)//in case a section is selected and that was the first action with the page
    {
        
        const menuItemSelect=document.querySelector('#navbar__list'+eleIndex);
        menuItemSelect.classList.toggle('active');
        lastMenu=eleIndex;
        flag=1;
      
                
    }

    else if(lastMenu!=0&&flag===1)//toggling between old and new sections menu elements
    {
        const menuItemSelectt=document.querySelector('#navbar__list'+eleIndex);
        const lastMenuElee=document.querySelector('#navbar__list'+lastMenu);
        menuItemSelectt.classList.toggle('active');
        lastMenuElee.classList.toggle('active');
        
        lastMenu=eleIndex; 
                
    }
    


}


///////End building Menu helper functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////start creating buttons helper functions

// a Function to create button to add sections, its style and attributes class and ID
function addSecButton()
{
    const btn= document.createElement('button');
    btn.innerText='Add Section';
    btn.setAttribute('id','add__button');
    const navBar=document.querySelector('.main__hero');//('header');
    navBar.appendChild(btn);
}

// a function to create scroll top button
function upButton()
{
    const btn= document.createElement('button');
    btn.innerText='Scroll Top';
    btn.setAttribute('id','up__button');
    btn.setAttribute('style','display: none;position: fixed;bottom: 20px;right: 30px;z-index: 99;font-size: 18px;background-color: red;color: white;');
    const parent=document.querySelector('.main__hero');
    parent.appendChild(btn);
}

///////End creating buttons helper functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////start creating sections helper functions and getting its coordinates


//a function to get the coordinates of specefic section by sending it's ID to the viewportdetect function and return top coordinate only
function viewPortDetect(sectionID)
{
    const selectSectionId=document.querySelector('#'+sectionID);///get section id and add # before it to select it with queryselector
    const coordinates=selectSectionId.getBoundingClientRect().top;///get top coordinate with getBoundingClientRect built in function
    return coordinates;//return coordinates to getCurrCoor function
}

//a function to get all sections top coordinates and find the active section be make all values positive and select the smallest value
function getCurrCoor()
{
    const secCoord=[];//an array to save coordinates in it
    let coor=0;// the index of the active section
    let temp=0;// a variable to temporary default save section 1 as default section then compare with other elements
     //a loop to get all available sections top coordinates   
    for(let i=1;i<=secCounter;i++)    //secCounter is a global variable updated by addNewSection() function
    {
        secCoord[i]=viewPortDetect('section'+i);
        if(secCoord[i]<0)
        {
            secCoord[i]*=(-1);       //turn negative top coordinates values into positive
        }
    }
    temp=secCoord[1];       //set default active section coordinate to section 1 top coordinate
    coor=1;                 //set default index of active section to section 1
    for(let i=2;i<=secCounter;i++)//start from item 2 to the end of sections because item 1 is already set as default
    {
        if(temp>secCoord[i])
        {
            temp=secCoord[i];
            coor=i;
        }
        else;
    }

    return coor;//return the section number
}

///the main function to add new section 
function addNewSection()
{
  
    const newSec=document.createElement('section');

    const sectionNo=secCounter+1;
    const attach=document.querySelector('#section'+secCounter);
    newSec.setAttribute('id','section'+sectionNo);
    newSec.setAttribute('data-nav','section '+sectionNo);

    const sectionContent=sectionElement.innerHTML;
    
    newSec.innerHTML=sectionContent;
    newSec.querySelector('h2').innerText='Section '+sectionNo;

    attach.insertAdjacentElement('afterend',newSec);
    ++secCounter;
    getCurrCoor();

}

//toggle class for active section
function classActive()
{
    const activeID=getCurrCoor();
    const newActive=document.querySelector('#section'+activeID);
    const lastActive=document.querySelector('#section'+lastActiveSec)
    
    newActive.classList.toggle('your-active-class');
    lastActive.classList.toggle('your-active-class');
      
    lastActiveSec=activeID;

    
    
}

///////End creating sections helper functions and getting its coordinates
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////start preparing event functions and its related actions

//function to collect actions related to adding new section button
function addBtnAction()
{
    addNewSection();
    firstBuildNav();
    elementEvent(liCount);

}
//adding new section button event
function btnAddSec()
{
    const btnAdd=document.querySelector('#add__button');

    btnAdd.addEventListener('click',addBtnAction);
}

function upBtbAction()
{
    window.scrollTo({
        top:0,
        left:0,
        behavior:'smooth'
    });
}

//adding scroll top button event
function scrollTopAction()
{
    const btnUp=document.querySelector('#up__button');
    btnUp.addEventListener('click',upBtbAction);
}


//scroll top function action and event
function scrollTopFn()
{
btn=document.querySelector('#up__button');
window.onscroll = function topAction()
{
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        btn.setAttribute('style','display: block;position: fixed;bottom: 20px;right: 30px;z-index: 99;font-size: 18px;background-color: red;color: white;');
        upFlag=0;
    } else {
        btn.setAttribute('style','display: none;position: fixed;bottom: 20px;right: 30px;z-index: 99;font-size: 18px;background-color: red;color: white;');
        upFlag=1;  
    }
}
}

//scroll event 
function scrollEvent()
{
    window.addEventListener('scroll', function action() 
    {
        // Clear our timeout throughout the scroll
        window.clearTimeout(scrollFlag);
    
        // Set a timeout to run after scrolling ends
        scrollFlag = setTimeout(function() {
    
            // Run the callback
            classActive();
            scrollTopFn();
            activMenuEle(lastActiveSec);

        }, 66);
    
    }, false);

}


///////End 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////start main helper functions

///initial function which contain all main functions
function init()
{
    addNewSection();
    firstBuildNav();
    addSecButton();
    upButton();
    getCurrCoor();
    scrollTopFn();
    menuEvent();

}
///////End main helper functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
//initiation function to load main basic functions
init();
classActive();
//an event to add new section by click on add new section button
btnAddSec();

// Add class 'active' to section when near top of viewport
scrollEvent();

//scroll to top function and event
scrollTopAction();

