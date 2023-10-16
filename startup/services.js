// DOM elements
const DOMstrings = {
    stepsBtnClass: 'multisteps-form__progress-btn',
    stepsBtns: document.querySelectorAll('.multisteps-form__progress-btn'),
    stepsBar: document.querySelector('.multisteps-form__progress'),
    stepsForm: document.querySelector('.multisteps-form__form'),
    stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
    stepFormPanelClass: 'multisteps-form__panel',
    stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
    stepPrevBtnClass: 'js-btn-prev',
    stepNextBtnClass: 'js-btn-next'
  };
  
  // remove class from a set of items
  const removeClasses = (elemSet, className) => {
    elemSet.forEach(elem => {
      elem.classList.remove(className);
    });
  };
  
  // return exact parent node of the element
  const findParent = (elem, parentClass) => {
    let currentNode = elem;
    while (!currentNode.classList.contains(parentClass)) {
      currentNode = currentNode.parentNode;
    }
    return currentNode;
  };
  
  // get active button step number
  const getActiveStep = elem => {
    return Array.from(DOMstrings.stepsBtns).indexOf(elem);
  };
  
  // set all steps before clicked (and clicked too) to active
  const setActiveStep = activeStepNum => {
    removeClasses(DOMstrings.stepsBtns, 'js-active');
    DOMstrings.stepsBtns.forEach((elem, index) => {
      if (index <= activeStepNum) {
        elem.classList.add('js-active');
      }
    });
  };
  
  // get active panel
  const getActivePanel = () => {
    let activePanel;
    DOMstrings.stepFormPanels.forEach(elem => {
      if (elem.classList.contains('js-active')) {
        activePanel = elem;
      }
    });
    return activePanel;
  };
  
  // open active panel (and close inactive panels)
  const setActivePanel = activePanelNum => {
    removeClasses(DOMstrings.stepFormPanels, 'js-active');
    DOMstrings.stepFormPanels.forEach((elem, index) => {
      if (index === activePanelNum) {
        elem.classList.add('js-active');
        setFormHeight(elem);
      }
    });
  };
  
  // set form height equal to current panel height
  const formHeight = activePanel => {
    const activePanelHeight = activePanel.offsetHeight;
    DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;
  };
  
  const setFormHeight = () => {
    const activePanel = getActivePanel();
    formHeight(activePanel);
  };
  
  // STEPS BAR CLICK FUNCTION
  DOMstrings.stepsBar.addEventListener('click', e => {
    const eventTarget = e.target;
    if (!eventTarget.classList.contains(DOMstrings.stepsBtnClass)) {
      return;
    }
    const activeStep = getActiveStep(eventTarget);
    setActiveStep(activeStep);
    setActivePanel(activeStep);
  });
  
  // PREV/NEXT BTNS CLICK
  DOMstrings.stepsForm.addEventListener('click', e => {
    const eventTarget = e.target;
    if (
      !(eventTarget.classList.contains(DOMstrings.stepPrevBtnClass) ||
        eventTarget.classList.contains(DOMstrings.stepNextBtnClass))
    ) {
      return;
    }
    const activePanel = findParent(eventTarget, DOMstrings.stepFormPanelClass);
    let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);
    if (eventTarget.classList.contains(DOMstrings.stepPrevBtnClass)) {
      activePanelNum--;
    } else {
      activePanelNum++;
    }
    setActiveStep(activePanelNum);
    setActivePanel(activePanelNum);
  });
  
  // SETTING PROPER FORM HEIGHT ONLOAD
  window.addEventListener('load', setFormHeight, false);
  
  // SETTING PROPER FORM HEIGHT ONRESIZE
  window.addEventListener('resize', setFormHeight, false);
  
  // changing animation via animation select (optional)
  const setAnimationType = newType => {
    DOMstrings.stepFormPanels.forEach(elem => {
      elem.dataset.animation = newType;
    });
  };
  
  // selector onchange - changing animation (optional)
  const animationSelect = document.querySelector('.pick-animation__select');
  animationSelect.addEventListener('change', () => {
    const newAnimationType = animationSelect.value;
    setAnimationType(newAnimationType);
  });

  //For getting the Task Image
  $(document).ready(function() {
    $('#insertImageBtn').on('click', function() {
        var fileInput = $('#image')[0];
        var file = fileInput.files[0];
        
        // Perform actions with the selected file, such as displaying it or uploading it to a server
        // You can use FileReader to read the selected file and display it on the page
        var reader = new FileReader();
        reader.onload = function(e) {
            // e.target.result contains the data URL for the image
            var imageUrl = e.target.result;
            // Perform actions to display the image, e.g., set it as the source of an <img> element
            // Example: $('#previewImage').attr('src', imageUrl);
        };
        reader.readAsDataURL(file);
    });
});